using Microsoft.EntityFrameworkCore;
using RedirectorrApi.Controllers;
using RedirectorrApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RedirectorrApi.Data.Repositories
{
    public class LinkRepository : ILinkRepository
    {
        private readonly LinkContext _context;
        private readonly DbSet<Link> _links;

        public LinkRepository(LinkContext dbContext)
        {
            this._context = dbContext;
            this._links = dbContext.Links;
        }
        public IEnumerable<Link> GetAll()
        {
            return this._links.Include(x => x.clickDates.OrderBy(y => y.DateClicked)).ToList();
        }

        public Link GetBy(string linkExtension)
        {
            return this._links.Include(x => x.clickDates).SingleOrDefault(x => x.LinkExtension == linkExtension);
        }
        public string getLinkDestination(string linkExtension)
        {
            return GetBy(linkExtension).Destination;
        }
       
        public void SaveChanges()
        {
            this._context.SaveChanges();
        }
        public void Delete(Link link)
        {
            _context.Remove(link);
        }
        public void AddClickDate(Link link)
        {
            link.clickDates.Add(new ClickDate(DateTime.Now));
        }


    }
}
