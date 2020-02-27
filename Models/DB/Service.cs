using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using JsonApiDotNetCore.Models;

namespace SURV.Models.DB {
    public class Service : BaseTitleObject {
        [ForeignKey (nameof (Servicetype))] public int? ServicetypeId { get; set; }

        [HasOne, Required] public virtual Servicetype Servicetype { get; set; }

        [ForeignKey (nameof (Unit))] public int? UnitId { get; set; }

        [HasOne, Required] public virtual Unit Unit { get; set; }

        [ForeignKey (nameof (Company))] public int? CompanyId { get; set; }

        [HasOne, Required] public virtual Company Company { get; set; }

        [Attr ("comment")] public string Comment { get; set; }
    }
}