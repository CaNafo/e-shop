using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using e_shop.Models;
using e_shop.Models.DatabaseModels;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace e_shop.Controllers
{
    [ApiController]
    public class EditUserController : Controller
    {
        [Route("api/EditUser")]
        [HttpPost]
        public int EditUser([FromBody] EditUserModel content)
        {
            using (var context = new eshopContext())
            {
                var user = context.Users.FirstOrDefault(u => u.UserId == content.ID);
                if (user != null)
                {
                    user.FirstName = content.FirstName;
                    user.LastName = content.LastName;
                    user.BirthDate = content.BirthDate;
                }

                return context.SaveChanges();
            }
        }
    }
}
