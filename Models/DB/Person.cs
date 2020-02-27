using JsonApiDotNetCore.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SURV.Models.DB
{
    public class Person : BaseObjectSoftDelete
    {
        //public virtual int? UnitId { get; set; }
        [ForeignKey (nameof (Unit))] public int? UnitId { get; set; }
        [HasOne] public virtual Unit Unit { get; set; }

        [ForeignKey (nameof (Grade))] public int? GradeId { get; set; }
        [HasOne] public virtual Grade Grade { get; set; }

        [ForeignKey (nameof (Manager))] public int? ManagerId { get; set; }
        [HasOne] public virtual Person Manager { get; set; }

        [StringLength(255)]
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Attr("email")]
        public string Email { get; set; }

        [StringLength(255)]
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Attr("tabelNumber")]
        public string TabelNumber { get; set; }

        [Column(TypeName = "DATETIME")]
        [Attr("dateFrom")]
        public DateTime DateFrom { get; set; }

        [Column(TypeName = "DATETIME")]
        [Attr("dateTill")]
        public DateTime? DateTill { get; set; }

        [StringLength(255)]
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]public string UserName { get; set; }
        [Attr("fullName")]
        public string FullName { get; set; }

        [StringLength(255)]
        [Attr("userName")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string UserName { get; set; }

        [Attr("workType")]
        public PersonWorkType WorkType { get; set; }

#pragma warning disable RCS1231 // Make parameter ref read-only.
        public bool CorrectUser(DateTime from, DateTime till)
#pragma warning restore RCS1231 // Make parameter ref read-only.
        {
            return DateFrom != DateTime.MinValue && DateFrom <= till && (DateTill > from || DateTill == DateTime.MinValue);
        }

        [NotMapped] // ← tells EF to ignore this property
        [HasManyThrough(nameof(PersonRoles))] // ← tells JADNC to use this as an alias to ArticleTags.Tags
        public List<Role> Roles { get; set; }

        public List<PersonRole> PersonRoles { get; set; }

        [NotMapped] // ← tells EF to ignore this property
        [HasManyThrough(nameof(PersonCompanies))] // ← tells JADNC to use this as an alias to ArticleTags.Tags
        public List<Company> Companies { get; set; }

        public List<PersonCompany> PersonCompanies { get; set; }
    }
}
