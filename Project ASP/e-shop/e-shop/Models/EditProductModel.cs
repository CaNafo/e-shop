using System;

namespace e_shop.Models
{
    public class EditProductModel
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
