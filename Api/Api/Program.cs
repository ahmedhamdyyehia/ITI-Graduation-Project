
using Api.Errors;
using Api.Extensions;
using Api.Helpers;
using Api.Middleware;
using Core.Interfaces;
using Core.Models.Identity;
using Infrastructure.Data;
using Infrastructure.Data.Repositories;
using Infrastructure.Identity;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Linq;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling =
Newtonsoft.Json.ReferenceLoopHandling.Ignore); 

// Add DI 

builder.Services.AddDbContext<WebDbContext>(o =>
o.UseSqlServer(builder.Configuration.GetConnectionString("con1"),
    b => b.MigrationsAssembly(typeof(WebDbContext).Assembly.FullName)));

// add identityDbContext service
builder.Services.AddDbContext<AppIdentityDbContext>(o =>
{
    o.UseSqlServer(builder.Configuration.GetConnectionString("IdentityConnection"));
});

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.InvalidModelStateResponseFactory = ActionContext =>
    {
        var errors = ActionContext.ModelState
                        .Where(e => e.Value.Errors.Count > 0)
                        .SelectMany(e => e.Value.Errors)
                        .Select(x => x.ErrorMessage).ToArray();

        var errorRespone = new ApiValidationErrorRespone
        {
            Errors = errors
        };

        return new BadRequestObjectResult(errorRespone);


    };
});



builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IProdcutRepository, ProductRepository>();
builder.Services.AddScoped(typeof(IGenericRepository<>),(typeof(GenericRepository<>)));

builder.Services.AddAutoMapper(typeof(MappingProfiles));


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(opt =>

        opt.AddPolicy("CorsPolicy", policy =>
         {
             policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
 
         })
);

//add identity services
var config = builder.Configuration;
builder.Services.AddIdentityServices(config);


var app = builder.Build();

//seeding data

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    //var context = services.GetRequiredService<StoreDbContext>();
    //await StoreSeed.SeedDataAsync(context);

    var userManger = services.GetRequiredService<UserManager<AppUser>>();
    //var identityContext = services.GetRequiredService<AppIdentityDbContext>();

    //await identityContext.Database.MigrateAsync();
    await AppIdentityDbContextSeed.SeedUserAsync(userManger);

}

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStatusCodePagesWithReExecute("/errors/{0}");

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
