using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SURV.Models;
using SURV.Models.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;

namespace SURV.Controllers
{
    [Route("api/ProjectsData")]
    public class ProjectController : Controller
    {
        private const string roleAdmin = "Администраторы";
        private readonly AppDbContext _db = null;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ProjectController(AppDbContext db, IHttpContextAccessor httpContextAccessor)
        {
            _db = db;
            _httpContextAccessor = httpContextAccessor;
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

        [Route("ByProjectPerson"), HttpGet]
        public IActionResult ByProjectPerson(int year, int month)
        {
            try
            {
                using (_db)
                {
                    string identityName = GetUserName();
                    Person person = string.IsNullOrEmpty(identityName) ?
                        null :
                        _db
                        .Persons
                        .Include(o => o.PersonRoles)
                        .ThenInclude(PersonRoles => PersonRoles.Role)
                        .FirstOrDefault(u => string.Compare(u.UserName, identityName, true) == 0);
                    if (person == null)
                    {
                        return Ok(new { Items = global::System.Array.Empty<string>(), Error = "Person not found" });
                    }

                    var roles = person?.PersonRoles.Select(o => new { o.Role.Id, o.Role.Title }).ToList();
                    var isAdmin = roles?.Any(r => string.Equals(r.Title, roleAdmin, System.StringComparison.CurrentCultureIgnoreCase)) ?? false;
                    var projects = _db.ByProjectPerson.Where(o => o.ProjectId > 0);
                    if (!isAdmin)
                    {
                        projects = projects.Where(o => o.ManagerId == person.Id);
                    }
                    var data = projects
                        .Where(o => o.Year == year && o.Month == month)
                        .OrderBy(o => o.ProjectTitle)
                        .ThenBy(o => o.PersonName);
                    var gByPeroject = data.GroupBy(o => o.ProjectTitle);
                    var items = new List<dynamic>();
                    gByPeroject.ToList().ForEach(g =>
                    {
                        var pId = g.FirstOrDefault()?.ProjectId;
                        items.Add(new
                        {
                            projectId = pId,
                            projectTitle = g.Key,
                            Items = g.Select(o => new { o.PersonId, o.PersonName, o.Sum }).ToArray()
                        });
                    });
                    return Ok(new { Items = items, Error = "" });
                };
            }
            catch (Exception e)
            {
                return Ok(new { Items = global::System.Array.Empty<string>(), Error = e.Message });
            }
        }

        [Route("ByProjectPersonService"), HttpGet]
        public IActionResult ByProjectPersonService(int projectId, int year, int month)
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
                        .Include(o => o.PersonRoles)
                        .ThenInclude(PersonRoles => PersonRoles.Role)
                        .FirstOrDefault(u => string.Compare(u.UserName, identityName, true) == 0);
                    if (person == null)
                    {
                        return Ok(new { Items = global::System.Array.Empty<string>(), Error = "Person not found" });
                    }

                    var roles = person?.PersonRoles.Select(o => new { o.Role.Id, o.Role.Title }).ToList();
                    var isAdmin = roles?.Any(r => string.Equals(r.Title, roleAdmin, System.StringComparison.CurrentCultureIgnoreCase)) ?? false;
                    var projects = _db.ByProjectPersonService.Where(o => o.ProjectId > 0);
                    if (!isAdmin)
                    {
                        projects = projects.Where(o => o.ManagerId == person.Id);
                    }
                    var data = projects
                        .Where(o => o.ProjectId == projectId && o.Year == year && o.Month == month)
                        .OrderBy(o => o.PersonName)
                        .ThenBy(o => o.ServiceName);
                    var gByPerson = data.GroupBy(o => o.PersonName);
                    var items = new List<dynamic>();
                    gByPerson.ToList().ForEach(g =>
                    {
                        var personId = g.FirstOrDefault()?.PersonId;
                        items.Add(new
                        {
                            PersonId = personId,
                            PersonName = g.Key,
                            Items = g.Select(o => new { o.ServiceId, o.ServiceName, o.Sum }).ToArray()
                        });
                    });
                    return Ok(new { Items = items, Error = "" });
                };
            }
            catch (Exception e)
            {
                return Ok(new { Items = global::System.Array.Empty<string>(), Error = e.Message });
            }
        }
    }
}