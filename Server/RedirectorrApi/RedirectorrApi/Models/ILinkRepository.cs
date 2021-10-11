using RedirectorrApi.Models;
using System.Collections.Generic;

namespace RedirectorrApi.Controllers
{
    public interface ILinkRepository
    {
        IEnumerable<Link> GetAll();
        public Link GetBy(string linkExtension);
        public string getLinkDestination(string linkExtension);
        public void SaveChanges();
        public void Delete(Link link);
        public void AddClickDate(Link link);



    }
}