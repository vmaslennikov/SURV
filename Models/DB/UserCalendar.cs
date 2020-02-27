using System.ComponentModel.DataAnnotations.Schema;
using JsonApiDotNetCore.Models;

namespace SURV.Models.DB {
    public class Usercalendar : BasePeriodObject {
        [ForeignKey (nameof (Person))]
        public int? PersonId { get; set; }

        [HasOne]
        public virtual Person Person { get; set; }

        [ForeignKey (nameof (Client))]
        public int? ClientId { get; set; }

        [HasOne]
        public virtual Client Client { get; set; }

        [NotMapped] public string Month { get { return DateFrom?.ToString ("MM.yyyy"); } }

        [Attr ("dayType")]
        public CalendarDayTypesEnum DayType { get; set; }
    }
}