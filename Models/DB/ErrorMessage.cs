using JsonApiDotNetCore.Models;

namespace SURV.Models.DB {
    public class Errormessage : BaseTitleObject {
        [Attr ("body")]
        public string Body { get; set; }
    }
}