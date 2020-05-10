using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using e_shop.Models;
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
                return context.Users.Where(user => user.EMail.Equals(content.eMail) && user.Password.Equals(content.password)).ToList();
            }
        }
    }
}
