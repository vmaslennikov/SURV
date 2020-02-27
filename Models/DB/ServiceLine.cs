using JsonApiDotNetCore.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SURV.Models.DB
{
    public class Serviceline : BaseObjectSoftDelete
    {
        [ForeignKey(nameof(Service))] public int? ServiceId { get; set; }

        [HasOne, Required] public virtual Service Service { get; set; }

        [ForeignKey(nameof(Project))] public int? ProjectId { get; set; }
        [HasOne, Required] public virtual Project Project { get; set; }

        [ForeignKey(nameof(Client))] public int? ClientId { get; set; }
        [HasOne, Required] public virtual Client Client { get; set; }

        [ForeignKey(nameof(Tabel))] public int? TabelId { get; set; }
        [HasOne, Required] public virtual Tabel Tabel { get; set; }

        [Required] [Attr("result")] public string Result { get; set; }

        [HasMany] public virtual List<Wsshour> Hours { get; set; }
    }
}
