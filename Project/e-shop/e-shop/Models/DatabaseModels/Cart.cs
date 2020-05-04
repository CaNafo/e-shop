using System;
using System.Collections.Generic;

namespace e_shop.Models
{
    public partial class Cart
    {
        public Cart()
        {
            Reserved = new HashSet<Reserved>();
        }

        public int CartId { get; set; }
        public int UserId { get; set; }
        public DateTime CartAddDate { get; set; }

        public virtual Users User { get; set; }
        public virtual ICollection<Reserved> Reserved { get; set; }
    }
}
