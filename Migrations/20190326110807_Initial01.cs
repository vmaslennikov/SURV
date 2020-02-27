using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SURV.Migrations
{
    public partial class Initial01 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Alerts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IsDeleted = table.Column<bool>(type: "Boolean", nullable: false),
                    Active = table.Column<bool>(type: "Boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    CreatedById = table.Column<int>(nullable: true),
                    ModifiedById = table.Column<int>(nullable: true),
                    Title = table.Column<string>(maxLength: 255, nullable: false),
                    Code = table.Column<string>(maxLength: 255, nullable: true),
                    Body = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Alerts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IsDeleted = table.Column<bool>(type: "Boolean", nullable: false),
                    Active = table.Column<bool>(type: "Boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    CreatedById = table.Column<int>(nullable: true),
                    ModifiedById = table.Column<int>(nullable: true),
                    Title = table.Column<string>(maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ErrorMessages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IsDeleted = table.Column<bool>(type: "Boolean", nullable: false),
                    Active = table.Column<bool>(type: "Boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    CreatedById = table.Column<int>(nullable: true),
                    ModifiedById = table.Column<int>(nullable: true),
                    Title = table.Column<string>(maxLength: 255, nullable: false),
                    Body = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ErrorMessages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Grades",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IsDeleted = table.Column<bool>(type: "Boolean", nullable: false),
                    Active = table.Column<bool>(type: "Boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    CreatedById = table.Column<int>(nullable: true),
                    ModifiedById = table.Column<int>(nullable: true),
                    Title = table.Column<string>(maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Grades", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IsDeleted = table.Column<bool>(type: "Boolean", nullable: false),
                    Active = table.Column<bool>(type: "Boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    CreatedById = table.Column<int>(nullable: true),
                    ModifiedById = table.Column<int>(nullable: true),
                    Title = table.Column<string>(maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ServiceTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IsDeleted = table.Column<bool>(type: "Boolean", nullable: false),
                    Active = table.Column<bool>(type: "Boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    CreatedById = table.Column<int>(nullable: true),
                    ModifiedById = table.Column<int>(nullable: true),
                    Title = table.Column<string>(maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WorkDays",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IsDeleted = table.Column<bool>(type: "Boolean", nullable: false),
                    Active = table.Column<bool>(type: "Boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    CreatedById = table.Column<int>(nullable: true),
                    ModifiedById = table.Column<int>(nullable: true),
                    Title = table.Column<string>(maxLength: 255, nullable: false),
                    Date = table.Column<DateTime>(type: "DateTime", nullable: false),
                    DayType = table.Column<int>(nullable: false),
                    Comment = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkDays", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Clients",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IsDeleted = table.Column<bool>(type: "Boolean", nullable: false),
                    Active = table.Column<bool>(type: "Boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    CreatedById = table.Column<int>(nullable: true),
                    ModifiedById = table.Column<int>(nullable: true),
                    Title = table.Column<string>(maxLength: 255, nullable: false),
                    DateFrom = table.Column<DateTime>(type: "DateTime", nullable: true),
                    DateTill = table.Column<DateTime>(type: "DateTime", nullable: true),
                    CompanyId = table.Column<int>(nullable: true),
                    NonResident = table.Column<bool>(type: "Boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Clients_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Units",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IsDeleted = table.Column<bool>(type: "Boolean", nullable: false),
                    Active = table.Column<bool>(type: "Boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    CreatedById = table.Column<int>(nullable: true),
                    ModifiedById = table.Column<int>(nullable: true),
                    Title = table.Column<string>(maxLength: 255, nullable: false),
                    CompanyId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Units", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Units_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Costs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IsDeleted = table.Column<bool>(type: "Boolean", nullable: false),
                    Active = table.Column<bool>(type: "Boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    CreatedById = table.Column<int>(nullable: true),
                    ModifiedById = table.Column<int>(nullable: true),
                    Title = table.Column<string>(maxLength: 255, nullable: false),
                    ClientId = table.Column<int>(nullable: true),
                    GradeId = table.Column<int>(nullable: true),
                    Sum = table.Column<double>(nullable: false),
                    Currency = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Costs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Costs_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Costs_Grades_GradeId",
                        column: x => x.GradeId,
                        principalTable: "Grades",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Persons",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    IsDeleted = table.Column<bool>(type: "Boolean", nullable: false),
                    Active = table.Column<bool>(type: "Boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    CreatedById = table.Column<int>(nullable: true),
                    ModifiedById = table.Column<int>(nullable: true),
                    GradeId = table.Column<int>(nullable: true),
                    ManagerId = table.Column<int>(nullable: true),
                    IsAdmin = table.Column<bool>(type: "Boolean", nullable: false),
                    Email = table.Column<string>(maxLength: 255, nullable: true),
                    TabelNumber = table.Column<string>(maxLength: 255, nullable: true),
                    DateFrom = table.Column<DateTime>(type: "DateTime", nullable: false),
                    DateTill = table.Column<DateTime>(type: "DateTime", nullable: true),
                    FullName = table.Column<string>(maxLength: 255, nullable: true),
                    UserName = table.Column<string>(maxLength: 255, nullable: true),
                    WorkType = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Persons", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Persons_Grades_GradeId",
                        column: x => x.GradeId,
                        principalTable: "Grades",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Persons_Units_Id",
                        column: x => x.Id,
                        principalTable: "Units",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Persons_Persons_ManagerId",
                        column: x => x.ManagerId,
                        principalTable: "Persons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IsDeleted = table.Column<bool>(type: "Boolean", nullable: false),
                    Active = table.Column<bool>(type: "Boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    CreatedById = table.Column<int>(nullable: true),
                    ModifiedById = table.Column<int>(nullable: true),
                    Title = table.Column<string>(maxLength: 255, nullable: false),
                    ServiceTypeId = table.Column<int>(nullable: false),
                    UnitId = table.Column<int>(nullable: false),
                    CompanyId = table.Column<int>(nullable: false),
                    Comment = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Services_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Services_ServiceTypes_ServiceTypeId",
                        column: x => x.ServiceTypeId,
                        principalTable: "ServiceTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Services_Units_UnitId",
                        column: x => x.UnitId,
                        principalTable: "Units",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HrMonths",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IsDeleted = table.Column<bool>(type: "Boolean", nullable: false),
                    Active = table.Column<bool>(type: "Boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    CreatedById = table.Column<int>(nullable: true),
                    ModifiedById = table.Column<int>(nullable: true),
                    Title = table.Column<string>(maxLength: 255, nullable: false),
                    Date = table.Column<DateTime>(type: "DateTime", nullable: false),
                    ApproveDate = table.Column<DateTime>(type: "DateTime", nullable: true),
                    ApprovePersonId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HrMonths", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HrMonths_Persons_ApprovePersonId",
                        column: x => x.ApprovePersonId,
                        principalTable: "Persons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HrYears",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IsDeleted = table.Column<bool>(type: "Boolean", nullable: false),
                    Active = table.Column<bool>(type: "Boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    CreatedById = table.Column<int>(nullable: true),
                    ModifiedById = table.Column<int>(nullable: true),
                    Title = table.Column<string>(maxLength: 255, nullable: false),
                    Date = table.Column<DateTime>(type: "DateTime", nullable: false),
                    ApproveDate = table.Column<DateTime>(type: "DateTime", nullable: true),
                    ApprovePersonId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HrYears", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HrYears_Persons_ApprovePersonId",
                        column: x => x.ApprovePersonId,
                        principalTable: "Persons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PersonCompanies",
                columns: table => new
                {
                    CompanyId = table.Column<int>(nullable: false),
                    PersonId = table.Column<int>(nullable: false),
                    Id = table.Column<int>(nullable: false),
                    IsDeleted = table.Column<bool>(type: "Boolean", nullable: false),
                    Active = table.Column<bool>(type: "Boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    CreatedById = table.Column<int>(nullable: true),
                    ModifiedById = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonCompanies", x => new { x.PersonId, x.CompanyId });
                    table.UniqueConstraint("AK_PersonCompanies_Id", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PersonCompanies_Persons_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Persons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PersonCompanies_Companies_PersonId",
                        column: x => x.PersonId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PersonRoles",
                columns: table => new
                {
                    RoleId = table.Column<int>(nullable: false),
                    PersonId = table.Column<int>(nullable: false),
                    Id = table.Column<int>(nullable: false),
                    IsDeleted = table.Column<bool>(type: "Boolean", nullable: false),
                    Active = table.Column<bool>(type: "Boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    CreatedById = table.Column<int>(nullable: true),
                    ModifiedById = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonRoles", x => new { x.PersonId, x.RoleId });
                    table.UniqueConstraint("AK_PersonRoles_Id", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PersonRoles_Roles_PersonId",
                        column: x => x.PersonId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PersonRoles_Persons_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Persons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IsDeleted = table.Column<bool>(type: "Boolean", nullable: false),
                    Active = table.Column<bool>(type: "Boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    CreatedById = table.Column<int>(nullable: true),
                    ModifiedById = table.Column<int>(nullable: true),
                    Title = table.Column<string>(maxLength: 255, nullable: false),
                    DateFrom = table.Column<DateTime>(type: "DateTime", nullable: true),
                    DateTill = table.Column<DateTime>(type: "DateTime", nullable: true),
                    ClientId = table.Column<int>(nullable: true),
                    ManagerId = table.Column<int>(nullable: true),
                    CompanyId = table.Column<int>(nullable: true),
                    DeputyId = table.Column<int>(nullable: true),
                    ViewerId = table.Column<int>(nullable: true),
                    Block = table.Column<bool>(type: "Boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Projects_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Projects_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Projects_Persons_DeputyId",
                        column: x => x.DeputyId,
                        principalTable: "Persons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Projects_Persons_ManagerId",
                        column: x => x.ManagerId,
                        principalTable: "Persons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Projects_Persons_ViewerId",
                        column: x => x.ViewerId,
                        principalTable: "Persons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Tabels",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IsDeleted = table.Column<bool>(type: "Boolean", nullable: false),
                    Active = table.Column<bool>(type: "Boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    CreatedById = table.Column<int>(nullable: true),
                    ModifiedById = table.Column<int>(nullable: true),
                    Year = table.Column<int>(nullable: false),
                    Month = table.Column<int>(nullable: false),
                    Fill = table.Column<bool>(type: "Boolean", nullable: false),
                    Approve = table.Column<bool>(type: "Boolean", nullable: false),
                    FillDate = table.Column<DateTime>(type: "DateTime", nullable: false),
                    ApproveDate = table.Column<DateTime>(type: "DateTime", nullable: false),
                    ApproverId = table.Column<int>(nullable: true),
                    CompanyId = table.Column<int>(nullable: true),
                    PersonId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tabels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tabels_Persons_ApproverId",
                        column: x => x.ApproverId,
                        principalTable: "Persons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Tabels_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Tabels_Persons_PersonId",
                        column: x => x.PersonId,
                        principalTable: "Persons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserCalendars",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IsDeleted = table.Column<bool>(type: "Boolean", nullable: false),
                    Active = table.Column<bool>(type: "Boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    CreatedById = table.Column<int>(nullable: true),
                    ModifiedById = table.Column<int>(nullable: true),
                    Title = table.Column<string>(maxLength: 255, nullable: false),
                    DateFrom = table.Column<DateTime>(type: "DateTime", nullable: true),
                    DateTill = table.Column<DateTime>(type: "DateTime", nullable: true),
                    PersonId = table.Column<int>(nullable: true),
                    ClientId = table.Column<int>(nullable: true),
                    DayType = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserCalendars", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserCalendars_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserCalendars_Persons_PersonId",
                        column: x => x.PersonId,
                        principalTable: "Persons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ServiceLines",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IsDeleted = table.Column<bool>(type: "Boolean", nullable: false),
                    Active = table.Column<bool>(type: "Boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    CreatedById = table.Column<int>(nullable: true),
                    ModifiedById = table.Column<int>(nullable: true),
                    ServiceId = table.Column<int>(nullable: false),
                    ProjectId = table.Column<int>(nullable: false),
                    ClientId = table.Column<int>(nullable: false),
                    TabelId = table.Column<int>(nullable: false),
                    Result = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceLines", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ServiceLines_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ServiceLines_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ServiceLines_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ServiceLines_Tabels_TabelId",
                        column: x => x.TabelId,
                        principalTable: "Tabels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WssHours",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    IsDeleted = table.Column<bool>(type: "Boolean", nullable: false),
                    Active = table.Column<bool>(type: "Boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "DateTime", nullable: false),
                    CreatedById = table.Column<int>(nullable: true),
                    ModifiedById = table.Column<int>(nullable: true),
                    ServiceId = table.Column<int>(nullable: false),
                    Date = table.Column<DateTime>(type: "Dat", nullable: false),
                    Hours = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WssHours", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WssHours_ServiceLines_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "ServiceLines",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Clients_CompanyId",
                table: "Clients",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Costs_ClientId",
                table: "Costs",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_Costs_GradeId",
                table: "Costs",
                column: "GradeId");

            migrationBuilder.CreateIndex(
                name: "IX_HrMonths_ApprovePersonId",
                table: "HrMonths",
                column: "ApprovePersonId");

            migrationBuilder.CreateIndex(
                name: "IX_HrYears_ApprovePersonId",
                table: "HrYears",
                column: "ApprovePersonId");

            migrationBuilder.CreateIndex(
                name: "IX_PersonCompanies_CompanyId",
                table: "PersonCompanies",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_PersonRoles_RoleId",
                table: "PersonRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Persons_GradeId",
                table: "Persons",
                column: "GradeId");

            migrationBuilder.CreateIndex(
                name: "IX_Persons_ManagerId",
                table: "Persons",
                column: "ManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_ClientId",
                table: "Projects",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_CompanyId",
                table: "Projects",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_DeputyId",
                table: "Projects",
                column: "DeputyId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_ManagerId",
                table: "Projects",
                column: "ManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_ViewerId",
                table: "Projects",
                column: "ViewerId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceLines_ClientId",
                table: "ServiceLines",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceLines_ProjectId",
                table: "ServiceLines",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceLines_ServiceId",
                table: "ServiceLines",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceLines_TabelId",
                table: "ServiceLines",
                column: "TabelId");

            migrationBuilder.CreateIndex(
                name: "IX_Services_CompanyId",
                table: "Services",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Services_ServiceTypeId",
                table: "Services",
                column: "ServiceTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Services_UnitId",
                table: "Services",
                column: "UnitId");

            migrationBuilder.CreateIndex(
                name: "IX_Tabels_ApproverId",
                table: "Tabels",
                column: "ApproverId");

            migrationBuilder.CreateIndex(
                name: "IX_Tabels_CompanyId",
                table: "Tabels",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Tabels_PersonId",
                table: "Tabels",
                column: "PersonId");

            migrationBuilder.CreateIndex(
                name: "IX_Units_CompanyId",
                table: "Units",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_UserCalendars_ClientId",
                table: "UserCalendars",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_UserCalendars_PersonId",
                table: "UserCalendars",
                column: "PersonId");

            migrationBuilder.CreateIndex(
                name: "IX_WssHours_ServiceId",
                table: "WssHours",
                column: "ServiceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Alerts");

            migrationBuilder.DropTable(
                name: "Costs");

            migrationBuilder.DropTable(
                name: "ErrorMessages");

            migrationBuilder.DropTable(
                name: "HrMonths");

            migrationBuilder.DropTable(
                name: "HrYears");

            migrationBuilder.DropTable(
                name: "PersonCompanies");

            migrationBuilder.DropTable(
                name: "PersonRoles");

            migrationBuilder.DropTable(
                name: "UserCalendars");

            migrationBuilder.DropTable(
                name: "WorkDays");

            migrationBuilder.DropTable(
                name: "WssHours");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "ServiceLines");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "Services");

            migrationBuilder.DropTable(
                name: "Tabels");

            migrationBuilder.DropTable(
                name: "Clients");

            migrationBuilder.DropTable(
                name: "ServiceTypes");

            migrationBuilder.DropTable(
                name: "Persons");

            migrationBuilder.DropTable(
                name: "Grades");

            migrationBuilder.DropTable(
                name: "Units");

            migrationBuilder.DropTable(
                name: "Companies");
        }
    }
}
