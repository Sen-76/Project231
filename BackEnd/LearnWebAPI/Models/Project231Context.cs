using BackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace LearnWebAPI.Models
{
    public class Project231Context : DbContext
    {
        public Project231Context(DbContextOptions<Project231Context> options) : base(options)
        {
        }
        #region DBSet
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<NewsPaper> NewsPapers { get; set; }
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(e =>
            {
                e.ToTable("User");
                e.HasKey(e => e.Id);
                e.Property(e => e.Name).IsRequired().HasMaxLength(250);
                e.Property(e => e.Username).IsRequired().HasMaxLength(250);
                e.Property(e => e.Password).IsRequired().HasMaxLength(250);
                e.Property(e => e.Email).HasMaxLength(250);
                e.Property(e => e.Phone).HasMaxLength(13);
                e.Property(e => e.Role).IsRequired();
            });
        }
    }
}
