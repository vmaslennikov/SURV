using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SURV.Models.DB {
    // [Table("View_Pivot")]
    public class ByClientDataItem {
        public int Year { get; set; }
        public int Quartal { get; set; }
        public int ClientId { get; set; }
        public string projectTitle { get; set; }
        public string serviceTitle { get; set; }
        public string Result { get; set; }
        public string pFullName { get; set; }
        public string gradeTitle { get; set; }
        public double costByHours { get; set; }
        public string costCurrency { get; set; }
        public int SumByQuartal { get; set; }
    }

    /*
    Create View 'View_ByClient' as
select 
x.Year,
x.Quartal,
x.ClientId,
x.projectTitle,
x.serviceTitle,
x.Result,
x.pFullName,
x.gradeTitle,
x.costByHours,
x.costCurrency,
sum(x.SumByMonth) as SumByQuartal
from
(
select 
t.Year,
t.Month,
case t.Month
    when 1 then 1
    when 2 then 1
    when 3 then 1
    when 4 then 2
    when 5 then 2
    when 6 then 2
    when 7 then 3
    when 8 then 3
    when 9 then 3
    when 10 then 4
    when 11 then 4
    when 12 then 4
end as quartal,   
l.ClientId,
proj.Title     as projectTitle,
s.Title        as serviceTitle,
l.Result,
p.FullName     as pFullName,
g.Title        as gradeTitle,
cst.Sum        as costByHours,
cst.Currency   as costCurrency,
--l.Id           as servicelineId,
--m.FullName     as mFullName,
--u.Title        as unitTitle,
--c.Title        as clientTitle,
--pm.FullName    as pmFullName,
sum(h.Hours) as SumByMonth

from Wsshours h
join Servicelines l on l.id=h.ServicelineId
--join Clients c on c.id=l.ClientId
join Projects proj on proj.id=l.ProjectId
join Tabels t on t.Id=l.TabelId
join Services s on s.Id=l.ServiceId
join Persons p on t.PersonId = p.Id
join Grades g on g.id=p.GradeId
join Costs cst on cst.ClientId = l.ClientId and cst.GradeId=g.Id

where 1=1
and t.IsDeleted = 0
and l.IsDeleted = 0
and p.IsDeleted = 0
and proj.IsDeleted = 0
--and t.Year = 2018 
--and t.Month in (10,11,12)
--and c.id = 10

group by t.Year,
t.Month,
l.ClientId,
proj.Title,
l.id,
s.Title,
l.Result,
p.FullName,
g.Title,
cst.Sum,
cst.Currency

--order by proj.Title,p.FullName
) x

--where 1=1
--and x.Year = 2018 
--and x.Quartal = 4
--and x.ClientId = 10

group by x.Year,
x.quartal,
x.ClientId,
x.projectTitle,
x.serviceTitle,
x.Result,
x.pFullName,
x.gradeTitle,
x.costByHours,
x.costCurrency
order by x.Year, x.quartal, x.ClientId, x.projectTitle,x.pFullName,x.serviceTitle,x.Result
     */
}