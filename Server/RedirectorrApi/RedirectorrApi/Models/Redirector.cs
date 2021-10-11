using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RedirectorrApi.Models
{
    public class Redirector
    {
        #region Properties
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Email { get; set; }
        
        public ICollection<Link> Links { get; private set; }

        #endregion

        #region Constructors
        public Redirector(string email)
        {
            this.Email = email;
            Links = new List<Link>();
        }
        public Redirector(string email, List<Link> links)
        {
            this.Email = email;
            this.Links = links;
        }
        
        #endregion

    }
}
