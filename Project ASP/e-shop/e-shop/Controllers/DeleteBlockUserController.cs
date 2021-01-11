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
    [ApiController]
    public class DeleteBlockUserController : Controller
    {
        [HttpPost]
        [Route("api/DeleteUser")]
        public int DeleteUser([FromBody] UserManagmentModel content)
        {
            using (var context = new eshopContext())
            {
                var deleteRoleList = context.RoleList.Where(user => user.UserId == content.ID);

                if (deleteRoleList != null)
                {
                    context.RoleList.RemoveRange(deleteRoleList);
                    context.SaveChanges();
                }

                var itemToRemove = context.Users.SingleOrDefault(user => user.UserId == content.ID); //returns a single item.

                var deleteOrdered = context.Orders.Where(user => user.UserId == content.ID);

                if (deleteOrdered != null)
                {
                    context.Orders.RemoveRange(deleteOrdered);
                    context.SaveChanges();
                }
                var deleteComments = context.Comment.Where(user => user.UserId == content.ID);

                if (deleteComments != null)
                {
                    context.Comment.RemoveRange(deleteComments);
                    context.SaveChanges();
                }

                var deleteReserved = context.Reserved.Where(user => user.UserId == content.ID);

                if (deleteReserved != null)
                {
                    context.Reserved.RemoveRange(deleteReserved);
                    context.SaveChanges();
                }

                var deleteCart = context.Cart.Where(user => user.UserId == content.ID);

                if (deleteCart != null)
                {
                    context.Cart.RemoveRange(deleteCart);
                    context.SaveChanges();
                }

                var deleteNews = context.News.Where(user => user.UserId == content.ID);

                if (deleteNews != null)
                {
                    context.News.RemoveRange(deleteNews);
                    context.SaveChanges();
                }

                if (itemToRemove != null)
                {
                    
                    context.Users.Remove(itemToRemove);
                }

                return context.SaveChanges();
            }
        }

        [Route("api/BlockUser")]
        public int BlockUser([FromBody] UserManagmentModel content)
        {
            using (var context = new eshopContext())
            {
                var itemToRemove = context.RoleList.Where(user => user.UserId == content.ID);

                if (itemToRemove != null)
                {
                    context.RoleList.RemoveRange(itemToRemove);
                }

                return context.SaveChanges();
            }
        }

       
    }
}
