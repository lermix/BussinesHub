using BH.Model.General;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BH.Model.EntityConfiguration
{
	internal class StoreConfiguration : IEntityTypeConfiguration<Store>
	{
		public void Configure( EntityTypeBuilder<Store> builder )
		{
			builder.HasKey( x => x.Id );
			builder.Property( x => x.Adress ).IsRequired();
			builder.HasMany( x => x.Images );
			builder.HasMany( x => x.ProductsData );
			builder.HasOne( x => x.ParentCompany )
				.WithMany( x => x.Stores );
				


		}
	}
}
