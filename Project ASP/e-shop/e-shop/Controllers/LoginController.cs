using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using e_shop.Models;
using e_shop.Models.DatabaseModels;
using Microsoft.AspNetCore.Cors;
using System.Text;
using System.Security.Claims;

namespace e_shop.Controllers
{
    [ApiController]
    public class LoginController : Controller
    {
        [Route("api/Login")]
        [HttpPost]
        public ActionResult<IEnumerable<Users>> JsonStringBody([FromBody] LoginModel content)
        {
            using (var context = new eshopContext())
            {
                var result = from user in context.Users
                             where (user.EMail.Equals(content.eMail) && user.Password.Equals(CreateMD5(content.password)))
                             select new
                             {
                                 id = user.UserId,
                                 eMail = user.EMail,
                                 firstName = user.FirstName,
                                 lastName = user.LastName,
                                 birthDate = user.BirthDate,
                                 token = TokenManager.GenerateToken(user.EMail),
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

        [Route("api/Validate")]
        [HttpGet]
        public ActionResult<IEnumerable<Users>> Validate(string token, string email)
        {
            using (var context = new eshopContext())
            {
                var tempUser = context.Users.FirstOrDefault(u => u.EMail == email);
                if (tempUser != null)
                {
                    int UserId = tempUser.UserId;

                    if (UserId == 0) return null;

                    string tokenUsername = TokenManager.ValidateToken(token);
                    if (email.Equals(tokenUsername))
                    {
                        var result = from user in context.Users
                                     where (user.EMail.Equals(email))
                                     select new
                                     {
                                         id = user.UserId,
                                         eMail = user.EMail,
                                         firstName = user.FirstName,
                                         lastName = user.LastName,
                                         birthDate = user.BirthDate,
                                         roles = context.Roles.Select(role => new {
                                             role.RoleId,
                                             role.RoleName,
                                             permisions = context.Permissions.Select(perm => new
                                             {
                                                 perm.PermissionId,
                                                 perm.PermissionName
                                             }).Where(
                                                 p => role.PermissionList.Select(pl => pl.PermissionId).Contains(p.PermissionId)).ToList()}).Where(
                                                                                 r => user.RoleList.Select(d => d.RoleId).Contains(r.RoleId)).ToList()
                                     };
                        return Ok(result.ToList());
                    }
                }
                return null;
            }

            
        }

        public static string ValidateToken(string token)
        {
            string username = null;
            ClaimsPrincipal principal = TokenManager.GetPrincipal(token);
            if (principal == null) return null;
            ClaimsIdentity identity = null;
            try
            {
                identity = (ClaimsIdentity)principal.Identity;
            }
            catch (NullReferenceException)
            {
                return null;
            }
            Claim usernameClaim = identity.FindFirst(ClaimTypes.Name);
            username = usernameClaim.Value;
            return username;
        }

        public static string CreateMD5(string input)
        {
            // Use input string to calculate MD5 hash
            try
            {
                using (System.Security.Cryptography.MD5 md5 = System.Security.Cryptography.MD5.Create())
                {
                    byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(input);
                    byte[] hashBytes = md5.ComputeHash(inputBytes);

                    // Convert the byte array to hexadecimal string
                    StringBuilder sb = new StringBuilder();
                    for (int i = 0; i < hashBytes.Length; i++)
                    {
                        sb.Append(hashBytes[i].ToString("X2"));
                    }
                    return sb.ToString();
                }

            }
            catch (Exception e)
            {

            }
            return "";
        }
    }
}
