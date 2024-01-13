using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BH.Database.Migrations
{
    public partial class addiInfoTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductAdditionalInfo_Products_ProductId",
                table: "ProductAdditionalInfo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductAdditionalInfo",
                table: "ProductAdditionalInfo");

            migrationBuilder.RenameTable(
                name: "ProductAdditionalInfo",
                newName: "ProductAdditionalInfos");

            migrationBuilder.RenameIndex(
                name: "IX_ProductAdditionalInfo_ProductId",
                table: "ProductAdditionalInfos",
                newName: "IX_ProductAdditionalInfos_ProductId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductAdditionalInfos",
                table: "ProductAdditionalInfos",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductAdditionalInfos_Products_ProductId",
                table: "ProductAdditionalInfos",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductAdditionalInfos_Products_ProductId",
                table: "ProductAdditionalInfos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductAdditionalInfos",
                table: "ProductAdditionalInfos");

            migrationBuilder.RenameTable(
                name: "ProductAdditionalInfos",
                newName: "ProductAdditionalInfo");

            migrationBuilder.RenameIndex(
                name: "IX_ProductAdditionalInfos_ProductId",
                table: "ProductAdditionalInfo",
                newName: "IX_ProductAdditionalInfo_ProductId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductAdditionalInfo",
                table: "ProductAdditionalInfo",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductAdditionalInfo_Products_ProductId",
                table: "ProductAdditionalInfo",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
