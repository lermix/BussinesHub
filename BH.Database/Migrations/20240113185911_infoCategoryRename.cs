using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BH.Database.Migrations
{
    public partial class infoCategoryRename : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CategoryProductAdditionalInfo",
                columns: table => new
                {
                    AdditionalInfosId = table.Column<int>(type: "int", nullable: false),
                    CategoriesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryProductAdditionalInfo", x => new { x.AdditionalInfosId, x.CategoriesId });
                    table.ForeignKey(
                        name: "FK_CategoryProductAdditionalInfo_Categories_CategoriesId",
                        column: x => x.CategoriesId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoryProductAdditionalInfo_ProductAdditionalInfos_Additio~",
                        column: x => x.AdditionalInfosId,
                        principalTable: "ProductAdditionalInfos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_CategoryProductAdditionalInfo_CategoriesId",
                table: "CategoryProductAdditionalInfo",
                column: "CategoriesId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoryProductAdditionalInfo");
        }
    }
}
