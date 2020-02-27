using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using JsonApiDotNetCore.Models;

namespace SURV.Models.DB
{
    public class Role : BaseTitleObject {
        [NotMapped] // ← tells EF to ignore this property
        [HasManyThrough (nameof (PersonRoles))] // ← tells JADNC to use this as an alias to ArticleTags.Tags
        public List<Person> Persons { get; set; }

        public List<PersonRole> PersonRoles { get; set; }
    }
}