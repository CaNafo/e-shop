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
    public class VisitsController : Controller
    {
        [Route("api/GetVisits")]
        [HttpGet]
        public int GetVisits()
        {
            using (var context = new eshopContext())
            {
                if(context.Logs.ToList().Count == 0)
                {
                    Logs log = new Logs();
                    log.LogCounter = 1;
                    context.Logs.Add(log);
                    context.SaveChanges();

                    return 1;
                }
                else
                {
                    var log = context.Logs.FirstOrDefault();
                    log.LogCounter++;
                    context.SaveChanges();

                    return (int)log.LogCounter;
                }
            }
        }
    }
}
