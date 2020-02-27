using System.ComponentModel.DataAnnotations.Schema;
using JsonApiDotNetCore.Models;

namespace SURV.Models.DB
{
    public class Unit : BaseTitleObject
    {
        [ForeignKey(nameof(Manager))]
        public int? ManagerId { get; set; }

        [HasOne] public virtual Person Manager { get; set; }

        [ForeignKey(nameof(Company))]
        public int? CompanyId { get; set; }

        [HasOne] public virtual Company Company { get; set; }
    }
}
