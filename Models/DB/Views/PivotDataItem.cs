using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SURV.Models.DB {
    // [Table("View_Pivot")]
    public class PivotDataItem {
        public int Year { get; set; }
        public int Month { get; set; }
        public int CompanyId { get; set; }
        public DateTime Date { get; set; }
        public string pFullname { get; set; }
        public string mFullname { get; set; }
        public string pmFullname { get; set; }
        public string unitTitle { get; set; }
        public string gradeTitle { get; set; }
        public string clientTitle { get; set; }
        public string projectTitle { get; set; }
        public string serviceTtile { get; set; }
        public string Comment { get; set; }
        public string servicetypeTitle { get; set; }
        public string Result { get; set; }
        public int Hours { get; set; }
        public double Sum { get; set; }
        public string Currency { get; set; }
        public double TtlSum { get; set; }
        public string CostText { get { return $"{Sum} {Currency}"; } }

        /*
        Create View 'Veiw_Pivot' as 
select 
t.Year,
t.Month,
h.date         as Date,
p.FullName     as pFullName,
m.FullName     as mFullName,
u.Title        as unitTitle,
g.Title        as gradeTitle,
c.Title        as clientTitle,
proj.Title     as projectTitle,
pm.FullName    as pmFullName,
s.Title        as serviceTtile,
s.Comment      as Comment,
st.Title       as servicetypeTitle,
l.Result,
h.Hours,
cst.Sum,
cst.Currency,
h.Hours*cst.Sum as TtlSum
from Wsshours h
join Servicelines l on l.id=h.ServicelineId
join Clients c on c.id=l.ClientId
join Projects proj on proj.id=l.ProjectId
join Tabels t on t.Id=l.TabelId
join Services s on s.Id=l.ServiceId
join ServiceTypes st on st.Id = s.ServiceTypeId
join Persons p on t.PersonId = p.Id
join Units u on u.id=p.UnitId
join Grades g on g.id=p.GradeId
join Costs cst on cst.ClientId = c.Id and cst.GradeId=g.Id
left join Persons m on m.Id = p.ManagerId
left join Persons pm on pm.Id = proj.ManagerId
         */
    }
}