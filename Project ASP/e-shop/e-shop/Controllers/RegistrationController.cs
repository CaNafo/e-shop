using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using e_shop.Models.DatabaseModels;
using e_shop.Models;

namespace e_shop.Controllers
{
    [Route("api/Registration")]
    [ApiController]
    public class RegistrationController : Controller
    {
       
        [HttpPost]
        public ActionResult<IEnumerable<Users>> JsonStringBody([FromBody] RegistrationModel content)
        {
          
            using (var context = new eshopContext())
            {
               
                if (context.Users.ToList().Any(mail => mail.EMail != content.EMail))
                {
                    Users newUser = new Users();
                    {
                        newUser.FirstName = content.FirstName;
                        newUser.LastName = content.LastName;
                        newUser.BirthDate = content.BirthDate;
                        newUser.EMail = content.EMail;
                        newUser.Password = content.Password;

                        context.Users.Add(newUser);
                        context.SaveChanges();

                       
                    }
                }

                return new List<Users>();

            }
        }
    }
}
