using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using e_shop.Models;
using e_shop.Models.DatabaseModels;

namespace e_shop.Controllers
{
    [ApiController]
    public class NewsController : Controller
    {
        [Route("api/AddNews")]
        [HttpPost]
        public ActionResult<IEnumerable<News>> AddNews([FromBody] NewsModel content)
        {
            using (var context = new eshopContext())
            {
                if (!context.News.ToList().Any(newsses => newsses.NewsTittle == content.NewsTittle))
                {
                    News newNews = new News();

                    newNews.NewsTittle = content.NewsTittle;
                    newNews.NewsDescription = content.NewsDescription;
                    newNews.NewsBody = content.NewsBody;
                    newNews.NewsDateTime = DateTime.Now;
                    newNews.UserId = content.UserId;


                    context.News.Add(newNews);
                    context.SaveChanges();


                }
            }
            return new List<News>();
        }

        [Route("api/GetNews")]
        [HttpGet]
        public ActionResult<IEnumerable<News>> GetNews()
        {
            using (var context = new eshopContext())
            {
                return context.News.ToList();
            }
        }
    }
}