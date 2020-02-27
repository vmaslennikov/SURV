using JsonApiDotNetCore.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace SURV.Models.DB
{
    public class Tabel : BaseTitleObject
    {
        [Attr("year")]
        public int Year { get; set; }

        [Attr("month")]
        public int Month { get; set; }

        [Attr("fill")]
        [Column(TypeName = "BOOLEAN")]
        [DefaultValue(false)]
        public bool Fill { get; set; }

        [Attr("approve")]
        [Column(TypeName = "BOOLEAN")]
        [DefaultValue(false)]
        public bool Approve { get; set; }

        [Column(TypeName = "DATETIME")]
        [Attr("fillDate")]
        public DateTime? FillDate { get; set; }

        [Column(TypeName = "DATETIME")]
        [Attr("approveDate")]
        public DateTime? ApproveDate { get; set; }

        [ForeignKey(nameof(Approver))] public int? ApproverId { get; set; }

        [HasOne] public virtual Person Approver { get; set; }

        [ForeignKey(nameof(Company))] public int? CompanyId { get; set; }

        [HasOne] public virtual Company Company { get; set; }

        [ForeignKey(nameof(Person))] public int? PersonId { get; set; }

        [HasOne] public virtual Person Person { get; set; }

        [HasMany] public virtual List<Serviceline> Services { get; set; }
    }
}
