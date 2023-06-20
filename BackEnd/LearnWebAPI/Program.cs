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
using Microsoft.AspNetCore.OData;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options => options.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddDbContext<Project231Context>(option => option.UseSqlServer(builder.Configuration.GetConnectionString("Database")));
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<INewsPaperService, NewsPaperService>();
builder.Services.AddTransient<ICommentService, CommentService>();
builder.Services.AddTransient<ICategoryService, CategoryService>();
builder.Services.AddTransient<INewsDetailService, NewsDetailService>();
builder.Services.AddControllers().AddOData(opt =>
{
    opt.Filter().Expand().Select().OrderBy().Count().SetMaxTop(100);
});
builder.Services.Configure<AppSetting>(builder.Configuration.GetSection("AppSettings"));
builder.Services.AddCors(p => p.AddDefaultPolicy(build =>
{
    build.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
}));
builder.Services.AddHttpContextAccessor();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["AppSettings:Issuer"],
        ValidAudience = builder.Configuration["AppSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["AppSettings:SecretKey"]))
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
