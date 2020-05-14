using System;
using System.Collections.Generic;

namespace e_shop.Models.DatabaseModels
{
    public partial class Reserved
    {
        public Reserved()
        {
            Orders = new HashSet<Orders>();
        }

        public int ReservedId { get; set; }
        public int CategoryId { get; set; }
        public int ProductId { get; set; }
        public int UserId { get; set; }
        public int CartId { get; set; }
        public int ReservedAmount { get; set; }
        public bool ReservedOrdered { get; set; }

        public virtual Cart Cart { get; set; }
        public virtual Products Products { get; set; }
        public virtual ICollection<Orders> Orders { get; set; }
    }
}
