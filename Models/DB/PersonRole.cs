using System.ComponentModel.DataAnnotations.Schema;

namespace SURV.Models.DB
{
    public class PersonRole : AuditableObject {
        [ForeignKey (nameof (Role))]
        public int RoleId { get; set; }

        public Role Role { get; set; }

        [ForeignKey (nameof (Person))]
        public int PersonId { get; set; }

        public Person Person { get; set; }
    }
}