using RedirectorrApi.Models;

namespace RedirectorrApi.Data.Repositories
{
    public interface IRedirectorRepository
    {
        void Add(Redirector rediroctor);
        Redirector GetBy(string email);
        void AddLink(string email, Link link);
        public bool OwnsLink(string email, Link link);

        void SaveChanges();
    }
}