using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using e_shop.Models.DatabaseModels;

namespace e_shop.Controllers
{
    [ApiController]
    public class GetOrdersContoller : Controller
    {
        [Route("api/GetAllOrders")]
        [HttpGet]
        public ActionResult<IEnumerable<Reserved>> GetAllOrders()
        {
            using (var context = new eshopContext())
            {
                var result = from Orders in context.Orders
                             select new
                             {
                                 orderID = Orders.OrderId,
                                 adress = Orders.OrderAdress,
                                 phone = Orders.OrderPhoneNumber,
                                 email = Orders.OrderEmail,
                                 orderDate = Orders.OrderDate,
                                 tittle = context.Products.FirstOrDefault(prod => prod.ProductId == Orders.ProductId).ProductName,
                                 photo = context.Products.FirstOrDefault(prod => prod.ProductId == Orders.ProductId).ProductPhoto,
                                 price = (context.Products.FirstOrDefault(prod => prod.ProductId == Orders.ProductId).ProductPrice * (context.Products.FirstOrDefault(prod => prod.ProductId == Orders.ProductId).ProductAmount))
                             };

                return Ok(result.ToList());
            }

        }

        [Route("api/GetAllReserved")]
        [HttpGet]
        public ActionResult<IEnumerable<Reserved>> GetAllReserved()
        {
            using (var context = new eshopContext())
            {
                var result = from Reserved in context.Reserved
                             select new
                             {
                                 reservedID = Reserved.ReservedId,
                                 tittle = context.Products.FirstOrDefault(prod => prod.ProductId == Reserved.ProductId).ProductName,
                                 price = (context.Products.FirstOrDefault(prod => prod.ProductId == Reserved.ProductId).ProductPrice * Reserved.ReservedAmount),
                                 user = (context.Users.FirstOrDefault(u => u.UserId == Reserved.UserId).FirstName) + " " + (context.Users.FirstOrDefault(u => u.UserId == Reserved.UserId).LastName),
                                 userEmail = (context.Users.FirstOrDefault(u => u.UserId == Reserved.UserId).EMail)
                             };

                return Ok(result.ToList());
            }

        }
    }
}