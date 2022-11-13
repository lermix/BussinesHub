using BH.Model.General;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BH.Model.EntityConfiguration
{
	public class UserPermissionConfiguration : IEntityTypeConfiguration<UserPermission>
	{
		public void Configure( EntityTypeBuilder<UserPermission> builder )
		{
			builder.HasKey( x => x.Id );
		}
	}
}
