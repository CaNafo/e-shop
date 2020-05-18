using System;
using System.Collections.Generic;

namespace e_shop.Models.DatabaseModels
{
    public partial class PermissionList
    {
        public int PermissionId { get; set; }
        public int RoleId { get; set; }

        public virtual Permissions Permission { get; set; }
        public virtual Roles Role { get; set; }
    }
}
