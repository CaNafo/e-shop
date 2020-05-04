using System;
using System.Collections.Generic;

namespace e_shop.Models
{
    public partial class Permissions
    {
        public Permissions()
        {
            PermissionList = new HashSet<PermissionList>();
        }

        public int PermissionId { get; set; }
        public string PermissionName { get; set; }

        public virtual ICollection<PermissionList> PermissionList { get; set; }
    }
}
