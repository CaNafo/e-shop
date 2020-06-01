using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using e_shop.Models;
using e_shop.Models.DatabaseModels;

namespace e_shop.Controllers
{
    [Route("api/EditProduct")]
    [ApiController]
    public class EditProductController : Controller
    {
        [HttpPost]
        public string JsonStringBody([FromBody] EditProductModel content)
        {
            using (var context = new eshopContext())
            {
                var productDB = context.Products.FirstOrDefault(item => item.ProductId == content.productId);

                if (productDB != null)
                {
                    context.Products.Remove(productDB);
                    context.SaveChanges();

                    Products product = new Products();
                    product.ProductName = content.tittle;
                    product.ProductPrice = content.price;
                    product.ProductAmount = content.amount;
                    product.ProductDescription = content.description;
                    product.ProductPhoto = content.photo;
                    product.CategoryId = content.category;

                    context.Products.Add(product);
                    context.SaveChanges();

                    return product.ProductId.ToString();
                }

            }
            return null;
        }
    }
}