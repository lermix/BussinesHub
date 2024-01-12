﻿// <auto-generated />
using System;
using BH.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BH.Database.Migrations
{
    [DbContext(typeof(BHDbContex))]
    [Migration("20240106140843_companyWebTab")]
    partial class companyWebTab
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.16")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("BH.Model.General.Analitic", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("CompanyId")
                        .HasColumnType("int");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime(6)");

                    b.Property<double>("Latitude")
                        .HasColumnType("double");

                    b.Property<double>("Longitude")
                        .HasColumnType("double");

                    b.Property<int?>("ProductId")
                        .HasColumnType("int");

                    b.Property<string>("Region")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Username")
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("ProductId");

                    b.HasIndex("Username");

                    b.ToTable("Analitics");
                });

            modelBuilder.Entity("BH.Model.General.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CompanyId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int?>("ParentId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("ParentId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("BH.Model.General.Company", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Adress")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("IdentificationNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PostalCode")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("BH.Model.General.Coordinate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<double>("Latitude")
                        .HasColumnType("double");

                    b.Property<double>("Longitude")
                        .HasColumnType("double");

                    b.HasKey("Id");

                    b.ToTable("Coordinate");
                });

            modelBuilder.Entity("BH.Model.General.Image", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<int?>("StoreId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.HasIndex("StoreId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("BH.Model.General.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("Avaliable")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<int>("CompanyId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<double>("DiscountPercanatage")
                        .HasColumnType("double");

                    b.Property<int>("MainImageId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<double>("Price")
                        .HasColumnType("double");

                    b.Property<bool>("Shipping")
                        .HasColumnType("tinyint(1)");

                    b.Property<double>("VatPercantage")
                        .HasColumnType("double");

                    b.HasKey("Id");

                    b.HasIndex("Code")
                        .IsUnique();

                    b.HasIndex("CompanyId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("BH.Model.General.Store", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Adress")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("CoordinateId")
                        .HasColumnType("int");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("MobileNumber")
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("ParentCompanyId")
                        .HasColumnType("int");

                    b.Property<string>("PostalCode")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("CoordinateId");

                    b.HasIndex("ParentCompanyId");

                    b.ToTable("Store");
                });

            modelBuilder.Entity("BH.Model.General.StoreProductData", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<double>("Quantity")
                        .HasColumnType("double");

                    b.Property<int>("StoreId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.HasIndex("StoreId");

                    b.ToTable("storeProductsData");
                });

            modelBuilder.Entity("BH.Model.General.User", b =>
                {
                    b.Property<string>("Username")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("MiddleName")
                        .HasColumnType("longtext");

                    b.Property<string>("MobileNumber")
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<byte>("userFuncEnum")
                        .HasColumnType("tinyint unsigned");

                    b.HasKey("Username");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("BH.Model.General.UserPermission", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("AppliedObjectId")
                        .HasColumnType("int");

                    b.Property<string>("AppliedObjectTable")
                        .HasColumnType("longtext");

                    b.Property<byte>("PermissionType")
                        .HasColumnType("tinyint unsigned");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("Username");

                    b.ToTable("userPermissions");
                });

            modelBuilder.Entity("BH.Model.General.UserProductData", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<double>("Quantity")
                        .HasColumnType("double");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.HasIndex("Username");

                    b.ToTable("userProductsData");
                });

            modelBuilder.Entity("BH.Model.General.Web.LabelValue", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Label")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int?>("WebProductInfoId")
                        .HasColumnType("int");

                    b.Property<int?>("WebTabInfoId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("WebProductInfoId");

                    b.HasIndex("WebTabInfoId");

                    b.ToTable("LabelValue");
                });

            modelBuilder.Entity("BH.Model.General.Web.MenuItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("Clickable")
                        .HasColumnType("tinyint(1)");

                    b.Property<int?>("MenuItemId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int?>("StoreWebPageId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("MenuItemId");

                    b.HasIndex("StoreWebPageId");

                    b.ToTable("MenuItem");
                });

            modelBuilder.Entity("BH.Model.General.Web.StoreWebPage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CompanyId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId")
                        .IsUnique();

                    b.ToTable("StoreWebPage");
                });

            modelBuilder.Entity("BH.Model.General.Web.WebProductInfo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<int?>("WebTabProductsId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.HasIndex("WebTabProductsId");

                    b.ToTable("WebProductInfo");
                });

            modelBuilder.Entity("BH.Model.General.Web.WebTab", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("DisplayHeader")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Header")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("MenuItemId")
                        .HasColumnType("int");

                    b.Property<int?>("StoreWebPageId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("MenuItemId")
                        .IsUnique();

                    b.HasIndex("StoreWebPageId");

                    b.ToTable("WebTab", (string)null);
                });

            modelBuilder.Entity("CategoryProduct", b =>
                {
                    b.Property<int>("CategoriesId")
                        .HasColumnType("int");

                    b.Property<int>("ProductsId")
                        .HasColumnType("int");

                    b.HasKey("CategoriesId", "ProductsId");

                    b.HasIndex("ProductsId");

                    b.ToTable("CategoryProduct");
                });

            modelBuilder.Entity("CompanyUser", b =>
                {
                    b.Property<int>("CompaniesId")
                        .HasColumnType("int");

                    b.Property<string>("UsersUsername")
                        .HasColumnType("varchar(255)");

                    b.HasKey("CompaniesId", "UsersUsername");

                    b.HasIndex("UsersUsername");

                    b.ToTable("CompanyUser");
                });

            modelBuilder.Entity("BH.Model.General.Web.WebTabInfo", b =>
                {
                    b.HasBaseType("BH.Model.General.Web.WebTab");

                    b.ToTable("WebTabInfo", (string)null);
                });

            modelBuilder.Entity("BH.Model.General.Web.WebTabProducts", b =>
                {
                    b.HasBaseType("BH.Model.General.Web.WebTab");

                    b.Property<int?>("ProductId")
                        .HasColumnType("int");

                    b.HasIndex("ProductId");

                    b.ToTable("WebTabProducts", (string)null);
                });

            modelBuilder.Entity("BH.Model.General.Analitic", b =>
                {
                    b.HasOne("BH.Model.General.Company", "Company")
                        .WithMany("Analitics")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BH.Model.General.Product", "Product")
                        .WithMany("Analitics")
                        .HasForeignKey("ProductId");

                    b.HasOne("BH.Model.General.User", "User")
                        .WithMany()
                        .HasForeignKey("Username");

                    b.Navigation("Company");

                    b.Navigation("Product");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BH.Model.General.Category", b =>
                {
                    b.HasOne("BH.Model.General.Company", "Company")
                        .WithMany("Categories")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BH.Model.General.Category", "Parent")
                        .WithMany("Children")
                        .HasForeignKey("ParentId")
                        .OnDelete(DeleteBehavior.ClientCascade);

                    b.Navigation("Company");

                    b.Navigation("Parent");
                });

            modelBuilder.Entity("BH.Model.General.Image", b =>
                {
                    b.HasOne("BH.Model.General.Product", "Product")
                        .WithMany("Images")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BH.Model.General.Store", null)
                        .WithMany("Images")
                        .HasForeignKey("StoreId");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("BH.Model.General.Product", b =>
                {
                    b.HasOne("BH.Model.General.Company", "Company")
                        .WithMany("Products")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");
                });

            modelBuilder.Entity("BH.Model.General.Store", b =>
                {
                    b.HasOne("BH.Model.General.Coordinate", "Coordinate")
                        .WithMany()
                        .HasForeignKey("CoordinateId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BH.Model.General.Company", "ParentCompany")
                        .WithMany("Stores")
                        .HasForeignKey("ParentCompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Coordinate");

                    b.Navigation("ParentCompany");
                });

            modelBuilder.Entity("BH.Model.General.StoreProductData", b =>
                {
                    b.HasOne("BH.Model.General.Product", "Product")
                        .WithMany("StoresData")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BH.Model.General.Store", "Store")
                        .WithMany("ProductsData")
                        .HasForeignKey("StoreId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Product");

                    b.Navigation("Store");
                });

            modelBuilder.Entity("BH.Model.General.UserPermission", b =>
                {
                    b.HasOne("BH.Model.General.User", "User")
                        .WithMany("UserPermissions")
                        .HasForeignKey("Username")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("BH.Model.General.UserProductData", b =>
                {
                    b.HasOne("BH.Model.General.Product", "Product")
                        .WithMany("UsersProductData")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BH.Model.General.User", "User")
                        .WithMany("Products")
                        .HasForeignKey("Username")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Product");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BH.Model.General.Web.LabelValue", b =>
                {
                    b.HasOne("BH.Model.General.Web.WebProductInfo", null)
                        .WithMany("LabelValues")
                        .HasForeignKey("WebProductInfoId");

                    b.HasOne("BH.Model.General.Web.WebTabInfo", null)
                        .WithMany("LabelValues")
                        .HasForeignKey("WebTabInfoId");
                });

            modelBuilder.Entity("BH.Model.General.Web.MenuItem", b =>
                {
                    b.HasOne("BH.Model.General.Web.MenuItem", null)
                        .WithMany("MenuItems")
                        .HasForeignKey("MenuItemId");

                    b.HasOne("BH.Model.General.Web.StoreWebPage", null)
                        .WithMany("MenuItems")
                        .HasForeignKey("StoreWebPageId");
                });

            modelBuilder.Entity("BH.Model.General.Web.StoreWebPage", b =>
                {
                    b.HasOne("BH.Model.General.Company", "Company")
                        .WithOne("StoreWebPage")
                        .HasForeignKey("BH.Model.General.Web.StoreWebPage", "CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");
                });

            modelBuilder.Entity("BH.Model.General.Web.WebProductInfo", b =>
                {
                    b.HasOne("BH.Model.General.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BH.Model.General.Web.WebTabProducts", null)
                        .WithMany("ProductInfos")
                        .HasForeignKey("WebTabProductsId");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("BH.Model.General.Web.WebTab", b =>
                {
                    b.HasOne("BH.Model.General.Web.MenuItem", "MenuItem")
                        .WithOne("Tab")
                        .HasForeignKey("BH.Model.General.Web.WebTab", "MenuItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BH.Model.General.Web.StoreWebPage", null)
                        .WithMany("WebTabItems")
                        .HasForeignKey("StoreWebPageId");

                    b.Navigation("MenuItem");
                });

            modelBuilder.Entity("CategoryProduct", b =>
                {
                    b.HasOne("BH.Model.General.Category", null)
                        .WithMany()
                        .HasForeignKey("CategoriesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BH.Model.General.Product", null)
                        .WithMany()
                        .HasForeignKey("ProductsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CompanyUser", b =>
                {
                    b.HasOne("BH.Model.General.Company", null)
                        .WithMany()
                        .HasForeignKey("CompaniesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BH.Model.General.User", null)
                        .WithMany()
                        .HasForeignKey("UsersUsername")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BH.Model.General.Web.WebTabInfo", b =>
                {
                    b.HasOne("BH.Model.General.Web.WebTab", null)
                        .WithOne()
                        .HasForeignKey("BH.Model.General.Web.WebTabInfo", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BH.Model.General.Web.WebTabProducts", b =>
                {
                    b.HasOne("BH.Model.General.Web.WebTab", null)
                        .WithOne()
                        .HasForeignKey("BH.Model.General.Web.WebTabProducts", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BH.Model.General.Product", null)
                        .WithMany("webTabProducts")
                        .HasForeignKey("ProductId");
                });

            modelBuilder.Entity("BH.Model.General.Category", b =>
                {
                    b.Navigation("Children");
                });

            modelBuilder.Entity("BH.Model.General.Company", b =>
                {
                    b.Navigation("Analitics");

                    b.Navigation("Categories");

                    b.Navigation("Products");

                    b.Navigation("StoreWebPage");

                    b.Navigation("Stores");
                });

            modelBuilder.Entity("BH.Model.General.Product", b =>
                {
                    b.Navigation("Analitics");

                    b.Navigation("Images");

                    b.Navigation("StoresData");

                    b.Navigation("UsersProductData");

                    b.Navigation("webTabProducts");
                });

            modelBuilder.Entity("BH.Model.General.Store", b =>
                {
                    b.Navigation("Images");

                    b.Navigation("ProductsData");
                });

            modelBuilder.Entity("BH.Model.General.User", b =>
                {
                    b.Navigation("Products");

                    b.Navigation("UserPermissions");
                });

            modelBuilder.Entity("BH.Model.General.Web.MenuItem", b =>
                {
                    b.Navigation("MenuItems");

                    b.Navigation("Tab")
                        .IsRequired();
                });

            modelBuilder.Entity("BH.Model.General.Web.StoreWebPage", b =>
                {
                    b.Navigation("MenuItems");

                    b.Navigation("WebTabItems");
                });

            modelBuilder.Entity("BH.Model.General.Web.WebProductInfo", b =>
                {
                    b.Navigation("LabelValues");
                });

            modelBuilder.Entity("BH.Model.General.Web.WebTabInfo", b =>
                {
                    b.Navigation("LabelValues");
                });

            modelBuilder.Entity("BH.Model.General.Web.WebTabProducts", b =>
                {
                    b.Navigation("ProductInfos");
                });
#pragma warning restore 612, 618
        }
    }
}
