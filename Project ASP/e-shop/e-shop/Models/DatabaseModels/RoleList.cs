using System;
using System.Collections.Generic;

namespace e_shop.Models
{
    public partial class RoleList
    {
        public int RoleId { get; set; }
        public int UserId { get; set; }

        public virtual Roles Role { get; set; }
        public virtual Users User { get; set; }
    }
}
