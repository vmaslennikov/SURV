using JsonApiDotNetCore.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SURV.Models.DB
{
    public class Alert : BaseTitleObject
    {
        [Attr("code")]
        [StringLength(255)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Code { get; set; }

        [Attr("body")]
        public string Body { get; set; }
    }
}
