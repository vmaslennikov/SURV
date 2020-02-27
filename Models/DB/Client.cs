using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using JsonApiDotNetCore.Models;

namespace SURV.Models.DB
{
    public class Client : BasePeriodObject {
        [ForeignKey (nameof (Company))] public int? CompanyId { get; set; }
        [HasOne] public virtual Company Company { get; set; }

        [DefaultValue (false)]
        [Attr("nonResident")]
        [Column(TypeName = "BOOLEAN")]
        public bool NonResident { get; set; }
    }
}