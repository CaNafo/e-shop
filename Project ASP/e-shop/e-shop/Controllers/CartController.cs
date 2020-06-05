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
    public class CartController : Controller
    {
        [Route("api/GetMyProducts")]
        [HttpPost]
        public ActionResult<IEnumerable<Reserved>> GetMyProducts([FromBody] ReservedProduct content)
        {
            using (var context = new eshopContext())
            {
                var result = from reserved in context.Reserved
                             where (reserved.UserId == content.ID)
                             select new
                             {
                                 reservedID = reserved.ReservedId,
                                 productID = reserved.ProductId,
                                 amount = reserved.ReservedAmount,
                                 tittle = context.Products.FirstOrDefault(prod => prod.ProductId == reserved.ProductId).ProductName,
                                 photo = context.Products.FirstOrDefault(prod => prod.ProductId == reserved.ProductId).ProductPhoto,
                                 price = (context.Products.FirstOrDefault(prod => prod.ProductId == reserved.ProductId).ProductPrice*reserved.ReservedAmount)
                             };

                return Ok(result.ToList());
            }

        }

        [Route("api/DeleteReservation")]
        [HttpPost]
        public int DeleteReservation([FromBody] ReservedProduct content)
        {
            using (var context = new eshopContext())
            {
                var reserved = context.Reserved.FirstOrDefault(res => res.ReservedId == content.ID);
                               
                if(reserved != null)
                {
                    var prod = context.Products.FirstOrDefault(p => p.ProductId == reserved.ProductId);
                    prod.ProductAmount += reserved.ReservedAmount;
                    context.Reserved.Remove(reserved);
                }

                return context.SaveChanges();
            }

        }

    }
}
