using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SURV.Models.DB;
using SURV.Models.Interfaces;
using System;
using System.Linq;
using System.Reflection;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;

namespace SURV.Models
{
    public class AppDbContext : DbContext
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AppDbContext(DbContextOptions<AppDbContext> options, IHttpContextAccessor httpContextAccessor) : base(options)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public DbSet<Alert> Alerts { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Cost> Costs { get; set; }
        public DbSet<Grade> Grades { get; set; }
        public DbSet<Hrmonth> Hrmonths { get; set; }
        public DbSet<Hryear> Hryears { get; set; }
        public DbSet<Person> Persons { get; set; }
        public DbSet<PersonCompany> PersonCompanies { get; set; }
        public DbSet<PersonRole> PersonRoles { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Serviceline> Servicelines { get; set; }
        public DbSet<Servicetype> Servicetypes { get; set; }
        public DbSet<Tabel> Tabels { get; set; }
        public DbSet<Unit> Units { get; set; }
        public DbSet<Usercalendar> Usercalendars { get; set; }
        public DbSet<Workday> Workdays { get; set; }
        public DbSet<Wsshour> Wsshours { get; set; }
        public DbSet<Errormessage> Errormessages { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Filedata> Docs { get; set; }
        public DbQuery<PivotDataItem> PivotDataItems { get; set; }
        public DbQuery<ByClientDataItem> ByClientDataItems { get; set; }
        public DbQuery<ByProjectPerson> ByProjectPerson { get; set; }
        public DbQuery<ByProjectPersonService> ByProjectPersonService { get; set; }

        private static readonly EntityState[] states = new EntityState[] {
            EntityState.Added,
            EntityState.Modified,
            EntityState.Deleted
        };

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
        {
            OnBeforeSaving();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            OnBeforeSaving();
            return base.SaveChangesAsync(cancellationToken);
        }

        public override int SaveChanges()
        {
            OnBeforeSaving();
            return base.SaveChanges();
        }

        private void OnBeforeSaving()
        {
            ChangeTracker.DetectChanges();
            // get entries that are being Added or Updated or Deleted
            var modifiedEntries = ChangeTracker
                .Entries()
                .Where(x => x.Entity is IAuditableObject && states.Contains(x.State));
            //var currentUsername = !string.IsNullOrEmpty(HttpContext.Current?.User?.Identity?.Name)
            //    ? HttpContext.Current.User.Identity.Name
            //    : "Anonymous";
            /* 

            ASP.NET provides the following principal and identity object implementations:

            WindowsPrincipal and WindowsIdentity objects represent users who have been authenticated with Windows authentication. With these objects, the role list is automatically obtained from the set of Windows groups to which the Windows user belongs.
            GenericPrincipal and GenericIdentity objects represent users who have been authenticated using Forms authentication or other custom authentication mechanisms. With these objects, the role list is obtained in a custom manner, typically from a database.
            FormsIdentity and PassportIdentity objects represent users who have been authenticated with Forms and Passport authentication respectively.

            The following tables illustrate, for a range of IIS authentication settings, the resultant identity that is obtained from each of the variables that maintain an IPrincipal and/or IIdentity object. The following abbreviations are used in the table:

            HttpContext = HttpContext.Current.User, which returns an IPrincipal object that contains security information for the current Web request. This is the authenticated Web client.
            WindowsIdentity = WindowsIdentity.GetCurrent(), which returns the identity of the security context of the currently executing Win32 thread.
            Thread = Thread.CurrentPrincipal which returns the principal of the currently executing .NET thread which rides on top of the Win32 thread.

            */
            // HttpContext.Current.User
            // HttpContext.User.Identity;
            string identityName = _httpContextAccessor?.HttpContext?.User?.Identity?.Name ??
                // HttpContext.Current.User
                WindowsIdentity.GetCurrent()?.Name; // WindowsIdentity.GetCurrent()?.User?.User;
            Person person = string.IsNullOrEmpty(identityName) ?
                null :
                Persons
                .FirstOrDefault(u => string.Compare(u.UserName, identityName, true) == 0);
            var now = DateTime.Now;
            var exceptTypes = new Type[] { typeof(PersonCompany), typeof(PersonRole) };
            foreach (var entry in modifiedEntries)
            {
                if (entry.Entity is IAuditableObject auditableEntity)
                {
                    switch (entry.State)
                    {
                        case EntityState.Deleted:
                            if (!exceptTypes.Contains(entry.Entity.GetType()) && entry.Entity is ISoftDelete softDeleteEntity)
                            {
                                entry.State = EntityState.Modified;
                                softDeleteEntity.IsDeleted = true;
                            }
                            break;
                        case EntityState.Modified:
                            auditableEntity.ModifiedAt = now;
                            auditableEntity.ModifiedbyId = person?.Id;
                            break;
                        case EntityState.Added:
                            auditableEntity.CreatedAt =
                                auditableEntity.ModifiedAt = now;
                            auditableEntity.CreatedbyId =
                                auditableEntity.ModifiedbyId = person?.Id;
                            break;
                        default:
                            break;
                    }
                }
            }
        }

        private void SetGlobalQueryFilters(ModelBuilder modelBuilder)
        {
            Type iSoftDelete = typeof(ISoftDelete);
            object[] parameters = new object[] { modelBuilder };
            foreach (var tp in modelBuilder.Model.GetEntityTypes())
            {
                var t = tp.ClrType;
                // set global filters
                if (iSoftDelete.IsAssignableFrom(t))
                {
                    // softdeletable
                    var method = SetGlobalQueryForSoftDeleteMethodInfo.MakeGenericMethod(t);
                    method.Invoke(this, parameters);
                }
            }
        }

        private static readonly MethodInfo SetGlobalQueryForSoftDeleteMethodInfo =
            typeof(AppDbContext)
            .GetMethods(BindingFlags.Public | BindingFlags.Instance)
            .Single(t => t.IsGenericMethod && t.Name == "SetGlobalQueryForSoftDelete");

        public void SetGlobalQueryForSoftDelete<T>(ModelBuilder builder) where T : class, ISoftDelete
        {
            const string propertyName = nameof(BaseObjectSoftDelete.IsDeleted);
            builder.Entity<T>().HasQueryFilter(item => !EF.Property<bool>(item, propertyName));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            SetGlobalQueryFilters(modelBuilder);

            //modelBuilder.Entity<Alert>().HasOne(p => p.CreatedBy);
            //modelBuilder.Entity<Alert>().HasOne(p => p.ModifiedBy);

            //modelBuilder.Entity<Client>().HasOne(p => p.CreatedBy);
            //modelBuilder.Entity<Client>().HasOne(p => p.ModifiedBy);

            //modelBuilder.Entity<Company>().HasOne(p => p.CreatedBy);
            //modelBuilder.Entity<Company>().HasOne(p => p.ModifiedBy);

            //modelBuilder.Entity<Cost>().HasOne(p => p.CreatedBy);
            //modelBuilder.Entity<Cost>().HasOne(p => p.ModifiedBy);

            //modelBuilder.Entity<Grade>().HasOne(p => p.CreatedBy);
            //modelBuilder.Entity<Grade>().HasOne(p => p.ModifiedBy);

            //modelBuilder.Entity<Person>().HasOne(p => p.CreatedBy);
            //modelBuilder.Entity<Person>().HasOne(p => p.ModifiedBy);

            //modelBuilder.Entity<PersonRole>().HasOne(p => p.CreatedBy);
            //modelBuilder.Entity<PersonRole>().HasOne(p => p.ModifiedBy);

            //modelBuilder.Entity<PersonCompany>().HasOne(p => p.CreatedBy);
            //modelBuilder.Entity<PersonCompany>().HasOne(p => p.ModifiedBy);

            //modelBuilder.Entity<Project>().HasOne(p => p.CreatedBy);
            //modelBuilder.Entity<Project>().HasOne(p => p.ModifiedBy);

            //modelBuilder.Entity<Result>().HasOne(p => p.CreatedBy);
            //modelBuilder.Entity<Result>().HasOne(p => p.ModifiedBy);

            //modelBuilder.Entity<Role>().HasOne(p => p.CreatedBy);
            //modelBuilder.Entity<Role>().HasOne(p => p.ModifiedBy);

            //modelBuilder.Entity<Service>().HasOne(p => p.CreatedBy);
            //modelBuilder.Entity<Service>().HasOne(p => p.ModifiedBy);

            //modelBuilder.Entity<ServiceType>().HasOne(p => p.CreatedBy);
            //modelBuilder.Entity<ServiceType>().HasOne(p => p.ModifiedBy);

            //modelBuilder.Entity<ServiceInCurrentMonth>().HasOne(p => p.CreatedBy);
            //modelBuilder.Entity<ServiceInCurrentMonth>().HasOne(p => p.ModifiedBy);

            //modelBuilder.Entity<Tabel>().HasOne(p => p.CreatedBy);
            //modelBuilder.Entity<Tabel>().HasOne(p => p.ModifiedBy);

            //modelBuilder.Entity<Unit>().HasOne(p => p.CreatedBy);
            //modelBuilder.Entity<Unit>().HasOne(p => p.ModifiedBy);

            //modelBuilder.Entity<UserCalendar>().HasOne(p => p.CreatedBy);
            //modelBuilder.Entity<UserCalendar>().HasOne(p => p.ModifiedBy);

            //modelBuilder.Entity<WorkCalendar>().HasOne(p => p.CreatedBy);
            //modelBuilder.Entity<WorkCalendar>().HasOne(p => p.ModifiedBy);

            //modelBuilder.Entity<WorkDay>().HasOne(p => p.CreatedBy);
            //modelBuilder.Entity<WorkDay>().HasOne(p => p.ModifiedBy);

            //modelBuilder.Entity<WssHour>().HasOne(p => p.CreatedBy);
            //modelBuilder.Entity<WssHour>().HasOne(p => p.ModifiedBy);

            // modelBuilder.Entity<Client> ().HasOne (p => p.Company);

            // modelBuilder.Entity<Cost> ().HasOne (p => p.Client);
            // modelBuilder.Entity<Cost> ().HasOne (p => p.Grade);

            // modelBuilder.Entity<Hrmonth> ().HasOne (p => p.Approveperson);
            // modelBuilder.Entity<Hryear> ().HasOne (p => p.Approveperson);

            // modelBuilder.Entity<Person> ()
            //     .HasOne (p => p.Unit)
            //     .WithOne (p=>p.Manager)
            //     .HasForeignKey<Person> (p => p.Id);
            // modelBuilder.Entity<Person> ().HasOne (p => p.Grade);
            // modelBuilder.Entity<Person> ().HasOne (p => p.Manager).WithMany ();

            modelBuilder.Entity<PersonRole>().HasKey(pr => new { pr.PersonId, pr.RoleId });
            modelBuilder.Entity<PersonRole>().HasOne(bc => bc.Person).WithMany(b => b.PersonRoles).HasForeignKey(bc => bc.PersonId);
            modelBuilder.Entity<PersonRole>().HasOne(bc => bc.Role).WithMany(c => c.PersonRoles).HasForeignKey(bc => bc.RoleId);

            modelBuilder.Entity<PersonCompany>().HasKey(pr => new { pr.PersonId, pr.CompanyId });
            modelBuilder.Entity<PersonCompany>().HasOne(bc => bc.Person).WithMany(b => b.PersonCompanies).HasForeignKey(bc => bc.PersonId);
            modelBuilder.Entity<PersonCompany>().HasOne(bc => bc.Company).WithMany(c => c.PersonCompanies).HasForeignKey(bc => bc.CompanyId);

            // modelBuilder.Entity<Project> ().HasOne (p => p.Manager);
            // modelBuilder.Entity<Project> ().HasOne (p => p.Deputy);
            // modelBuilder.Entity<Project> ().HasOne (p => p.Client);
            // modelBuilder.Entity<Project> ().HasOne (p => p.Viewer);

            // modelBuilder.Entity<Service> ().HasOne (p => p.Servicetype);
            // modelBuilder.Entity<Service> ().HasOne (p => p.Company);
            // modelBuilder.Entity<Service> ().HasOne (p => p.Unit);

            // modelBuilder.Entity<Serviceline> ().HasOne (p => p.Service);
            // modelBuilder.Entity<Serviceline> ().HasOne (p => p.Project);
            // modelBuilder.Entity<Serviceline> ().HasOne (p => p.Client);
            // modelBuilder.Entity<Serviceline> ().HasOne (p => p.Tabel).WithMany (p => p.Services).IsRequired ();
            modelBuilder.Entity<Serviceline>().HasMany(p => p.Hours).WithOne(o => o.Serviceline);

            // modelBuilder.Entity<Tabel> ().HasOne (p => p.Person);
            // modelBuilder.Entity<Tabel> ().HasOne (p => p.Company);
            // modelBuilder.Entity<Tabel> ().HasOne (p => p.Approver);
            modelBuilder.Entity<Tabel>().HasMany(p => p.Services).WithOne(o => o.Tabel);

            // modelBuilder.Entity<Unit> ()
            //     .HasOne (p => p.Manager)
            //     .WithOne (p=> p.Unit)
            //     .HasForeignKey<Unit> (b => b.Id);
            // modelBuilder.Entity<Unit> ().HasOne (p => p.Company);

            // modelBuilder.Entity<Usercalendar> ().HasOne (p => p.Client);
            // modelBuilder.Entity<Usercalendar> ().HasOne (p => p.Person);

            //modelBuilder.Entity<Wsshour> ().HasOne (p => p.Service).WithMany (p => p.Hours).IsRequired ();

            modelBuilder.Query<PivotDataItem>().ToView("View_Pivot");
            modelBuilder.Query<ByClientDataItem>().ToView("View_ByClient");
            modelBuilder.Query<ByProjectPerson>().ToView("View_ByProjectPerson");
            modelBuilder.Query<ByProjectPersonService>().ToView("View_ByProjectPersonService");

            base.OnModelCreating(modelBuilder);
        }
    }
}
