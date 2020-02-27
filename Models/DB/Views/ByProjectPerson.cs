namespace SURV.Models.DB {
    public class ByProjectPerson {
        public int ProjectId { get; set; }
        public string ProjectTitle { get; set; }
        public int? ManagerId { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public int PersonId { get; set; }
        public string PersonName { get; set; }
        public int Sum { get; set; }
        /*

        SELECT p.Id as ProjectId,
               p.Title as ProjectTitle,
               p.ManagerId,
               t.Year,
               t.Month,
               t.PersonId,
               u.FullName as PersonName,
               sum(h.Hours) AS Sum
          FROM ServiceLines s
               JOIN
               Tabels t ON t.Id = s.TabelId
               JOIN
               Projects p ON p.Id = s.ProjectId
               JOIN
               Persons u ON u.Id = t.PersonId
               JOIN
               WssHours h ON s.Id = h.ServicelineId
         GROUP BY p.Id,
                  p.ManagerId,
                  t.Year,
                  t.Month,
                  t.PersonId,
                  u.FullName

         */
    }

    public class ByProjectPersonService {
        public int ProjectId { get; set; }
        public string ProjectTitle { get; set; }
        public int? ManagerId { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public int PersonId { get; set; }
        public string PersonName { get; set; }
        public int ServiceId { get; set; }
        public string ServiceName { get; set; }
        public int Sum { get; set; }
        /*

SELECT p.Id AS ProjectId,
       p.Title AS ProjectTitle,
       p.ManagerId,
       t.Year,
       t.Month,
       t.PersonId,
       u.FullName AS PersonName,
       s.ServiceId,
       ss.Title AS ServiceName,
       sum(h.Hours) AS Sum
  FROM ServiceLines s
       JOIN
       Tabels t ON t.Id = s.TabelId
       JOIN
       Services ss ON ss.Id = s.ServiceId
       JOIN
       Projects p ON p.Id = s.ProjectId
       JOIN
       Persons u ON u.Id = t.PersonId
       JOIN
       WssHours h ON s.Id = h.ServicelineId
 GROUP BY p.Id,
          p.ManagerId,
          t.Year,
          t.Month,
          t.PersonId,
          u.FullName,
          s.ServiceId,
          ss.Title

         */
    }
}