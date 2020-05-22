using System;
using System.Collections.Generic;

namespace e_shop.Models.DatabaseModels
{
    public partial class Products
    {
        public Products()
        {
            Reserved = new HashSet<Reserved>();
        }

        public int ProductId { get; set; }
        public int CategoryId { get; set; }
        public string ProductName { get; set; }
        public decimal ProductPrice { get; set; }
        public DateTime? ProductExpireDate { get; set; }
        public string ProductDescription { get; set; }
        public string ProductPhoto { get; set; }
        public int ProductAmount { get; set; }

        public virtual Category Category { get; set; }
        public virtual ICollection<Reserved> Reserved { get; set; }
    }
}
