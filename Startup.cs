using Hangfire;
using Hangfire.Common;
using Hangfire.SQLite;
using JsonApiDotNetCore.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.FileProviders;
using SURV.Models;
using SURV.Models.DB;
using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;

namespace SURV
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: false)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            StaticConfig = Config = builder.Build();
        }

        public readonly IConfiguration Config;
        public static IConfiguration StaticConfig { get; private set; }
        public string GetDbConnectionString() => Config["ConnectionStrings:Default"];
        public string GetClientAppFolder() => Config["ClientApp:Root"];
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // var loggerFactory = new LoggerFactory();
            // loggerFactory.AddConsole();
            // services.AddSingleton<ILoggerFactory>(loggerFactory);

            services.Configure<IISOptions>(options =>
            {
                options.AutomaticAuthentication = true;
            });
            services.AddAuthentication(IISDefaults.AuthenticationScheme);

            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services
                .AddMvcCore(options => options.ReturnHttpNotAcceptable = true)
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddJsonFormatters();
            //services.AddHttpContextAccessor();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration => configuration.RootPath = $"{GetClientAppFolder()}/dist");

            services.AddDbContext<AppDbContext>(options =>
            {
                // use whatever provider you want, this is just an example
                options.UseLazyLoadingProxies(false).UseSqlite(GetDbConnectionString());
            }, ServiceLifetime.Transient);
            //services.AddScoped<IDbContextResolver, DbContextResolver<AppDbContext>>();

            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder =>
                    {
                        builder
                            .AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .AllowCredentials();
                    });
            });
            // add jsonapi dotnet core
            services.AddJsonApi<AppDbContext>(options =>
            {
                options.Namespace = "api/v1";
                options.DefaultPageSize = 100;
                options.IncludeTotalRecordCount = true;
                options.ValidateModelState = true;
            });

            services.AddHangfire(x => x.UseSQLiteStorage(GetDbConnectionString()));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(
            IApplicationBuilder app,
            IHostingEnvironment env,
            AppDbContext context)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseAuthentication();
            app.UseHttpsRedirection();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.WebRootPath, @"Resources")),
                RequestPath = new PathString("/Resources")
            });
            // app.UseStaticFiles(new StaticFileOptions
            //     {
            //         FileProvider = new PhysicalFileProvider(
            //             Path.Combine(Directory.GetCurrentDirectory(), "ClientApp")),
            //         RequestPath = "/ClientApp"
            //     });
            app.UseCookiePolicy();
            app.UseJsonApi();
            app.UseCors("AllowAll");
            // app.UseMvc(routes =>
            // {
            //     routes.MapRoute(
            //         name: "default",
            //         template: "{controller=Home}/{action=Index}/{id?}");
            // });

            // Hangfire configuration
            GlobalConfiguration.Configuration.UseSQLiteStorage(GetDbConnectionString());
            app.UseHangfireDashboard();
            app.UseHangfireServer(new BackgroundJobServerOptions { WorkerCount = 1 });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501
                spa.Options.SourcePath = GetClientAppFolder();
                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });

            context.Database.EnsureCreated();

            SetupJobs();
        }

        public static void SetupJobs()
        {
            var manager = new RecurringJobManager();
            //manager.AddOrUpdate ("email_send", Job.FromExpression (() => EmailSend ()), Cron.Minutely ());
            manager.AddOrUpdate("tabels_create", Job.FromExpression(() => TabelsCreate()), Cron.Daily(0, 5));
            manager.AddOrUpdate("alert_users", Job.FromExpression(() => AlertUsers()), Cron.Monthly(20, 9));
            manager.AddOrUpdate("alert_managers", Job.FromExpression(() => AlertManagers()), Cron.Monthly(25, 9));
        }

        public static void EmailSend()
        {
            var config = Startup.StaticConfig;
            var host = config?["EmailSettings:Host"] ?? "localhost";
            var port = Convert.ToInt32(string.IsNullOrEmpty(config?["EmailSettings:Port"]) ? "25" : config?["EmailSettings:Port"] ?? "25");
            var timeout = Convert.ToInt32(string.IsNullOrEmpty(config?["EmailSettings:Timeout"]) ? "50" : config?["EmailSettings:Port"] ?? "50");
            var enableSsl = Convert.ToBoolean(config?["EmailSettings:EnableSsl"]);
            var enableTls = Convert.ToBoolean(config?["EmailSettings:EnableTls"]);
            var emailFrom = config?["EmailSettings:EmailFrom"] ?? "local@local.local";
            var userName = config?["EmailSettings:UserName"];
            var password = config?["EmailSettings:Password"];

            using (var client = new SmtpClient
            {
                DeliveryMethod = SmtpDeliveryMethod.Network,
                Host = host,
                Port = port,
                EnableSsl = enableSsl,
                UseDefaultCredentials = false,
                Timeout = timeout * 1000 // 50 секунд
            })
            {
                ServicePointManager.ServerCertificateValidationCallback += (p1, p2, p3, p4) => true;

                using (var db = (new DbContextFactory()).CreateDbContext(null))
                {
                    var toSend = db.Messages.Include(m => m.Person).Where(m => m.Active && !m.Completed && m.Person != null).OrderBy(m => m.CreatedAt);
                    toSend.ForEachAsync(m =>
                    {
                        try
                        {
                            if (m.Person != null && !string.IsNullOrEmpty(m.Person.Email))
                            {
                                using (var mailMessage = new MailMessage { From = new MailAddress(emailFrom), Subject = m.Title })
                                {
                                    if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
                                    {
                                        client.UseDefaultCredentials = true;
                                    }
                                    else
                                    {
                                        client.Credentials = new NetworkCredential(userName, password);
                                    }

                                    if (enableTls)
                                    {
                                        client.TargetName = $"STARTTLS/{client.TargetName}";
                                    }

                                    mailMessage.Sender = mailMessage.From; // new MailAddress(_connection.EmailFrom);
                                    mailMessage.Body = m.Body;
                                    mailMessage.To.Add(new MailAddress(m.Person.Email));
                                    mailMessage.IsBodyHtml = true;
                                    client.Send(mailMessage);
                                }
                                m.Completed = true;
                            }
                        }
                        catch (Exception)
                        {

                            //throw;
                        }
                    });
                    db.SaveChanges();
                }
            }
        }

        public static void TabelsCreate()
        {
            //DbContextOptions<AppDbContext> options = new Microsoft.EntityFrameworkCore.DbContextOptions<AppDbContext>();
            using (var db = (new DbContextFactory()).CreateDbContext(null))
            {
                var now = DateTime.Today;
                var tempDate = new DateTime(now.Year, now.Month, 1);
                var startFrom = new DateTime(2019, 4, 1);
                while (tempDate >= startFrom)
                {
                    var y = tempDate.Year.ToString();
                    var m = tempDate.Month.ToString().PadLeft(2, '0');
                    var persons = db.Persons
                        .Include(o => o.PersonCompanies)
                        .ThenInclude(PersonCompanies => PersonCompanies.Company)
                        .Where(p => p.DateFrom <= tempDate && (p.DateTill == null || p.DateTill > tempDate)) // !string.IsNullOrEmpty(p.UserName) &&
                        .ToList();
                    persons.ForEach(person =>
                    {
                        try
                        {
                            if (person.PersonCompanies.Any())
                            {
                                person.PersonCompanies.ForEach(c =>
                                {
                                    if (c.Company != null)
                                    {
                                        var tabel = db.Tabels.FirstOrDefault(t => t.Year == tempDate.Year && t.Month == tempDate.Month && t.PersonId == person.Id && t.CompanyId == c.CompanyId);
                                        if (tabel == null)
                                        {
                                            db.Tabels.Add(new Tabel
                                            {
                                                Active = true,
                                                Year = tempDate.Year,
                                                Month = tempDate.Month,
                                                Person = person,
                                                CompanyId = c.CompanyId,
                                                Title = $"{y}_{m}-{person.Id}"
                                            });
                                        }
                                    }
                                });
                            }
                        }
                        catch (Exception) { }
                    });
                    db.SaveChanges();
                    tempDate = tempDate.AddMonths(-1);
                }
            }
        }

        public static void AlertUsers()
        {
            using (var db = (new DbContextFactory()).CreateDbContext(null))
            {
                var template = db.Alerts.FirstOrDefault(o => o.Code == "TabelFilled");
                if (template == null)
                {
                    return;
                }

                var now = DateTime.Today;
                var tempDate = new DateTime(now.Year, now.Month, 1);
                var period = now.ToString("MM.yyyy");
                var tabels = db.Tabels
                    .Include(t => t.Company)
                    .Include(t => t.Person)
                    .Where(t => t.Person != null && t.Year == tempDate.Year && t.Month == tempDate.Month && !t.Fill).ToList();
                foreach (var group in tabels.GroupBy(t => t.Person))
                {
                    var person = group.Key;
                    if (person != null)
                    {
                        var subj = template.Title;
                        var data = string.Join("", group.Select(o => $"<br/> - Табель \"{o.Company?.Title}\" за {period}").ToList());
                        var body = string.Format(template.Body, data);
                        db.Messages.Add(new Message()
                        {
                            Title = subj,
                            Body = body,
                            Person = person,
                            Completed = false,
                            Active = true
                        });
                    };
                }
                db.SaveChanges();
            }
        }

        public static void AlertManagers()
        {
            using (var db = (new DbContextFactory()).CreateDbContext(null))
            {
                var template = db.Alerts.FirstOrDefault(o => o.Code == "TabelAgreed");
                if (template == null)
                {
                    return;
                }

                var now = DateTime.Today;
                var tempDate = new DateTime(now.Year, now.Month, 1);
                var period = now.ToString("MM.yyyy");
                var tabels = db.Tabels
                    .Include(t => t.Company)
                    .Include(t => t.Person)
                    .ThenInclude(p => p.Manager)
                    .Where(t => t.Person != null && t.Year == tempDate.Year && t.Month == tempDate.Month && !t.Approve).ToList();
                foreach (var group in tabels.GroupBy(t => t.Person.Manager))
                {
                    var manager = group.Key;
                    if (manager != null)
                    {
                        var subj = template.Title;
                        var data = string.Join("", group.OrderBy(t => t.Person.FullName).Select(o => $"<br/> - Табель \"{o.Person.FullName}\" за {period}").ToList());
                        var body = string.Format(template.Body, data);
                        db.Messages.Add(new Message()
                        {
                            Title = subj,
                            Body = body,
                            Person = manager,
                            Completed = false,
                            Active = true
                        });
                    };
                }
                db.SaveChanges();
            }
        }
    }
}