using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using e_shop.Models.DatabaseModels;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace e_shop.Controllers
{
    [ApiController]
    public class AddToCartController : Controller
    {
        [Route("api/AddToCart")]
        public int AddToCart(int ID, int prodID, int amount)
        {
            using (var context = new eshopContext())
            {
                var product = context.Products.FirstOrDefault(prod => prod.ProductId == prodID);

                if (product != null && amount>0 && amount <= product.ProductAmount)
                {
                    product.ProductAmount -= amount;
                    context.SaveChanges();

                    Reserved reserved = new Reserved();

                    reserved.ProductId = prodID;
                    reserved.CategoryId = product.CategoryId;
                    reserved.UserId = ID;
                    reserved.CartId = context.Cart.FirstOrDefault(cart => cart.UserId == ID).CartId;
                    reserved.ReservedAmount = amount;
                    reserved.ReservedOrdered = false;

                    context.Reserved.Add(reserved);
                }

                
                return context.SaveChanges();
            }
        }
    }
}
