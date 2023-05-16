using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Migrations
{
    public partial class init2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "NewsPaperId",
                table: "NewsPaperCategories",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_NewsPaperCategories_NewsPaperId",
                table: "NewsPaperCategories",
                column: "NewsPaperId");

            migrationBuilder.AddForeignKey(
                name: "FK_NewsPaperCategories_NewsPaper_NewsPaperId",
                table: "NewsPaperCategories",
                column: "NewsPaperId",
                principalTable: "NewsPaper",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NewsPaperCategories_NewsPaper_NewsPaperId",
                table: "NewsPaperCategories");

            migrationBuilder.DropIndex(
                name: "IX_NewsPaperCategories_NewsPaperId",
                table: "NewsPaperCategories");

            migrationBuilder.DropColumn(
                name: "NewsPaperId",
                table: "NewsPaperCategories");
        }
    }
}
