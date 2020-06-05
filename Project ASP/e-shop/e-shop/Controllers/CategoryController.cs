using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using e_shop.Models;
using e_shop.Models.DatabaseModels;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace e_shop.Controllers
{
    [ApiController]
    public class CategoryController : Controller
    {
        [Route("api/AddCategory")]
        [HttpPost]
        public int JsonStringBody([FromBody] CategoryModel content)
        {

            using (var context = new eshopContext())
            {

                Category category = new Category();
                category.CategoryName = content.categoryName;
                context.Category.Add(category);
                return context.SaveChanges();

            }
        }
    }
}
