using SURV.Models.DB;
using JsonApiDotNetCore.Controllers;
using JsonApiDotNetCore.Models;
using JsonApiDotNetCore.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

namespace SURV.Controllers
{
    [Authorize]
    public class GenericController<T> : JsonApiController<T> where T : Identifiable<int>
    {
        public GenericController(
            IJsonApiContext jsonApiContext,
            IResourceService<T> resourceService,
            ILoggerFactory loggerFactory) : base(jsonApiContext, resourceService, loggerFactory) { }
    }

    public class AlertsController : GenericController<Alert>
    {
        public AlertsController(IJsonApiContext jsonApiContext, IResourceService<Alert> resourceService, ILoggerFactory loggerFactory) : base(jsonApiContext, resourceService, loggerFactory) { }
    }

    public class ClientsController : GenericController<Client>
    {
        public ClientsController(IJsonApiContext jsonApiContext, IResourceService<Client> resourceService, ILoggerFactory loggerFactory) : base(jsonApiContext, resourceService, loggerFactory) { }
    }

    public class CompaniesController : GenericController<Company>
    {
        public CompaniesController(IJsonApiContext jsonApiContext, IResourceService<Company> resourceService, ILoggerFactory loggerFactory) : base(jsonApiContext, resourceService, loggerFactory) { }
    }

    public class CostsController : GenericController<Cost>
    {
        public CostsController(IJsonApiContext jsonApiContext, IResourceService<Cost> resourceService, ILoggerFactory loggerFactory) : base(jsonApiContext, resourceService, loggerFactory) { }
    }

    public class GradesController : GenericController<Grade>
    {
        public GradesController(IJsonApiContext jsonApiContext, IResourceService<Grade> resourceService, ILoggerFactory loggerFactory) : base(jsonApiContext, resourceService, loggerFactory) { }
    }

    public class HrmonthsController : GenericController<Hrmonth>
    {
        public HrmonthsController(IJsonApiContext jsonApiContext, IResourceService<Hrmonth> resourceService, ILoggerFactory loggerFactory) : base(jsonApiContext, resourceService, loggerFactory) { }
    }

    public class HryearsController : GenericController<Hryear>
    {
        public HryearsController(IJsonApiContext jsonApiContext, IResourceService<Hryear> resourceService, ILoggerFactory loggerFactory) : base(jsonApiContext, resourceService, loggerFactory) { }
    }

    public class PersonsController : GenericController<Person>
    {
        public PersonsController(IJsonApiContext jsonApiContext, IResourceService<Person> resourceService, ILoggerFactory loggerFactory) : base(jsonApiContext, resourceService, loggerFactory) { }
    }

    // public class PersonrolesController : GenericController<PersonRole> {
    //     public PersonrolesController (IJsonApiContext jsonApiContext, IResourceService<PersonRole> resourceService, ILoggerFactory loggerFactory) : base (jsonApiContext, resourceService, loggerFactory) { }
    // }

    // public class PersoncompaniesController : GenericController<PersonCompany> {
    //     public PersoncompaniesController (IJsonApiContext jsonApiContext, IResourceService<PersonCompany> resourceService, ILoggerFactory loggerFactory) : base (jsonApiContext, resourceService, loggerFactory) { }
    // }

    public class ProjectsController : GenericController<Project>
    {
        public ProjectsController(IJsonApiContext jsonApiContext, IResourceService<Project> resourceService, ILoggerFactory loggerFactory) : base(jsonApiContext, resourceService, loggerFactory) { }
    }

    public class RolesController : GenericController<Role>
    {
        public RolesController(IJsonApiContext jsonApiContext, IResourceService<Role> resourceService, ILoggerFactory loggerFactory) : base(jsonApiContext, resourceService, loggerFactory) { }
    }

    public class ServicesController : GenericController<Service>
    {
        public ServicesController(IJsonApiContext jsonApiContext, IResourceService<Service> resourceService, ILoggerFactory loggerFactory) : base(jsonApiContext, resourceService, loggerFactory) { }
    }

    public class ServicelinesController : GenericController<Serviceline>
    {
        public ServicelinesController(IJsonApiContext jsonApiContext, IResourceService<Serviceline> resourceService, ILoggerFactory loggerFactory) : base(jsonApiContext, resourceService, loggerFactory) { }
    }

    public class ServicetypesController : GenericController<Servicetype>
    {
        public ServicetypesController(IJsonApiContext jsonApiContext, IResourceService<Servicetype> resourceService, ILoggerFactory loggerFactory) : base(jsonApiContext, resourceService, loggerFactory) { }
    }

    public class TabelsController : GenericController<Tabel>
    {
        public TabelsController(IJsonApiContext jsonApiContext, IResourceService<Tabel> resourceService, ILoggerFactory loggerFactory) : base(jsonApiContext, resourceService, loggerFactory) { }
    }

    public class UnitsController : GenericController<Unit>
    {
        public UnitsController(IJsonApiContext jsonApiContext, IResourceService<Unit> resourceService, ILoggerFactory loggerFactory) : base(jsonApiContext, resourceService, loggerFactory) { }
    }

    public class UsercalendarsController : GenericController<Usercalendar>
    {
        public UsercalendarsController(IJsonApiContext jsonApiContext, IResourceService<Usercalendar> resourceService, ILoggerFactory loggerFactory) : base(jsonApiContext, resourceService, loggerFactory) { }
    }

    public class WsshoursController : GenericController<Wsshour>
    {
        public WsshoursController(IJsonApiContext jsonApiContext, IResourceService<Wsshour> resourceService, ILoggerFactory loggerFactory) : base(jsonApiContext, resourceService, loggerFactory) { }
    }

    public class WorkdaysController : GenericController<Workday>
    {
        public WorkdaysController(IJsonApiContext jsonApiContext, IResourceService<Workday> resourceService, ILoggerFactory loggerFactory) : base(jsonApiContext, resourceService, loggerFactory) { }
    }

    public class ErrormessagesController : GenericController<Errormessage>
    {
        public ErrormessagesController(IJsonApiContext jsonApiContext, IResourceService<Errormessage> resourceService, ILoggerFactory loggerFactory) : base(jsonApiContext, resourceService, loggerFactory) { }
    }

    public class MessagesController : GenericController<Message>
    {
        public MessagesController(IJsonApiContext jsonApiContext, IResourceService<Message> resourceService, ILoggerFactory loggerFactory) : base(jsonApiContext, resourceService, loggerFactory) { }
    }

    public class DocsController : GenericController<Filedata>
    {
        public DocsController(IJsonApiContext jsonApiContext, IResourceService<Filedata> resourceService, ILoggerFactory loggerFactory) : base(jsonApiContext, resourceService, loggerFactory) { }
    }
}
