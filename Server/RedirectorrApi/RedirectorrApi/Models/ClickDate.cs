using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RedirectorrApi.Models
{
    public class ClickDate
    {
        #region Propertios
        public int id { get; set; }
        public DateTime DateClicked { get; set; }
        #endregion

        #region Constructors
        public ClickDate(DateTime dateClicked)
        {
            this.DateClicked = dateClicked;
        }
        #endregion
    }
}
