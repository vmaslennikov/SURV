using System.ComponentModel.DataAnnotations;
using JsonApiDotNetCore.Models;

namespace SURV.Models.DB {
    public class Filedata : BaseTitleObject {
        [Attr ("length")]
        public long Length { get; set; }

        [Attr ("path")]
        [StringLength (512)]
        public string Path { get; set; }

        [Attr ("folder")]
        public bool Folder { get; set; }
    }

    /*
    
CREATE TABLE Docs (
    Id           INTEGER    NOT NULL
                            CONSTRAINT PK_Alerts PRIMARY KEY AUTOINCREMENT,
    IsDeleted    BOOLEAN    NOT NULL,
    Active       BOOLEAN    NOT NULL,
    CreatedAt    DATETIME   NOT NULL,
    ModifiedAt   DATETIME   NOT NULL,
    CreatedById  INTEGER,
    ModifiedById INTEGER,
    Title        TEXT (255) NOT NULL,
    Folder       BOOLEAN    NOT NULL,
    Path         TEXT (512) NOT NULL,
    Length       NUMERIC    NOT NULL
);
    
     */
}