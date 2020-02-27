using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SURV.Migrations
{
    public partial class Initial03 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HrMonths_Persons_ApprovePersonId",
                table: "HrMonths");

            migrationBuilder.DropForeignKey(
                name: "FK_HrYears_Persons_ApprovePersonId",
                table: "HrYears");

            migrationBuilder.DropForeignKey(
                name: "FK_PersonCompanies_Persons_CompanyId",
                table: "PersonCompanies");

            migrationBuilder.DropForeignKey(
                name: "FK_PersonCompanies_Companies_PersonId",
                table: "PersonCompanies");

            migrationBuilder.DropForeignKey(
                name: "FK_PersonRoles_Roles_PersonId",
                table: "PersonRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_PersonRoles_Persons_RoleId",
                table: "PersonRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_Persons_Units_Id",
                table: "Persons");

            migrationBuilder.DropForeignKey(
                name: "FK_ServiceLines_Clients_ClientId",
                table: "ServiceLines");

            migrationBuilder.DropForeignKey(
                name: "FK_ServiceLines_Projects_ProjectId",
                table: "ServiceLines");

            migrationBuilder.DropForeignKey(
                name: "FK_ServiceLines_Services_ServiceId",
                table: "ServiceLines");

            migrationBuilder.DropForeignKey(
                name: "FK_ServiceLines_Tabels_TabelId",
                table: "ServiceLines");

            migrationBuilder.DropForeignKey(
                name: "FK_Services_ServiceTypes_ServiceTypeId",
                table: "Services");

            migrationBuilder.DropForeignKey(
                name: "FK_UserCalendars_Clients_ClientId",
                table: "UserCalendars");

            migrationBuilder.DropForeignKey(
                name: "FK_UserCalendars_Persons_PersonId",
                table: "UserCalendars");

            migrationBuilder.DropForeignKey(
                name: "FK_WssHours_ServiceLines_ServiceId",
                table: "WssHours");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WssHours",
                table: "WssHours");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WorkDays",
                table: "WorkDays");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserCalendars",
                table: "UserCalendars");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ServiceTypes",
                table: "ServiceTypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ServiceLines",
                table: "ServiceLines");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_PersonRoles_Id",
                table: "PersonRoles");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_PersonCompanies_Id",
                table: "PersonCompanies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HrYears",
                table: "HrYears");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HrMonths",
                table: "HrMonths");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ErrorMessages",
                table: "ErrorMessages");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "WssHours");

            migrationBuilder.DropColumn(
                name: "DateFrom",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "DateTill",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "PersonRoles");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "PersonRoles");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "PersonCompanies");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "PersonCompanies");

            migrationBuilder.RenameTable(
                name: "WssHours",
                newName: "Wsshours");

            migrationBuilder.RenameTable(
                name: "WorkDays",
                newName: "Workdays");

            migrationBuilder.RenameTable(
                name: "UserCalendars",
                newName: "Usercalendars");

            migrationBuilder.RenameTable(
                name: "ServiceTypes",
                newName: "Servicetypes");

            migrationBuilder.RenameTable(
                name: "ServiceLines",
                newName: "Servicelines");

            migrationBuilder.RenameTable(
                name: "HrYears",
                newName: "Hryears");

            migrationBuilder.RenameTable(
                name: "HrMonths",
                newName: "Hrmonths");

            migrationBuilder.RenameTable(
                name: "ErrorMessages",
                newName: "Errormessages");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "Wsshours",
                newName: "ModifiedbyId");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Wsshours",
                newName: "CreatedbyId");

            migrationBuilder.RenameColumn(
                name: "ServiceId",
                table: "Wsshours",
                newName: "ServicelineId");

            migrationBuilder.RenameIndex(
                name: "IX_WssHours_ServiceId",
                table: "Wsshours",
                newName: "IX_Wsshours_ServicelineId");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "Workdays",
                newName: "ModifiedbyId");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Workdays",
                newName: "CreatedbyId");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "Usercalendars",
                newName: "ModifiedbyId");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Usercalendars",
                newName: "CreatedbyId");

            migrationBuilder.RenameIndex(
                name: "IX_UserCalendars_PersonId",
                table: "Usercalendars",
                newName: "IX_Usercalendars_PersonId");

            migrationBuilder.RenameIndex(
                name: "IX_UserCalendars_ClientId",
                table: "Usercalendars",
                newName: "IX_Usercalendars_ClientId");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "Units",
                newName: "ModifiedbyId");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Units",
                newName: "CreatedbyId");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "Tabels",
                newName: "ModifiedbyId");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Tabels",
                newName: "CreatedbyId");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "Servicetypes",
                newName: "ModifiedbyId");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Servicetypes",
                newName: "CreatedbyId");

            migrationBuilder.RenameColumn(
                name: "ServiceTypeId",
                table: "Services",
                newName: "ServicetypeId");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "Services",
                newName: "ModifiedbyId");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Services",
                newName: "CreatedbyId");

            migrationBuilder.RenameIndex(
                name: "IX_Services_ServiceTypeId",
                table: "Services",
                newName: "IX_Services_ServicetypeId");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "Servicelines",
                newName: "ModifiedbyId");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Servicelines",
                newName: "CreatedbyId");

            migrationBuilder.RenameIndex(
                name: "IX_ServiceLines_TabelId",
                table: "Servicelines",
                newName: "IX_Servicelines_TabelId");

            migrationBuilder.RenameIndex(
                name: "IX_ServiceLines_ServiceId",
                table: "Servicelines",
                newName: "IX_Servicelines_ServiceId");

            migrationBuilder.RenameIndex(
                name: "IX_ServiceLines_ProjectId",
                table: "Servicelines",
                newName: "IX_Servicelines_ProjectId");

            migrationBuilder.RenameIndex(
                name: "IX_ServiceLines_ClientId",
                table: "Servicelines",
                newName: "IX_Servicelines_ClientId");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "Roles",
                newName: "ModifiedbyId");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Roles",
                newName: "CreatedbyId");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "Projects",
                newName: "ModifiedbyId");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Projects",
                newName: "CreatedbyId");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "Persons",
                newName: "ModifiedbyId");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Persons",
                newName: "CreatedbyId");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "PersonRoles",
                newName: "ModifiedbyId");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "PersonRoles",
                newName: "CreatedbyId");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "PersonCompanies",
                newName: "ModifiedbyId");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "PersonCompanies",
                newName: "CreatedbyId");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "Hryears",
                newName: "ModifiedbyId");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Hryears",
                newName: "CreatedbyId");

            migrationBuilder.RenameColumn(
                name: "ApprovePersonId",
                table: "Hryears",
                newName: "ApprovepersonId");

            migrationBuilder.RenameIndex(
                name: "IX_HrYears_ApprovePersonId",
                table: "Hryears",
                newName: "IX_Hryears_ApprovepersonId");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "Hrmonths",
                newName: "ModifiedbyId");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Hrmonths",
                newName: "CreatedbyId");

            migrationBuilder.RenameColumn(
                name: "ApprovePersonId",
                table: "Hrmonths",
                newName: "ApprovepersonId");

            migrationBuilder.RenameIndex(
                name: "IX_HrMonths_ApprovePersonId",
                table: "Hrmonths",
                newName: "IX_Hrmonths_ApprovepersonId");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "Grades",
                newName: "ModifiedbyId");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Grades",
                newName: "CreatedbyId");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "Errormessages",
                newName: "ModifiedbyId");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Errormessages",
                newName: "CreatedbyId");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "Costs",
                newName: "ModifiedbyId");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Costs",
                newName: "CreatedbyId");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "Companies",
                newName: "ModifiedbyId");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Companies",
                newName: "CreatedbyId");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "Clients",
                newName: "ModifiedbyId");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Clients",
                newName: "CreatedbyId");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "Alerts",
                newName: "ModifiedbyId");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Alerts",
                newName: "CreatedbyId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Wsshours",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "Wsshours",
                type: "DATE",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "Date");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Wsshours",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Wsshours",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Workdays",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Workdays",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "Workdays",
                type: "DATE",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Workdays",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Workdays",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Usercalendars",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Usercalendars",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateTill",
                table: "Usercalendars",
                type: "DATE",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "DateTime",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateFrom",
                table: "Usercalendars",
                type: "DATE",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "DateTime",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Usercalendars",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Usercalendars",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Units",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Units",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Units",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Units",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AddColumn<int>(
                name: "ManagerId",
                table: "Units",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Tabels",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Tabels",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "FillDate",
                table: "Tabels",
                type: "DATETIME",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "Fill",
                table: "Tabels",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Tabels",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ApproveDate",
                table: "Tabels",
                type: "DATETIME",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "Approve",
                table: "Tabels",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Tabels",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Tabels",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Servicetypes",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Servicetypes",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Servicetypes",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Servicetypes",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Services",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Services",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Services",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Services",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Servicelines",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Servicelines",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Servicelines",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Servicelines",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Roles",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Roles",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Roles",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Roles",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Projects",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Projects",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Projects",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "Block",
                table: "Projects",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Projects",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Persons",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Persons",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<bool>(
                name: "IsAdmin",
                table: "Persons",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateTill",
                table: "Persons",
                type: "DATETIME",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "DateTime",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateFrom",
                table: "Persons",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Persons",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Persons",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Persons",
                nullable: false,
                oldClrType: typeof(int))
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<int>(
                name: "UnitId",
                table: "Persons",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "PersonRoles",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "PersonRoles",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "PersonRoles",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "PersonCompanies",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "PersonCompanies",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "PersonCompanies",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Hryears",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Hryears",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Hryears",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Hryears",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Hrmonths",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Hrmonths",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Hrmonths",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Hrmonths",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Grades",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Grades",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Grades",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Grades",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Errormessages",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Errormessages",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Errormessages",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Errormessages",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Costs",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Costs",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Costs",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Costs",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Companies",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Companies",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Companies",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Companies",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<bool>(
                name: "NonResident",
                table: "Clients",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Clients",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Clients",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateTill",
                table: "Clients",
                type: "DATE",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "DateTime",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateFrom",
                table: "Clients",
                type: "DATE",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "DateTime",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Clients",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Clients",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Alerts",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Alerts",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Alerts",
                type: "DATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DateTime");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Alerts",
                type: "BOOLEAN",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "Boolean");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Wsshours",
                table: "Wsshours",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Workdays",
                table: "Workdays",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Usercalendars",
                table: "Usercalendars",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Servicetypes",
                table: "Servicetypes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Servicelines",
                table: "Servicelines",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Hryears",
                table: "Hryears",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Hrmonths",
                table: "Hrmonths",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Errormessages",
                table: "Errormessages",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Active = table.Column<bool>(type: "BOOLEAN", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "DATETIME", nullable: false),
                    CreatedbyId = table.Column<int>(nullable: true),
                    ModifiedbyId = table.Column<int>(nullable: true),
                    IsDeleted = table.Column<bool>(type: "BOOLEAN", nullable: false),
                    Title = table.Column<string>(maxLength: 255, nullable: false),
                    Body = table.Column<string>(nullable: true),
                    PersonId = table.Column<int>(nullable: false),
                    Completed = table.Column<bool>(type: "BOOLEAN", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Messages_Persons_PersonId",
                        column: x => x.PersonId,
                        principalTable: "Persons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Units_ManagerId",
                table: "Units",
                column: "ManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_Persons_UnitId",
                table: "Persons",
                column: "UnitId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_PersonId",
                table: "Messages",
                column: "PersonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Hrmonths_Persons_ApprovepersonId",
                table: "Hrmonths",
                column: "ApprovepersonId",
                principalTable: "Persons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Hryears_Persons_ApprovepersonId",
                table: "Hryears",
                column: "ApprovepersonId",
                principalTable: "Persons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PersonCompanies_Companies_CompanyId",
                table: "PersonCompanies",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PersonCompanies_Persons_PersonId",
                table: "PersonCompanies",
                column: "PersonId",
                principalTable: "Persons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PersonRoles_Persons_PersonId",
                table: "PersonRoles",
                column: "PersonId",
                principalTable: "Persons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PersonRoles_Roles_RoleId",
                table: "PersonRoles",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Persons_Units_UnitId",
                table: "Persons",
                column: "UnitId",
                principalTable: "Units",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Servicelines_Clients_ClientId",
                table: "Servicelines",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Servicelines_Projects_ProjectId",
                table: "Servicelines",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Servicelines_Services_ServiceId",
                table: "Servicelines",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Servicelines_Tabels_TabelId",
                table: "Servicelines",
                column: "TabelId",
                principalTable: "Tabels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Services_Servicetypes_ServicetypeId",
                table: "Services",
                column: "ServicetypeId",
                principalTable: "Servicetypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Units_Persons_ManagerId",
                table: "Units",
                column: "ManagerId",
                principalTable: "Persons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Usercalendars_Clients_ClientId",
                table: "Usercalendars",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Usercalendars_Persons_PersonId",
                table: "Usercalendars",
                column: "PersonId",
                principalTable: "Persons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Wsshours_Servicelines_ServicelineId",
                table: "Wsshours",
                column: "ServicelineId",
                principalTable: "Servicelines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Hrmonths_Persons_ApprovepersonId",
                table: "Hrmonths");

            migrationBuilder.DropForeignKey(
                name: "FK_Hryears_Persons_ApprovepersonId",
                table: "Hryears");

            migrationBuilder.DropForeignKey(
                name: "FK_PersonCompanies_Companies_CompanyId",
                table: "PersonCompanies");

            migrationBuilder.DropForeignKey(
                name: "FK_PersonCompanies_Persons_PersonId",
                table: "PersonCompanies");

            migrationBuilder.DropForeignKey(
                name: "FK_PersonRoles_Persons_PersonId",
                table: "PersonRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_PersonRoles_Roles_RoleId",
                table: "PersonRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_Persons_Units_UnitId",
                table: "Persons");

            migrationBuilder.DropForeignKey(
                name: "FK_Servicelines_Clients_ClientId",
                table: "Servicelines");

            migrationBuilder.DropForeignKey(
                name: "FK_Servicelines_Projects_ProjectId",
                table: "Servicelines");

            migrationBuilder.DropForeignKey(
                name: "FK_Servicelines_Services_ServiceId",
                table: "Servicelines");

            migrationBuilder.DropForeignKey(
                name: "FK_Servicelines_Tabels_TabelId",
                table: "Servicelines");

            migrationBuilder.DropForeignKey(
                name: "FK_Services_Servicetypes_ServicetypeId",
                table: "Services");

            migrationBuilder.DropForeignKey(
                name: "FK_Units_Persons_ManagerId",
                table: "Units");

            migrationBuilder.DropForeignKey(
                name: "FK_Usercalendars_Clients_ClientId",
                table: "Usercalendars");

            migrationBuilder.DropForeignKey(
                name: "FK_Usercalendars_Persons_PersonId",
                table: "Usercalendars");

            migrationBuilder.DropForeignKey(
                name: "FK_Wsshours_Servicelines_ServicelineId",
                table: "Wsshours");

            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Wsshours",
                table: "Wsshours");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Workdays",
                table: "Workdays");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Usercalendars",
                table: "Usercalendars");

            migrationBuilder.DropIndex(
                name: "IX_Units_ManagerId",
                table: "Units");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Servicetypes",
                table: "Servicetypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Servicelines",
                table: "Servicelines");

            migrationBuilder.DropIndex(
                name: "IX_Persons_UnitId",
                table: "Persons");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Hryears",
                table: "Hryears");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Hrmonths",
                table: "Hrmonths");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Errormessages",
                table: "Errormessages");

            migrationBuilder.DropColumn(
                name: "ManagerId",
                table: "Units");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Tabels");

            migrationBuilder.DropColumn(
                name: "UnitId",
                table: "Persons");

            migrationBuilder.RenameTable(
                name: "Wsshours",
                newName: "WssHours");

            migrationBuilder.RenameTable(
                name: "Workdays",
                newName: "WorkDays");

            migrationBuilder.RenameTable(
                name: "Usercalendars",
                newName: "UserCalendars");

            migrationBuilder.RenameTable(
                name: "Servicetypes",
                newName: "ServiceTypes");

            migrationBuilder.RenameTable(
                name: "Servicelines",
                newName: "ServiceLines");

            migrationBuilder.RenameTable(
                name: "Hryears",
                newName: "HrYears");

            migrationBuilder.RenameTable(
                name: "Hrmonths",
                newName: "HrMonths");

            migrationBuilder.RenameTable(
                name: "Errormessages",
                newName: "ErrorMessages");

            migrationBuilder.RenameColumn(
                name: "ModifiedbyId",
                table: "WssHours",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedbyId",
                table: "WssHours",
                newName: "CreatedById");

            migrationBuilder.RenameColumn(
                name: "ServicelineId",
                table: "WssHours",
                newName: "ServiceId");

            migrationBuilder.RenameIndex(
                name: "IX_Wsshours_ServicelineId",
                table: "WssHours",
                newName: "IX_WssHours_ServiceId");

            migrationBuilder.RenameColumn(
                name: "ModifiedbyId",
                table: "WorkDays",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedbyId",
                table: "WorkDays",
                newName: "CreatedById");

            migrationBuilder.RenameColumn(
                name: "ModifiedbyId",
                table: "UserCalendars",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedbyId",
                table: "UserCalendars",
                newName: "CreatedById");

            migrationBuilder.RenameIndex(
                name: "IX_Usercalendars_PersonId",
                table: "UserCalendars",
                newName: "IX_UserCalendars_PersonId");

            migrationBuilder.RenameIndex(
                name: "IX_Usercalendars_ClientId",
                table: "UserCalendars",
                newName: "IX_UserCalendars_ClientId");

            migrationBuilder.RenameColumn(
                name: "ModifiedbyId",
                table: "Units",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedbyId",
                table: "Units",
                newName: "CreatedById");

            migrationBuilder.RenameColumn(
                name: "ModifiedbyId",
                table: "Tabels",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedbyId",
                table: "Tabels",
                newName: "CreatedById");

            migrationBuilder.RenameColumn(
                name: "ModifiedbyId",
                table: "ServiceTypes",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedbyId",
                table: "ServiceTypes",
                newName: "CreatedById");

            migrationBuilder.RenameColumn(
                name: "ServicetypeId",
                table: "Services",
                newName: "ServiceTypeId");

            migrationBuilder.RenameColumn(
                name: "ModifiedbyId",
                table: "Services",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedbyId",
                table: "Services",
                newName: "CreatedById");

            migrationBuilder.RenameIndex(
                name: "IX_Services_ServicetypeId",
                table: "Services",
                newName: "IX_Services_ServiceTypeId");

            migrationBuilder.RenameColumn(
                name: "ModifiedbyId",
                table: "ServiceLines",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedbyId",
                table: "ServiceLines",
                newName: "CreatedById");

            migrationBuilder.RenameIndex(
                name: "IX_Servicelines_TabelId",
                table: "ServiceLines",
                newName: "IX_ServiceLines_TabelId");

            migrationBuilder.RenameIndex(
                name: "IX_Servicelines_ServiceId",
                table: "ServiceLines",
                newName: "IX_ServiceLines_ServiceId");

            migrationBuilder.RenameIndex(
                name: "IX_Servicelines_ProjectId",
                table: "ServiceLines",
                newName: "IX_ServiceLines_ProjectId");

            migrationBuilder.RenameIndex(
                name: "IX_Servicelines_ClientId",
                table: "ServiceLines",
                newName: "IX_ServiceLines_ClientId");

            migrationBuilder.RenameColumn(
                name: "ModifiedbyId",
                table: "Roles",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedbyId",
                table: "Roles",
                newName: "CreatedById");

            migrationBuilder.RenameColumn(
                name: "ModifiedbyId",
                table: "Projects",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedbyId",
                table: "Projects",
                newName: "CreatedById");

            migrationBuilder.RenameColumn(
                name: "ModifiedbyId",
                table: "Persons",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedbyId",
                table: "Persons",
                newName: "CreatedById");

            migrationBuilder.RenameColumn(
                name: "ModifiedbyId",
                table: "PersonRoles",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedbyId",
                table: "PersonRoles",
                newName: "CreatedById");

            migrationBuilder.RenameColumn(
                name: "ModifiedbyId",
                table: "PersonCompanies",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedbyId",
                table: "PersonCompanies",
                newName: "CreatedById");

            migrationBuilder.RenameColumn(
                name: "ModifiedbyId",
                table: "HrYears",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedbyId",
                table: "HrYears",
                newName: "CreatedById");

            migrationBuilder.RenameColumn(
                name: "ApprovepersonId",
                table: "HrYears",
                newName: "ApprovePersonId");

            migrationBuilder.RenameIndex(
                name: "IX_Hryears_ApprovepersonId",
                table: "HrYears",
                newName: "IX_HrYears_ApprovePersonId");

            migrationBuilder.RenameColumn(
                name: "ModifiedbyId",
                table: "HrMonths",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedbyId",
                table: "HrMonths",
                newName: "CreatedById");

            migrationBuilder.RenameColumn(
                name: "ApprovepersonId",
                table: "HrMonths",
                newName: "ApprovePersonId");

            migrationBuilder.RenameIndex(
                name: "IX_Hrmonths_ApprovepersonId",
                table: "HrMonths",
                newName: "IX_HrMonths_ApprovePersonId");

            migrationBuilder.RenameColumn(
                name: "ModifiedbyId",
                table: "Grades",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedbyId",
                table: "Grades",
                newName: "CreatedById");

            migrationBuilder.RenameColumn(
                name: "ModifiedbyId",
                table: "ErrorMessages",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedbyId",
                table: "ErrorMessages",
                newName: "CreatedById");

            migrationBuilder.RenameColumn(
                name: "ModifiedbyId",
                table: "Costs",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedbyId",
                table: "Costs",
                newName: "CreatedById");

            migrationBuilder.RenameColumn(
                name: "ModifiedbyId",
                table: "Companies",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedbyId",
                table: "Companies",
                newName: "CreatedById");

            migrationBuilder.RenameColumn(
                name: "ModifiedbyId",
                table: "Clients",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedbyId",
                table: "Clients",
                newName: "CreatedById");

            migrationBuilder.RenameColumn(
                name: "ModifiedbyId",
                table: "Alerts",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedbyId",
                table: "Alerts",
                newName: "CreatedById");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "WssHours",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "WssHours",
                type: "Date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATE");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "WssHours",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "WssHours",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "WssHours",
                type: "Boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "WorkDays",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "WorkDays",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "WorkDays",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATE");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "WorkDays",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "WorkDays",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "UserCalendars",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "UserCalendars",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateTill",
                table: "UserCalendars",
                type: "DateTime",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "DATE",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateFrom",
                table: "UserCalendars",
                type: "DateTime",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "DATE",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "UserCalendars",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "UserCalendars",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Units",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Units",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Units",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Units",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Tabels",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Tabels",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "FillDate",
                table: "Tabels",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "Fill",
                table: "Tabels",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Tabels",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ApproveDate",
                table: "Tabels",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "Approve",
                table: "Tabels",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Tabels",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "ServiceTypes",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "ServiceTypes",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "ServiceTypes",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "ServiceTypes",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Services",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Services",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Services",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Services",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "ServiceLines",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "ServiceLines",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "ServiceLines",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "ServiceLines",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Roles",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Roles",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Roles",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Roles",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Projects",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Projects",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Projects",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "Block",
                table: "Projects",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Projects",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateFrom",
                table: "Projects",
                type: "DateTime",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateTill",
                table: "Projects",
                type: "DateTime",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Persons",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Persons",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<bool>(
                name: "IsAdmin",
                table: "Persons",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateTill",
                table: "Persons",
                type: "DateTime",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateFrom",
                table: "Persons",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Persons",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Persons",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Persons",
                nullable: false,
                oldClrType: typeof(int))
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "PersonRoles",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "PersonRoles",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "PersonRoles",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "PersonRoles",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "PersonRoles",
                type: "Boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "PersonCompanies",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "PersonCompanies",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "PersonCompanies",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "PersonCompanies",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "PersonCompanies",
                type: "Boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "HrYears",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "HrYears",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "HrYears",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "HrYears",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "HrMonths",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "HrMonths",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "HrMonths",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "HrMonths",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Grades",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Grades",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Grades",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Grades",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "ErrorMessages",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "ErrorMessages",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "ErrorMessages",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "ErrorMessages",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Costs",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Costs",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Costs",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Costs",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Companies",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Companies",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Companies",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Companies",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<bool>(
                name: "NonResident",
                table: "Clients",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Clients",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Clients",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateTill",
                table: "Clients",
                type: "DateTime",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "DATE",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateFrom",
                table: "Clients",
                type: "DateTime",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "DATE",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Clients",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Clients",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModifiedAt",
                table: "Alerts",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Alerts",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Alerts",
                type: "DateTime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATETIME");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Alerts",
                type: "Boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "BOOLEAN");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WssHours",
                table: "WssHours",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WorkDays",
                table: "WorkDays",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserCalendars",
                table: "UserCalendars",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ServiceTypes",
                table: "ServiceTypes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ServiceLines",
                table: "ServiceLines",
                column: "Id");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_PersonRoles_Id",
                table: "PersonRoles",
                column: "Id");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_PersonCompanies_Id",
                table: "PersonCompanies",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HrYears",
                table: "HrYears",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HrMonths",
                table: "HrMonths",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ErrorMessages",
                table: "ErrorMessages",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_HrMonths_Persons_ApprovePersonId",
                table: "HrMonths",
                column: "ApprovePersonId",
                principalTable: "Persons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_HrYears_Persons_ApprovePersonId",
                table: "HrYears",
                column: "ApprovePersonId",
                principalTable: "Persons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PersonCompanies_Persons_CompanyId",
                table: "PersonCompanies",
                column: "CompanyId",
                principalTable: "Persons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PersonCompanies_Companies_PersonId",
                table: "PersonCompanies",
                column: "PersonId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PersonRoles_Roles_PersonId",
                table: "PersonRoles",
                column: "PersonId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PersonRoles_Persons_RoleId",
                table: "PersonRoles",
                column: "RoleId",
                principalTable: "Persons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Persons_Units_Id",
                table: "Persons",
                column: "Id",
                principalTable: "Units",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceLines_Clients_ClientId",
                table: "ServiceLines",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceLines_Projects_ProjectId",
                table: "ServiceLines",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceLines_Services_ServiceId",
                table: "ServiceLines",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceLines_Tabels_TabelId",
                table: "ServiceLines",
                column: "TabelId",
                principalTable: "Tabels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Services_ServiceTypes_ServiceTypeId",
                table: "Services",
                column: "ServiceTypeId",
                principalTable: "ServiceTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserCalendars_Clients_ClientId",
                table: "UserCalendars",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserCalendars_Persons_PersonId",
                table: "UserCalendars",
                column: "PersonId",
                principalTable: "Persons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WssHours_ServiceLines_ServiceId",
                table: "WssHours",
                column: "ServiceId",
                principalTable: "ServiceLines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
