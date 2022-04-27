
using Api.Errors;
using Api.Helpers;
using Api.Middleware;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Data.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling =
Newtonsoft.Json.ReferenceLoopHandling.Ignore); 

// Add DI 

builder.Services.AddDbContext<WebDbContext>(o =>
o.UseSqlServer(builder.Configuration.GetConnectionString("con1"),
    b => b.MigrationsAssembly(typeof(WebDbContext).Assembly.FullName)));

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


var app = builder.Build();

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
app.UseAuthorization();

app.MapControllers();

app.Run();
