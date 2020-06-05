using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using e_shop.Models.DatabaseModels;
using e_shop.Models;
using System.Text;

namespace e_shop.Controllers
{
    [Route("api/Registration")]
    [ApiController]
    public class RegistrationController : Controller
    {
       
        [HttpPost]
        public int JsonStringBody([FromBody] RegistrationModel content)
        {
          
            using (var context = new eshopContext())
            {
               
                if (!context.Users.ToList().Any(mail => mail.EMail == content.EMail))
                {
                    Users newUser = new Users();
                    {
                        newUser.FirstName = content.FirstName;
                        newUser.LastName = content.LastName;
                        newUser.BirthDate = content.BirthDate;
                        newUser.EMail = content.EMail;
                        newUser.Password = CreateMD5(content.Password);
                        
                        context.Users.Add(newUser);
                        context.SaveChanges();

                        RoleList roleList = new RoleList();

                        roleList.UserId = newUser.UserId;
                        roleList.RoleId = context.Roles.FirstOrDefault(r => r.RoleName.Equals("User")).RoleId;

                        Cart cart = new Cart();
                        cart.UserId = newUser.UserId;
                        cart.CartAddDate = DateTime.Now;

                        context.Cart.Add(cart);
                        context.RoleList.Add(roleList);                       
                    }
                }

                return context.SaveChanges();

            }
        }

        public static string CreateMD5(string input)
        {
            // Use input string to calculate MD5 hash
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
    }
}
