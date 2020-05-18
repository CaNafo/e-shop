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
    public class DeleteProductController
    {
        public int DeleteProduct(int ID)
        {
            using (var context = new eshopContext())
            {
                var itemToRemove = context.Products.SingleOrDefault(product => product.ProductId == ID); //returns a single item.

                if (itemToRemove != null)
                {
                    context.Products.Remove(itemToRemove);
                }

                return context.SaveChanges();
            }
        }
    }
}
