using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BH.Model;

namespace BH.Database
{
	public class BHDbContextFactory : IDesignTimeDbContextFactory<BHDbContex>
	{
		public BHDbContex CreateDbContext( string[] args )
		{
			var configuration = new ConfigurationBuilder()
				 .SetBasePath( Path.Combine( Path.GetDirectoryName( typeof( BHDbContex ).Assembly.Location ), "..\\..\\..\\..", "WaterProjectOne" ) )
				   .AddJsonFile( "appsettings.json" )
				   .Build();

			var optionsBuilder = new DbContextOptionsBuilder<BHDbContex>();
			string connString = configuration.GetConnectionString( "MariaDbConnectionString" );
			optionsBuilder.UseMySql( connString, ServerVersion.AutoDetect( connString ) );

			return new BHDbContex( optionsBuilder.Options );
		}
	}
}
