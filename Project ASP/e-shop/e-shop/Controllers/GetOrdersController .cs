using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using e_shop.Models.DatabaseModels;

namespace e_shop.Controllers
{
    [ApiController]
    public class GetCommentsController : Controller
    {
        [Route("api/GetComments")]
        [HttpGet]
        public ActionResult<IEnumerable<Comment>> GetComments(int productID)
        {
            using (var context = new eshopContext())
            {
                var result = from Comment in context.Comment
                             where(Comment.ProductId == productID)
                             select new
                             {
                                 user = context.Users.FirstOrDefault(u => u.UserId == Comment.UserId).FirstName + " " + context.Users.FirstOrDefault(u => u.UserId == Comment.UserId).LastName,
                                 userID = Comment.UserId,
                                 text = Comment.CommentText
                             };

                return Ok(result.ToList());
            }

        }
    }
}