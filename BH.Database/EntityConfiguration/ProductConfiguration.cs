using BH.Model.General;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BH.Model.EntityConfiguration
{
	internal class ProductConfiguration : IEntityTypeConfiguration<Product>
	{
		public void Configure( EntityTypeBuilder<Product> builder )
		{
			builder.HasKey( x => x.Id );
			builder.Property( x => x.Name ).IsRequired();
			builder.Property( x => x.Description ).IsRequired();
			builder.Property( x => x.Price ).IsRequired();
			builder.Property( x => x.VatPercantage ).IsRequired();
			builder.Property( x => x.DiscountPercanatage ).IsRequired();
			builder.Property( x => x.Shipping ).IsRequired();
			builder.Property( x => x.Avaliable ).IsRequired();
			builder.HasMany( x => x.Categories )
				.WithMany( x => x.Products );
			builder.HasMany( x => x.Images );
			builder.HasMany( x => x.StoresData )
				.WithOne( x => x.Product );
			builder.HasMany( x => x.Analitics )
				.WithOne( x => x.Product );
			builder.HasIndex( x => x.Code ).IsUnique();
		}
	}
}
