using BH.Model.General;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BH.Model.EntityConfiguration
{
	internal class ImageConfiguration : IEntityTypeConfiguration<Image>
	{
		public void Configure( EntityTypeBuilder<Image> builder )
		{
			builder.HasKey( x => x.Id );
		}
	}
}
