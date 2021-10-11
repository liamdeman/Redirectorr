using Microsoft.AspNetCore.Identity;
using RedirectorrApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RedirectorrApi.Data
{
    public class LinkDataInitializer
    {
        private readonly LinkContext _dbContext;
        private readonly UserManager<IdentityUser> _userManager;

        public LinkDataInitializer(LinkContext dbContext, UserManager<IdentityUser> userManager)
        {
            this._dbContext = dbContext;
            this._userManager = userManager;
        }

        public async Task InitializeData()
        {
            _dbContext.Database.EnsureDeleted();
            if (_dbContext.Database.EnsureCreated())
            {
         
                List<Link> links = new List<Link>();
                links.Add(new Link("googel", "https://www.google.com/"));
                links.Add(new Link("boomerBook", "https://www.facebook.com/"));


                Redirector redirector1 = new Redirector("liam.deman@student.hogent.be", links);
                _dbContext.Redirectors.Add(redirector1);
                await CreateUser(redirector1.Email, "P@ssword1");


                Redirector redirector2 = new Redirector("liamdeman52@gmail.com");
                _dbContext.Redirectors.Add(redirector2);
                await CreateUser(redirector2.Email, "P@ssword1");
                _dbContext.SaveChanges();
            }
        }

        private async Task CreateUser(string email, string password)
        {
            var user = new IdentityUser { UserName = email, Email = email };
            await _userManager.CreateAsync(user, password);
        }

    }
}

