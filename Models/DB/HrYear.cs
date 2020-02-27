using System;
using System.ComponentModel.DataAnnotations.Schema;
using JsonApiDotNetCore.Models;

namespace SURV.Models.DB {
    public class Hryear : BaseTitleObject {
        [Column (TypeName = "DateTime")]
        [Attr ("date")]
        public DateTime Date { get; set; }

        [Column (TypeName = "DateTime")]
        [Attr ("approveDate")]
        public DateTime? ApproveDate { get; set; }

        [ForeignKey (nameof (Approveperson))] public int? ApprovepersonId { get; set; }

        [HasOne] public Person Approveperson { get; set; }
    }
}