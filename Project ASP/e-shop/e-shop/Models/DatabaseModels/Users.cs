using System;
using System.Collections.Generic;

namespace e_shop.Models.DatabaseModels
{
    public partial class Users
    {
        public Users()
        {
            Cart = new HashSet<Cart>();
            News = new HashSet<News>();
            RoleList = new HashSet<RoleList>();
        }

        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EMail { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Password { get; set; }

        public virtual ICollection<Cart> Cart { get; set; }
        public virtual ICollection<News> News { get; set; }
        public virtual ICollection<RoleList> RoleList { get; set; }
    }
}
