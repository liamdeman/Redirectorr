using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RedirectorrApi.Models
{
    public class Link
    {
        #region Properties

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string LinkExtension { get; set; }     
        public string Destination { get; set; }
        public DateTime DateCreated { get; set; }
        public ICollection<ClickDate> clickDates { get; private set; }
        #endregion

        #region Constructors
        public Link()
        {
            DateCreated = DateTime.Now;
            clickDates = new List<ClickDate>();
        }

        public Link(string linkExtension, string destination) : this()
        {
            this.LinkExtension = linkExtension;
            this.Destination = destination;
        }
        #endregion

        #region Methods
        public void addClickDate()
        {
            this.clickDates.Add(new ClickDate(DateTime.Now));
        }

     
        #endregion
    }
}
