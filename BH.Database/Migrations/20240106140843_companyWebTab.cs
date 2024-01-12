using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BH.Database.Migrations
{
    public partial class companyWebTab : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MenuItemId",
                table: "WebTab",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StoreWebPageId",
                table: "WebTab",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Companies",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "StoreWebPage",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoreWebPage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StoreWebPage_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MenuItem",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Clickable = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    MenuItemId = table.Column<int>(type: "int", nullable: true),
                    StoreWebPageId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MenuItem_MenuItem_MenuItemId",
                        column: x => x.MenuItemId,
                        principalTable: "MenuItem",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_MenuItem_StoreWebPage_StoreWebPageId",
                        column: x => x.StoreWebPageId,
                        principalTable: "StoreWebPage",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_WebTab_MenuItemId",
                table: "WebTab",
                column: "MenuItemId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_WebTab_StoreWebPageId",
                table: "WebTab",
                column: "StoreWebPageId");

            migrationBuilder.CreateIndex(
                name: "IX_MenuItem_MenuItemId",
                table: "MenuItem",
                column: "MenuItemId");

            migrationBuilder.CreateIndex(
                name: "IX_MenuItem_StoreWebPageId",
                table: "MenuItem",
                column: "StoreWebPageId");

            migrationBuilder.CreateIndex(
                name: "IX_StoreWebPage_CompanyId",
                table: "StoreWebPage",
                column: "CompanyId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_WebTab_MenuItem_MenuItemId",
                table: "WebTab",
                column: "MenuItemId",
                principalTable: "MenuItem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WebTab_StoreWebPage_StoreWebPageId",
                table: "WebTab",
                column: "StoreWebPageId",
                principalTable: "StoreWebPage",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WebTab_MenuItem_MenuItemId",
                table: "WebTab");

            migrationBuilder.DropForeignKey(
                name: "FK_WebTab_StoreWebPage_StoreWebPageId",
                table: "WebTab");

            migrationBuilder.DropTable(
                name: "MenuItem");

            migrationBuilder.DropTable(
                name: "StoreWebPage");

            migrationBuilder.DropIndex(
                name: "IX_WebTab_MenuItemId",
                table: "WebTab");

            migrationBuilder.DropIndex(
                name: "IX_WebTab_StoreWebPageId",
                table: "WebTab");

            migrationBuilder.DropColumn(
                name: "MenuItemId",
                table: "WebTab");

            migrationBuilder.DropColumn(
                name: "StoreWebPageId",
                table: "WebTab");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Companies");
        }
    }
}
