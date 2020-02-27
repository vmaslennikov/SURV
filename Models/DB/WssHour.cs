using JsonApiDotNetCore.Models;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SURV.Models.DB
{
    public class Wsshour : BaseObject
    {
        [ForeignKey(nameof(Serviceline))]
        public int ServicelineId { get; set; }

        [HasOne, Required]
        public Serviceline Serviceline { get; set; }

        [Required]
        [Column(TypeName = "DATE")]
        [Attr("date")]
        public DateTime Date { get; set; }

        [DefaultValue(0)]
        [Attr("hours")]
        public int Hours { get; set; }
    }
}
