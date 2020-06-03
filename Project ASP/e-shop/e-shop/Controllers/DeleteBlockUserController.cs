using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using e_shop.Models.DatabaseModels;
using e_shop.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace e_shop.Controllers
{
    [Route("api/Delete")]
    [ApiController]
    public class DeleteBlockUserController : Controller
    {
        [Route("api/DeleteUser")]
        public int DeleteUser(int ID)
        {
            using (var context = new eshopContext())
            {
                var deleteRoleList = context.RoleList.Where(user => user.UserId == ID);

                if (deleteRoleList != null)
                {
                    context.RoleList.RemoveRange(deleteRoleList);
                    context.SaveChanges();
                }

                var itemToRemove = context.Users.SingleOrDefault(user => user.UserId == ID); //returns a single item.

                if (itemToRemove != null)
                {
                    
                    context.Users.Remove(itemToRemove);
                }

                return context.SaveChanges();
            }
        }

        [Route("api/BlockUser")]
        public int BlockUser(int ID)
        {
            using (var context = new eshopContext())
            {
                var itemToRemove = context.RoleList.Where(user => user.UserId == ID);

                if (itemToRemove != null)
                {
                    context.RoleList.RemoveRange(itemToRemove);
                }

                return context.SaveChanges();
            }
        }
    }
}
