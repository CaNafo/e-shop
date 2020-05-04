using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using e_shop.Models;

namespace e_shop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetUsersController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<Users>> GetUser()
        {
            using (var context = new eshopContext())
            {
                return context.Users.ToList();
            }
        }

    }
}