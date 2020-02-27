using System.ComponentModel.DataAnnotations.Schema;

namespace SURV.Models.DB
{
    public class PersonCompany: AuditableObject
    {
        [ForeignKey (nameof (Company))]
        public int CompanyId { get; set; }

        public Company Company { get; set; }

        [ForeignKey (nameof (Person))]
        public int PersonId { get; set; }

        public Person Person { get; set; }
    }
}
