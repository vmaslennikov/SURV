using System.ComponentModel.DataAnnotations.Schema;
using JsonApiDotNetCore.Models;

namespace SURV.Models.DB {
    public class Cost : BaseTitleObject {
        [ForeignKey (nameof (Client))] public int? ClientId { get; set; }
        [HasOne] public virtual Client Client { get; set; }

        [ForeignKey (nameof (Grade))] public int? GradeId { get; set; }
        [HasOne] public virtual Grade Grade { get; set; }

        [Attr ("sum")]
        public double Sum { get; set; }

        [Attr ("currency")]
        public string Currency { get; set; }
    }
}