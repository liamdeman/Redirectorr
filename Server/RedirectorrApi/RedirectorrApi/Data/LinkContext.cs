using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RedirectorrApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RedirectorrApi.Data
{
    public class LinkContext : IdentityDbContext
    {
        public LinkContext(DbContextOptions<LinkContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Link>().Property(x => x.Destination).IsRequired();
            builder.Entity<Link>().Property(x => x.DateCreated).IsRequired();
            builder.Entity<Link>().HasMany(x => x.clickDates).WithOne().HasForeignKey("LinkExtension");

            builder.Entity<Redirector>().HasMany(x => x.Links).WithOne().HasForeignKey("Email");

          


           

        }

        public DbSet<Link> Links { get; set; }
        public DbSet<Redirector> Redirectors { get; set; }

    }
}
