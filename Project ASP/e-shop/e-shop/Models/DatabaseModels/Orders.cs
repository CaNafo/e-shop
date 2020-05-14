using System;
using System.Collections.Generic;

namespace e_shop.Models.DatabaseModels
{
    public partial class Orders
    {
        public int OrderId { get; set; }
        public int CategoryId { get; set; }
        public int ProductId { get; set; }
        public int UserId { get; set; }
        public int CartId { get; set; }
        public int ReservedId { get; set; }
        public DateTime OrderDate { get; set; }

        public virtual Reserved Reserved { get; set; }
    }
}
