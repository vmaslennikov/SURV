using System;
using System.ComponentModel.DataAnnotations.Schema;
using JsonApiDotNetCore.Models;

namespace SURV.Models.DB
{
    public class Workday : BaseTitleObject
    {
        [Column(TypeName = "DATE")]
        [Attr("date")]
        public DateTime Date { get; set; }

        [Attr("dayType")]
        public DayTypesEnum DayType { get; set; }

        [Attr("comment")]
        public string Comment { get; set; }
    }
}
