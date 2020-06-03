using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace e_shop.Models

{
    public class NewsModel
    {
        
        public string NewsTittle { get; set; }
        public string NewsDescription { get; set; }
        public string NewsBody { get; set; }
        public DateTime NewsDateTime { get; set; }
        public string NewsPhoto { get; set; }
        public int UserId { get; set; }


    }
}
