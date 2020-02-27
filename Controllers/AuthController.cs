using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SURV.Models;
using SURV.Models.DB;
using System.Linq;
using System.Security.Principal;

namespace SURV.Controllers
{
    [Route("api/Auth")]
    public class AuthController : Controller
    {
        private readonly AppDbContext _db;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthController(AppDbContext db, IHttpContextAccessor httpContextAccessor)
        {
            _db = db;
            _httpContextAccessor = httpContextAccessor;
        }

        [Route("UserData")]
        public IActionResult UserData()
        {
            try
            {
                using (_db)
                {
                    string identityName = GetUserName();
                    //WindowsIdentity.GetCurrent ()?.Name; // WindowsIdentity.GetCurrent()?.User?.User;
                    Person person = string.IsNullOrEmpty(identityName) ?
                        null :
                        _db
                        .Persons
                        .Include(o => o.PersonCompanies)
                        .ThenInclude(PersonCompanies => PersonCompanies.Company)
                        .Include(o => o.PersonRoles)
                        .ThenInclude(PersonRoles => PersonRoles.Role)
                        .FirstOrDefault(u => string.Compare(u.UserName, identityName, true) == 0);
                    if (person == null)
                    {
                        return Ok(new
                        {
                            Auth = false,
                            Error = "User not found",
                            // IdentityName = User?.Identity?.Name,
                            // WinIdentity = WindowsIdentity.GetCurrent()?.Name,
                            // httpContextAccessorIdentity = _httpContextAccessor?.HttpContext?.User?.Identity?.Name,
                        });
                    }

                    var roles = person.PersonRoles.Select(o => new { o.Role.Id, o.Role.Title }).ToList();
                    const string roleHR = "HR";
                    const string roleCoordinator = "Координаторы";
                    const string roleAdmin = "Администраторы";
                    var companies = roles.Any(r =>
                           string.Equals(r.Title, roleHR, System.StringComparison.CurrentCultureIgnoreCase) ||
                           string.Equals(r.Title, roleCoordinator, System.StringComparison.CurrentCultureIgnoreCase) ||
                           string.Equals(r.Title, roleAdmin, System.StringComparison.CurrentCultureIgnoreCase)) ?
                        _db.Companies.Select(o => new { o.Id, o.Title }).ToList() :
                        person.PersonCompanies.Select(o => new { o.Company.Id, o.Company.Title }).ToList();

                    return base.Ok(new
                    {
                        Auth = true,
                        // IdentityName = User?.Identity?.Name,
                        // WinIdentity = WindowsIdentity.GetCurrent()?.Name,
                        // httpContextAccessorIdentity = _httpContextAccessor?.HttpContext?.User?.Identity?.Name,
                        User = new
                        {
                            person.Id,
                            person.UserName,
                            person.WorkType,
                            person.Email,
                            person.DateFrom,
                            person.DateTill,
                            person.FullName,
                            person.TabelNumber,
                            person.UnitId,
                            Roles = roles,
                            Companies = companies,
                            Projects = _db.Projects.Where(o => o.ManagerId == person.Id).Select(o => o.Id).ToArray(),
                            ManagerFor = _db.Persons.Where(o => o.ManagerId == person.Id).Select(o => o.Id).ToArray()
                        }
                    });
                }
            }
            catch (System.Exception e)
            {
                return Ok(new { Auth = false, Error = e.Message });
            }
        }

        private string GetUserName()
        {
            string identityName = _httpContextAccessor?.HttpContext?.User?.Identity?.Name ?? User?.Identity?.Name;
            if (string.IsNullOrEmpty(identityName))
            {
                identityName = WindowsIdentity.GetCurrent()?.Name;
            }
            return identityName;
        }
    }
}