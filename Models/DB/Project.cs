using System.ComponentModel.DataAnnotations.Schema;
using JsonApiDotNetCore.Models;

namespace SURV.Models.DB
{
    public class Project : BasePeriodObject
    {
        [ForeignKey (nameof (Client))] public int? ClientId { get; set; }
        [HasOne] public virtual Client Client { get; set; }

        [ForeignKey (nameof (Manager))] public int? ManagerId { get; set; }
        [HasOne] public virtual Person Manager { get; set; }

        [ForeignKey (nameof (Company))] public int? CompanyId { get; set; }
        [HasOne] public virtual Company Company { get; set; }

        // [ForeignKey (nameof (Deputy))] public int? DeputyId { get; set; }
        // [HasOne] public virtual Person Deputy { get; set; }

        // [ForeignKey (nameof (Viewer))] public int? ViewerId { get; set; }
        // [HasOne] public virtual Person Viewer { get; set; }

        [Attr("block")]
        [Column(TypeName = "BOOLEAN")]
        public bool Block { get; set; }
    }
}
