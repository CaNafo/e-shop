using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using e_shop.Models.DatabaseModels;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace e_shop.Controllers
{
    [ApiController]
    public class AddToOrdersController : Controller
    {
        [Route("api/AddToOrders")]
        public int AddToOrders(int reservedID, string adress, string phone, string e_mail)
        {
            using (var context = new eshopContext())
            {
                var reserved = context.Reserved.FirstOrDefault(res => res.ReservedId == reservedID);

                if (reserved != null)
                {
                    reserved.ReservedOrdered = true;
                    context.SaveChanges();

                    Orders order = new Orders();

                    order.CartId = reserved.CartId;
                    order.CategoryId = reserved.CategoryId;
                    order.ProductId = reserved.ProductId;
                    order.UserId = reserved.UserId;
                    order.ReservedId = reserved.ReservedId;
                    order.OrderDate= DateTime.Now;
                    order.OrderAdress = adress;
                    order.OrderPhoneNumber = phone;
                    order.OrderEmail = e_mail;

                    context.Orders.Add(order);
                }
                
                return context.SaveChanges();
            }
        }
    }
}
