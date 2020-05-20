using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using e_shop.Models.DatabaseModels;
// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace e_shop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetCategorysController : Controller
    {
        // GET: /<controller>/
        [HttpGet]
        public ActionResult<IEnumerable<Category>> GetCategorys()
        {
            using (var context = new eshopContext())
            {
                return context.Category.ToList();
            }
        }
    }
}
