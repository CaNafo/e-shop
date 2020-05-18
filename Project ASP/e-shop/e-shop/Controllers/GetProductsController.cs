using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using e_shop.Models.DatabaseModels;

namespace e_shop.Controllers
{
    [ApiController]
    public class GetProductsController : Controller
    {
        [Route("api/GetAllProducts")]
        [HttpGet]
        public ActionResult<IEnumerable<Products>> GetAllProducts()
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
                                 photo = product.ProductPhoto
                             };

                return Ok(result.ToList());
            }
        }

        [Route("api/GetProduct")]
        [HttpGet]
        public ActionResult<IEnumerable<Products>> GetProduct(int ID)
        {
            using (var context = new eshopContext())
            {
                var result = from products in context.Products
                             where (products.ProductId == ID)
                             select new
                             {
                                 tittle = products.ProductName,
                                 description = products.ProductDescription,
                                 price = products.ProductPrice,
                                 expireDate = products.ProductExpireDate,
                                 photo = products.ProductPhoto
                             };
                return Ok(result.ToList());
            }
        }
    }
}