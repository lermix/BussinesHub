using BH.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace BH.Database
{
	public class BHDbContextFactory : IDesignTimeDbContextFactory<BHDbContex>
	{
		public BHDbContex CreateDbContext( string[] args )
		{
			var configuration = new ConfigurationBuilder()
				 .SetBasePath( Path.Combine( Path.GetDirectoryName( typeof( BHDbContex ).Assembly.Location ), "..\\..\\..\\..", "BussinesHub.Api\\BussinesHub" ) )
				   .AddJsonFile( "appsettings.json" )
				   .Build();

			var optionsBuilder = new DbContextOptionsBuilder<BHDbContex>();
			string connString = configuration.GetConnectionString( "MariaDbConnectionString" );
			optionsBuilder.UseMySql( connString, ServerVersion.AutoDetect( connString ) );

			return new BHDbContex( optionsBuilder.Options );
		}
	}
}
