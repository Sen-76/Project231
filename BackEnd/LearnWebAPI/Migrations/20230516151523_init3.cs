using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Migrations
{
    public partial class init3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "NewsPaperNewsPaperCategory",
                columns: table => new
                {
                    CategoriesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NewsPapersId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NewsPaperNewsPaperCategory", x => new { x.CategoriesId, x.NewsPapersId });
                    table.ForeignKey(
                        name: "FK_NewsPaperNewsPaperCategory_NewsPaper_NewsPapersId",
                        column: x => x.NewsPapersId,
                        principalTable: "NewsPaper",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NewsPaperNewsPaperCategory_NewsPaperCategories_CategoriesId",
                        column: x => x.CategoriesId,
                        principalTable: "NewsPaperCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NewsPaperNewsPaperCategory_NewsPapersId",
                table: "NewsPaperNewsPaperCategory",
                column: "NewsPapersId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NewsPaperNewsPaperCategory");

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
    }
}
