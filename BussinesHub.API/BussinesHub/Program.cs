using BH.Model;
using BH.Repository.Interfaces;
using BH.Repository.Repos;

var builder = WebApplication.CreateBuilder( args );


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BHDbContex>();

builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IStoreRepository, StoreRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();


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

app.UseAuthorization();

app.MapControllers();

app.Run();
