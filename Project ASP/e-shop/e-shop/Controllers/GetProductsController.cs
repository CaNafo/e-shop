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
        public ActionResult<IEnumerable<Products>> GetAllProducts(int categoryId, decimal priceFrom, decimal priceTo, string name, int amount )
        {
            using (var context = new eshopContext())
            {
                if(categoryId != -1 && priceFrom != -1 && priceTo != -1 && name != null && amount != -1 )
                {
                    var result = from product in context.Products
                                 where (product.CategoryId == categoryId &
                                        product.ProductPrice>=priceFrom && product.ProductPrice <= priceTo &
                                        product.ProductName.Equals(name) &
                                        product.ProductAmount == amount
                                        )
                                 select new
                                 {
                                     ID = product.ProductId,
                                     categoryID = product.CategoryId,
                                     tittle = product.ProductName,
                                     price = product.ProductPrice,
                                     amount = product.ProductAmount,
                                     photo = product.ProductPhoto
                                 };

                    return Ok(result.ToList());
                } 
                else if (categoryId != -1 && priceFrom != -1 && priceTo != -1 && name == null && amount != -1)
                {
                    var result = from product in context.Products
                                 where (product.CategoryId == categoryId &
                                        product.ProductPrice >= priceFrom && product.ProductPrice <= priceTo &
                                        product.ProductAmount == amount
                                        )
                                 select new
                                 {
                                     ID = product.ProductId,
                                     categoryID = product.CategoryId,
                                     tittle = product.ProductName,
                                     price = product.ProductPrice,
                                     amount = product.ProductAmount,
                                     photo = product.ProductPhoto
                                 };

                    return Ok(result.ToList());
                }
                else if (categoryId == -1 && priceFrom != -1 && priceTo != -1 && name == null && amount != -1)
                {
                    var result = from product in context.Products
                                 where (
                                        product.ProductPrice >= priceFrom && product.ProductPrice <= priceTo &
                                        product.ProductAmount == amount
                                        )
                                 select new
                                 {
                                     ID = product.ProductId,
                                     categoryID = product.CategoryId,
                                     tittle = product.ProductName,
                                     price = product.ProductPrice,
                                     amount = product.ProductAmount,
                                     photo = product.ProductPhoto
                                 };

                    return Ok(result.ToList());
                }
                else if (categoryId == -1 && priceFrom != -1 && priceTo != -1 && name == null && amount == -1)
                {
                    var result = from product in context.Products
                                 where (
                                        product.ProductPrice >= priceFrom && product.ProductPrice <= priceTo 
                                        )
                                 select new
                                 {
                                     ID = product.ProductId,
                                     categoryID = product.CategoryId,
                                     tittle = product.ProductName,
                                     price = product.ProductPrice,
                                     amount = product.ProductAmount,
                                     photo = product.ProductPhoto
                                 };

                    return Ok(result.ToList());
                }
                else if (categoryId == -1 && priceFrom == -1 && priceTo == -1 && name == null && amount != -1)
                {
                    var result = from product in context.Products
                                 where (
                                        product.ProductAmount == amount
                                        )
                                 select new
                                 {
                                     ID = product.ProductId,
                                     categoryID = product.CategoryId,
                                     tittle = product.ProductName,
                                     price = product.ProductPrice,
                                     amount = product.ProductAmount,
                                     photo = product.ProductPhoto
                                 };

                    return Ok(result.ToList());
                }
                else if (categoryId == -1 && priceFrom != -1 && priceTo == -1 && name == null && amount == -1)
                {
                    var result = from product in context.Products
                                 where (
                                        product.ProductPrice >= priceFrom 
                                        )
                                 select new
                                 {
                                     ID = product.ProductId,
                                     categoryID = product.CategoryId,
                                     tittle = product.ProductName,
                                     price = product.ProductPrice,
                                     amount = product.ProductAmount,
                                     photo = product.ProductPhoto
                                 };

                    return Ok(result.ToList());
                }
                else if (categoryId == -1 && priceFrom == -1 && priceTo != -1 && name == null && amount == -1)
                {
                    var result = from product in context.Products
                                 where (
                                    product.ProductPrice <= priceTo 
                                        )
                                 select new
                                 {
                                     ID = product.ProductId,
                                     categoryID = product.CategoryId,
                                     tittle = product.ProductName,
                                     price = product.ProductPrice,
                                     amount = product.ProductAmount,
                                     photo = product.ProductPhoto
                                 };

                    return Ok(result.ToList());
                }
                else if (categoryId != -1 && priceFrom == -1 && priceTo == -1 && name == null && amount == -1)
                {
                    var result = from product in context.Products
                                 where (product.CategoryId == categoryId 
                                        )
                                 select new
                                 {
                                     ID = product.ProductId,
                                     categoryID = product.CategoryId,
                                     tittle = product.ProductName,
                                     price = product.ProductPrice,
                                     amount = product.ProductAmount,
                                     photo = product.ProductPhoto
                                 };

                    return Ok(result.ToList());
                }
                else
                {
                    var result = from product in context.Products
                                 select new
                                 {
                                     ID = product.ProductId,
                                     categoryID = product.CategoryId,
                                     tittle = product.ProductName,
                                     price = product.ProductPrice,
                                     amount = product.ProductAmount,
                                     photo = product.ProductPhoto
                                 };

                    return Ok(result.ToList());
                }
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
                                 productId = products.ProductId,
                                 tittle = products.ProductName,
                                 description = products.ProductDescription,
                                 price = products.ProductPrice,
                                 amount = products.ProductAmount,
                                 expireDate = products.ProductExpireDate,
                                 categoryId = products.CategoryId,
                                 categoryName = context.Category.Where(cat => cat.CategoryId == products.CategoryId).Select(c => c.CategoryName).ToList(),
                                 photo = products.ProductPhoto
                             };
                return Ok(result.ToList());
            }
        }

        [Route("api/GetProductWithName")]
        [HttpGet]
        public ActionResult<IEnumerable<Products>> GetProductWithName(string name)
        {
            using (var context = new eshopContext())
            {
                if(name != null)
                {
                    var result = from product in context.Products
                                 where (product.ProductName.Contains(name))
                                 select new
                                 {
                                     ID = product.ProductId,
                                     categoryID = product.CategoryId,
                                     tittle = product.ProductName,
                                     price = product.ProductPrice,
                                     amount = product.ProductAmount,
                                     photo = product.ProductPhoto
                                 };

                    return Ok(result.ToList());
                }
                else
                {
                    var result = from product in context.Products
                                 select new
                                 {
                                     ID = product.ProductId,
                                     categoryID = product.CategoryId,
                                     tittle = product.ProductName,
                                     price = product.ProductPrice,
                                     amount = product.ProductAmount,
                                     photo = product.ProductPhoto
                                 };

                    return Ok(result.ToList());
                }
            }
        }
    }
}