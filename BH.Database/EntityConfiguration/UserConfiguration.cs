using BH.Model.General;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BH.Model.EntityConfiguration
{
	internal class UserConfiguration : IEntityTypeConfiguration<User>
	{
		public void Configure( EntityTypeBuilder<User> builder )
		{
			builder.HasKey( x => x.Username );
			builder.HasMany( x => x.UserPermissions )
				.WithOne( x => x.User );
		}
	
	}
}
