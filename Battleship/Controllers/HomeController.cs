using System.Diagnostics;
using Battleship.Models;
using Microsoft.AspNetCore.Mvc;

namespace Battleship.Controllers
{
    public class HomeController : Controller
    {
        /*todo consider using UseDefaultFiles*/
        public IActionResult Index()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None,
            NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel
            {
                RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier
            });
        }
    }
}
