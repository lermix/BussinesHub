using BH.Model.General;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BH.Model.EntityConfiguration
{
	internal class CategoryConfiguration : IEntityTypeConfiguration<Category>
	{
		public void Configure( EntityTypeBuilder<Category> builder )
		{
			builder.HasKey( x => x.Id );
			builder.Property( x => x.Name ).IsRequired();
			builder.HasOne( c => c.Parent )
				.WithMany( c => c.Children )
				.OnDelete( DeleteBehavior.ClientCascade );
			builder.HasMany( c => c.Products ).WithMany( p => p.Categories );
		}
	}
}
