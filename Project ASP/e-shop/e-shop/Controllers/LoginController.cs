using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using e_shop.Models;
using e_shop.Models.DatabaseModels;
using Microsoft.AspNetCore.Cors;

namespace e_shop.Controllers
{
    [Route("api/Login")]
    [ApiController]
    public class LoginController : Controller
    {
        [HttpPost]
        public ActionResult<IEnumerable<Users>> JsonStringBody([FromBody] LoginModel content)
        {
            using (var context = new eshopContext())
            {
                var result = from user in context.Users
                             where (user.EMail.Equals(content.eMail) && user.Password.Equals(content.password))
                             select new
                             {
                                 id = user.UserId,
                                 eMail = user.EMail,
                                 firstname = user.FirstName,
                                 lastname = user.LastName,
                                 roles = context.Roles.Select(role => new {
                                                                             role.RoleId, 
                                                                             role.RoleName,
                                                                             permisions = context.Permissions.Select(perm => new
                                                                             {
                                                                                 perm.PermissionId,
                                                                                 perm.PermissionName
                                                                             }).Where(
                                                                                    p => role.PermissionList.Select(pl => pl.PermissionId).Contains(p.PermissionId)
                                                                                 ).ToList()
                                                                         }
                                                             ).Where(
                                                                     r => user.RoleList.Select(d => d.RoleId).Contains(r.RoleId)
                                                                    ).ToList()
                             };
                return Ok(result.ToList());

            }
        }
    }
}
