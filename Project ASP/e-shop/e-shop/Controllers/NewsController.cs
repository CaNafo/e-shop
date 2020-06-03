using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using e_shop.Models;
using e_shop.Models.DatabaseModels;

namespace e_shop.Controllers
{
    [Route("api/News")]
    [ApiController]
    public class NewsController : Controller
    {
        [HttpPost]
        
            public ActionResult<IEnumerable<News>> JsonStringBody([FromBody] NewsModel content)
        {
            using (var context = new eshopContext())
            {
                if (!context.News.ToList().Any(newsses => newsses.NewsTittle == content.NewsTittle))
                {
                    News newNews = new News();

                    newNews.NewsTittle = content.NewsTittle;
                    newNews.NewsDescription = content.NewsDescription;
                    newNews.NewsBody = content.NewsBody;
                    newNews.NewsDateTime = content.NewsDateTime;
                    newNews.NewsPhoto = content.NewsPhoto;
                    newNews.UserId = content.UserId;
                    

                    context.News.Add(newNews);
                    context.SaveChanges();

                    
                }
            }
            return new List<News>();
        }
    }
}