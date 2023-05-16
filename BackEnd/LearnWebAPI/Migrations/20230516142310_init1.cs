using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Migrations
{
    public partial class init1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NewsPaperCategories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NewsPaperCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NewsPaperDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NewsPaperId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Rate = table.Column<int>(type: "int", nullable: true),
                    Like = table.Column<bool>(type: "bit", nullable: true),
                    Dislike = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NewsPaperDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NewsPaperDetails_NewsPaper_NewsPaperId",
                        column: x => x.NewsPaperId,
                        principalTable: "NewsPaper",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NewsPaperDetails_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NewsPaperDetails_NewsPaperId",
                table: "NewsPaperDetails",
                column: "NewsPaperId");

            migrationBuilder.CreateIndex(
                name: "IX_NewsPaperDetails_UserId",
                table: "NewsPaperDetails",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NewsPaperCategories");

            migrationBuilder.DropTable(
                name: "NewsPaperDetails");
        }
    }
}
