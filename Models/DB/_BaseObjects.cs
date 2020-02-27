using SURV.Models.Interfaces;
using JsonApiDotNetCore.Models;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SURV.Models.DB
{
    public abstract class AuditableObject : IAuditableObject
    {
        // [Attr("isDeleted")]
        // [DefaultValue(false)]
        // [Column(TypeName = "BOOLEAN")]
        // public bool IsDeleted { get; set; }

        [Attr("active")]
        [DefaultValue(true)]
        [Column(TypeName = "BOOLEAN")]
        public bool Active { get; set; }

        [Attr("createdAt")]
        [Column(TypeName = "DATETIME")]
        public DateTime CreatedAt { get; set; }

        [Attr("modifiedAt")]
        [Column(TypeName = "DATETIME")]
        public DateTime ModifiedAt { get; set; }

        [Attr("createdbyId")]
        public int? CreatedbyId { get; set; }

        [Attr("modifiedbyId")]
        public int? ModifiedbyId { get; set; }
    }

    public abstract class BaseObject : Identifiable<int>, IAuditableObject
    {
        [Key]
        [Attr("id")]
        public override int Id { get; set; }

        [Attr("active")]
        [DefaultValue(true)]
        [Column(TypeName = "BOOLEAN")]
        public bool Active { get; set; }

        [Attr("createdAt")]
        [Column(TypeName = "DATETIME")]
        public DateTime CreatedAt { get; set; }

        [Attr("modifiedAt")]
        [Column(TypeName = "DATETIME")]
        public DateTime ModifiedAt { get; set; }

        [Attr("createdbyId")]
        public int? CreatedbyId { get; set; }

        [Attr("modifiedbyId")]
        public int? ModifiedbyId { get; set; }
    }

    public abstract class BaseObjectSoftDelete : BaseObject, ISoftDelete
    {
        [Attr("isDeleted")]
        [DefaultValue(false)]
        [Column(TypeName = "BOOLEAN")]
        public bool IsDeleted { get; set; }
    }

    public abstract class BaseTitleObject : BaseObjectSoftDelete
    {
        [Required]
        [Attr("title")]
        [StringLength(255)]
        public string Title { get; set; }
    }

    public abstract class BasePeriodObject : BaseTitleObject
    {
        [Attr("dateFrom")]
        [Column(TypeName = "DATE")]
        public DateTime? DateFrom { get; set; }

        [Attr("dateTill")]
        [Column(TypeName = "DATE")]
        public DateTime? DateTill { get; set; }
    }
}
