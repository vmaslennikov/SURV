namespace SURV.Models.Interfaces
{
    public interface ISoftDelete
    {
        bool IsDeleted { get; set; }
    }
}