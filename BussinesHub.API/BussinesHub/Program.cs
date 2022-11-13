using BH.Model;
using BH.Repository.Interfaces;
using BH.Repository.Repos;
using BussinesHub.Security;

var builder = WebApplication.CreateBuilder( args );


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BHDbContex>(); 
builder.Services.AddAutoMapper( AppDomain.CurrentDomain.GetAssemblies() );

builder.Services.AddSingleton<IProductRepository, ProductRepository>();
builder.Services.AddSingleton<IStoreRepository, StoreRepository>();
builder.Services.AddSingleton<IUserRepository, UserRepository>();
builder.Services.AddScoped<IClaimProvider, TestClaimProvider>();


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
