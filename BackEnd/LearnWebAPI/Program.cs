using LearnWebAPI.Models;
using LearnWebAPI.Interfaces;
using LearnWebAPI.Services;
using Microsoft.EntityFrameworkCore;
using LearnWebAPI.AutoMapper;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using BackEnd.Interfaces;
using BackEnd.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddAutoMapper(typeof(MappingProfile));
//builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());
builder.Services.AddDbContext<Project231Context>(option => option.UseSqlServer(builder.Configuration.GetConnectionString("Database")));
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<INewsPaperService, NewsPaperService>();
builder.Services.AddTransient<ICommentService, CommentService>();
builder.Services.AddTransient<ICategoryService, CategoryService>();

builder.Services.Configure<AppSetting>(builder.Configuration.GetSection("AppSettings"));
builder.Services.AddCors(p => p.AddDefaultPolicy(build =>
{
    //build.WithOrigins("https://localhost:7123", "http://localhost:3000/");
    build.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
}));
var secretKey = builder.Configuration["AppSettings:SecretKey"];
var secretKeyBytes = Encoding.UTF8.GetBytes(secretKey);
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
{
    opt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,

        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(secretKeyBytes),
        ClockSkew = TimeSpan.Zero
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
