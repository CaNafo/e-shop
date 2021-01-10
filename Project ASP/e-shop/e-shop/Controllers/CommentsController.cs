using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using e_shop.Models.DatabaseModels;

namespace e_shop.Controllers
{
    [ApiController]
    public class CommentsController : Controller
    {
       
        [Route("api/GetCommentsOfProduct")]
        public ActionResult<IEnumerable<Comment>> GetComments(int productID)
        {
            using (var context = new eshopContext())
            {
                var result = from Comment in context.Comment
                                where (Comment.ProductId == productID)
                                select new
                                {
                                    user = context.Users.FirstOrDefault(u => u.UserId == Comment.UserId).FirstName + " " + context.Users.FirstOrDefault(u => u.UserId == Comment.UserId).LastName,
                                    userID = Comment.UserId,
                                    text = Comment.CommentText
                                };

                return Ok(result.ToList());
            }

        }
      

        [Route("api/AddComment")]
        public int AddComment(int userID, int productID, string text)
        {
            using (var context = new eshopContext())
            {
                Comment comment = new Comment();

                comment.UserId = userID;
                comment.ProductId = productID;
                comment.CategoryId = context.Products.FirstOrDefault(prod => prod.ProductId == productID).CategoryId;
                comment.CommentText = text;

                context.Comment.Add(comment);

            return context.SaveChanges();
            }
        }
    }
}