using BH.Model.General;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BH.Model.EntityConfiguration
{
	internal class CompanyConfiguration : IEntityTypeConfiguration<Company>
	{
		public void Configure( EntityTypeBuilder<Company> builder )
		{
			builder.HasKey( x => x.Id );
			builder.Property( x => x.Name ).IsRequired();
			builder.Property( x => x.IdentificationNumber ).IsRequired();
			builder.Property( x => x.Adress ).IsRequired();
			builder.Property( x => x.City ).IsRequired();
			builder.Property( x => x.PostalCode ).IsRequired();
			builder.Property( x => x.Country ).IsRequired();
			builder.HasMany( x => x.Stores ).WithOne( x => x.ParentCompany );
			builder.HasMany( x => x.Analitics )
				.WithOne( x => x.Company );
		}
	}
}
