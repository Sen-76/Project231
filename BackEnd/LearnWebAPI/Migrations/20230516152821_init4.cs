using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Migrations
{
    public partial class init4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NewsPaperNewsPaperCategory");

            migrationBuilder.CreateTable(
                name: "CategoryNewsPaper",
                columns: table => new
                {
                    CategoriesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NewsPapersId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryNewsPaper", x => new { x.CategoriesId, x.NewsPapersId });
                    table.ForeignKey(
                        name: "FK_CategoryNewsPaper_NewsPaper_NewsPapersId",
                        column: x => x.NewsPapersId,
                        principalTable: "NewsPaper",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoryNewsPaper_NewsPaperCategories_CategoriesId",
                        column: x => x.CategoriesId,
                        principalTable: "NewsPaperCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CategoryNewsPaper_NewsPapersId",
                table: "CategoryNewsPaper",
                column: "NewsPapersId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoryNewsPaper");

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
    }
}
