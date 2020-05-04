using System;
using System.Collections.Generic;

namespace e_shop.Models
{
    public partial class News
    {
        public int NewsId { get; set; }
        public int UserId { get; set; }
        public string NewsTittle { get; set; }
        public string NewsDescription { get; set; }
        public string NewsBody { get; set; }
        public DateTime NewsDateTime { get; set; }
        public string NewsPhoto { get; set; }

        public virtual Users User { get; set; }
    }
}
