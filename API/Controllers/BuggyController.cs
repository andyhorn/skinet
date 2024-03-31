using API.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class BuggyController : BaseApiController
  {
    [HttpGet("notfound")]
    public ActionResult GetNotFound()
    {
      return NotFound(new ApiResponse(404));
    }

    [HttpGet("servererror")]
    public ActionResult GetServerError()
    {
      throw new NullReferenceException();
    }

    [HttpGet("badrequest")]
    public ActionResult GetBadRequest()
    {
      return BadRequest(new ApiResponse(400));
    }

    [HttpGet("badrequest/{id}")]
    public ActionResult GetBadRequest(int id)
    {
      return BadRequest();
    }
  }
}