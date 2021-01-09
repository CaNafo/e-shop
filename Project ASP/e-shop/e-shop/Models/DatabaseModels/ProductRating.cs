using System;
using System.Collections.Generic;

namespace e_shop.Models.DatabaseModels
{
    public partial class ProductRating
    {
        public int? UserId { get; set; }
        public int? CategoryId { get; set; }
        public int? ProductId { get; set; }
        public int Rating { get; set; }
        public int ProductRatingId { get; set; }

        public virtual Products Products { get; set; }
        public virtual Users User { get; set; }
    }
}
