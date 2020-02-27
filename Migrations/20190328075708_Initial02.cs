using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SURV.Migrations
{
    public partial class Initial02 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "WssHours",
                type: "Date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "Dat");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "WssHours",
                type: "Dat",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "Date");
        }
    }
}
