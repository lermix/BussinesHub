using BH.Model.General;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BH.Model.EntityConfiguration
{
	internal class CompanyAnaliticConfiguration : IEntityTypeConfiguration<Analitic>
	{
		public void Configure( EntityTypeBuilder<Analitic> builder )
		{
			builder.HasKey( x => x.Id );
			builder.HasOne( x => x.Company )
				.WithMany(x => x.Analitics);
			builder.HasOne( x => x.Product )
				.WithMany( x => x.Analitics );
		}
	
	}
}
