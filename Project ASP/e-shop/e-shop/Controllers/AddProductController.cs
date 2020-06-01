using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using e_shop.Models;
using e_shop.Models.DatabaseModels;

namespace e_shop.Controllers
{
    [Route("api/AddProduct")]
    [ApiController]
    public class AddProductController : Controller
    {
        [HttpPost]
        
            public ActionResult<IEnumerable<Products>> JsonStringBody([FromBody] AddProductModel content)
        {
            using (var context = new eshopContext())
            {
                if (!context.Products.ToList().Any(prod => prod.ProductName == content.tittle))
                {

                    Products newProduct = new Products();

                    newProduct.ProductName = content.tittle;
                    newProduct.ProductPrice = content.price;
                    newProduct.ProductAmount = content.amount;
                    newProduct.ProductDescription = content.description;
                    newProduct.ProductPhoto = content.photo;
                    newProduct.CategoryId = content.category;


                    context.Products.Add(newProduct);
                    context.SaveChanges();

                    
                }
            }
                    return new List<Products>();
        }
    }
}