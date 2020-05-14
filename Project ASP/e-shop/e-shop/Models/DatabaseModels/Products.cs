using System;
using System.Collections.Generic;

namespace e_shop.Models.DatabaseModels
{
    public partial class Products
    {
        public Products()
        {
            ProductPhoto = new HashSet<ProductPhoto>();
            Reserved = new HashSet<Reserved>();
        }

        public int ProductId { get; set; }
        public int CategoryId { get; set; }
        public string ProductName { get; set; }
        public decimal ProductPrice { get; set; }
        public DateTime? ProductExpireDate { get; set; }
        public int ProductAmount { get; set; }

        public virtual Category Category { get; set; }
        public virtual ICollection<ProductPhoto> ProductPhoto { get; set; }
        public virtual ICollection<Reserved> Reserved { get; set; }
    }
}
