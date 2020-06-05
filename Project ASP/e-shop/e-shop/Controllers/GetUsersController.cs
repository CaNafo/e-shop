using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using e_shop.Models;
using e_shop.Models.DatabaseModels;

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
                var result = from user in context.Users
                             select new
                             {
                                 userId = user.UserId,
                                 eMail = user.EMail,
                                 firstName = user.FirstName,
                                 lastName = user.LastName,
                                 birthDate = user.BirthDate,
                                 roles = context.Roles.Select(role => new {
                                     role.RoleId,
                                     role.RoleName
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