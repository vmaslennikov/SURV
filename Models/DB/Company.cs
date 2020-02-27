using JsonApiDotNetCore.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SURV.Models.DB
{
    public class Company : BaseTitleObject
    {
        [NotMapped] // ← tells EF to ignore this property
        [HasManyThrough(nameof(PersonCompanies))] // ← tells JADNC to use this as an alias to ArticleTags.Tags
        public List<Person> Persons { get; set; }

        public List<PersonCompany> PersonCompanies { get; set; }
    }
}
