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
        public int DeleteUser(int ID)
        {
            using (var context = new eshopContext())
            {
                var itemToRemove = context.Users.SingleOrDefault(user => user.UserId == ID); //returns a single item.

                if (itemToRemove != null)
                {
                    context.Users.Remove(itemToRemove);
                }

                return context.SaveChanges();
            }
        }

        public int BlockUser(int ID)
        {
            using (var context = new eshopContext())
            {
                var itemToRemove = context.Users.Where(user => user.UserId == ID);

                if (itemToRemove != null)
                {
                    context.Users.RemoveRange(itemToRemove);
                }

                return context.SaveChanges();
            }
        }
    }
}
