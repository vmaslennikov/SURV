using System;

namespace SURV.Models.Interfaces
{
    public interface IAuditableObject
    {
        int? CreatedbyId { get; set; }
        int? ModifiedbyId { get; set; }
        DateTime CreatedAt { get; set; }
        DateTime ModifiedAt { get; set; }
    }
}
