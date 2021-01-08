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
        public ActionResult<IEnumerable<Orders>> GetAllOrders()
        {
            using (var context = new eshopContext())
            {
                var result = from Orders in context.Orders
                             select new
                             {
                                 ID = Orders.ProductId,
                                 categoryID = Orders.CategoryId
                             };

                return Ok(result.ToList());
            }
        }

    }
}