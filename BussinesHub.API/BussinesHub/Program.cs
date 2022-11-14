using BH.Model;
using BH.Repository.Interfaces;
using BH.Repository.Repos;
using BussinesHub.Security;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder( args );


builder.Services.AddControllers().AddJsonOptions( o => o.JsonSerializerOptions
				.ReferenceHandler = ReferenceHandler.IgnoreCycles ); ;

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BHDbContex>();
builder.Services.AddAutoMapper( AppDomain.CurrentDomain.GetAssemblies() );

builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IStoreRepository, StoreRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();
builder.Services.AddScoped<IClaimProvider, TestClaimProvider>();
builder.Services.AddScoped<JwtTokenService>();

#region security
var key = new SymmetricSecurityKey( Encoding.UTF8.GetBytes( builder.Configuration["TokenKey"] ) );
builder.Services.AddAuthentication( JwtBearerDefaults.AuthenticationScheme )
	.AddJwtBearer( opt =>
	{
		opt.TokenValidationParameters.RoleClaimType = "roles";
		opt.TokenValidationParameters.NameClaimType = "name";
		opt.TokenValidationParameters = new TokenValidationParameters
		{
			ValidateIssuerSigningKey = true,
			IssuerSigningKey = key,
			ValidateIssuer = false,
			ValidateAudience = false,
			ClockSkew = TimeSpan.Zero
		};
	} );

string operatorName = builder.Configuration.GetValue<string>( "Roles:Admin" );

builder.Services.AddAuthorization( cfg =>
{
	cfg.AddPolicy( "Admin", policy => policy.RequireRole( operatorName ) );
} );


#endregion


builder.Services.AddCors( o => o.AddPolicy( "AllRequestPolicy", builder =>
{
	builder
		.SetIsOriginAllowed( ( host ) => true )
		.AllowAnyMethod()
		.AllowAnyHeader()
		.AllowCredentials();
} ) );

var app = builder.Build();

if ( app.Environment.IsDevelopment() )
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors( "AllRequestPolicy" );


app.UseAuthorization();

app.MapControllers();

app.Run();
