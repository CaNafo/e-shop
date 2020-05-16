using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using e_shop.Models.DatabaseModels;

namespace e_shop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetAllProductsController : Controller
    {
        [HttpGet]
        public ActionResult<IEnumerable<Products>> GetUser()
        {
            using (var context = new eshopContext())
            {
                var result = from product in context.Products
                             select new
                             {
                                 ID = product.ProductId,
                                 categoryID = product.CategoryId,
                                 tittle = product.ProductName,
                                 price = product.ProductPrice,
                                 description = product.ProductDescription,
                                 photo = product.ProductPhoto
                             };

                return Ok(result.ToList());
            }
        }
    }
}