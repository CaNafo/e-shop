using System;
using System.Collections.Generic;

namespace e_shop.Models.DatabaseModels
{
    public partial class ProductPhoto
    {
        public int PhotoId { get; set; }
        public int? CategoryId { get; set; }
        public int? ProductId { get; set; }
        public string Photo { get; set; }

        public virtual Products Products { get; set; }
    }
}
