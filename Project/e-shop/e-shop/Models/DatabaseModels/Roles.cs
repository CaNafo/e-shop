using System;
using System.Collections.Generic;

namespace e_shop.Models
{
    public partial class Roles
    {
        public Roles()
        {
            PermissionList = new HashSet<PermissionList>();
            RoleList = new HashSet<RoleList>();
        }

        public int RoleId { get; set; }
        public string RoleName { get; set; }

        public virtual ICollection<PermissionList> PermissionList { get; set; }
        public virtual ICollection<RoleList> RoleList { get; set; }
    }
}
