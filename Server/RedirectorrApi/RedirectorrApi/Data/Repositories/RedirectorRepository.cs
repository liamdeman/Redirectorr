using Microsoft.EntityFrameworkCore;
using RedirectorrApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RedirectorrApi.Data.Repositories
{
    public class RedirectorRepository : IRedirectorRepository
    {
        private readonly LinkContext _context;
        private readonly DbSet<Redirector> _redirectors;

        public RedirectorRepository(LinkContext dbContext)
        {
            this._context = dbContext;
            this._redirectors = dbContext.Redirectors;
        }

        public Redirector GetBy(string email)
        {
            return _redirectors.Include(x => x.Links).ThenInclude(x => x.clickDates).SingleOrDefault(x => x.Email == email);
        }

        public void Add(Redirector rediroctor)
        {
            _redirectors.Add(rediroctor);
        }

        public bool OwnsLink(string email, Link link)
        {
            return this.GetBy(email).Links.Contains(link);
        }

        public void AddLink(string email, Link link)
        {
            this.GetBy(email).Links.Add(link);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
