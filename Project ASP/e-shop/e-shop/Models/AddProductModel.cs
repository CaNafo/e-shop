using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace e_shop.Models
{
    public class AddProductModel
    {
        public int productId { get; set; }
       public int category { get; set; }
        public string tittle { get; set; }
        public decimal price { get; set; }
        public DateTime? ProductExpireDate { get; set; }
        public string description { get; set; }
        public string photo { get; set; }
        public int amount { get; set; }

    }
}
