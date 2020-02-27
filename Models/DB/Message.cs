using JsonApiDotNetCore.Models;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SURV.Models.DB
{
    public class Message: BaseTitleObject{
        [Attr("body")]
        public string Body{get;set;}

        [ForeignKey(nameof(Person))]
        public int? PersonId { get; set; }

        [HasOne, Required] public Person Person { get; set; }

        [Attr("completed")]
        [DefaultValue(false)]
        [Column(TypeName = "BOOLEAN")]
        public bool Completed { get; set; }
    }
}
