using BH.Model.General;
using BH.Model.General.Web;
using Microsoft.EntityFrameworkCore;

namespace BH.Model
{
	public class BHDbContex: DbContext
	{
		public DbSet<User> Users { get; set; }
		public DbSet<Store> Store { get; set; }
		public DbSet<Product> Products { get; set; }
		public DbSet<Image> Images { get; set; }
		public DbSet<Company> Companies { get; set; }
		public DbSet<Category> Categories { get; set; }
		public DbSet<Analitic> Analitics { get; set; }
		public DbSet<UserPermission> userPermissions { get; set; }
		public DbSet<StoreProductData> storeProductsData { get; set; }
		public DbSet<UserProductData> userProductsData { get; set; }

		public BHDbContex( DbContextOptions<BHDbContex> options )
		  : base( options )
		{
		}


		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.ApplyConfigurationsFromAssembly( typeof( BHDbContex ).Assembly );
			modelBuilder.Entity<WebTab>().ToTable( "WebTab" );
			modelBuilder.Entity<WebTabProducts>().ToTable( "WebTabProducts" );
			modelBuilder.Entity<WebTabInfo>().ToTable( "WebTabInfo" );

			modelBuilder.Entity<Company>().Navigation( x => x.Stores ).AutoInclude();

			modelBuilder.Entity<Store>().Navigation(x => x.Images ).AutoInclude();
			modelBuilder.Entity<Store>().Navigation( x => x.Coordinate ).AutoInclude();
		}
	}
}
