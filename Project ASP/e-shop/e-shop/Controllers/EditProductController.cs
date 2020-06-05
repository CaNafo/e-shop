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

                if (productDB != null && productDB.CategoryId != content.category)
                {
                    var reserved = context.Reserved.Where(item => item.ProductId == content.productId);
                    context.Reserved.RemoveRange(reserved);
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
                else
                {
                    productDB.ProductName = content.tittle;
                    productDB.ProductPrice = content.price;
                    productDB.ProductAmount = content.amount;
                    productDB.ProductDescription = content.description;
                    productDB.ProductPhoto = content.photo;

                    context.SaveChanges();

                    return productDB.ProductId.ToString();
                }

            }
            return null;
        }
    }
}