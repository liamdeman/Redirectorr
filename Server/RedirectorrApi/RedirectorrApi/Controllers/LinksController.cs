using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RedirectorrApi.Data.Repositories;
using RedirectorrApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RedirectorrApi.Controllers
{
    [ApiConventionType(typeof(DefaultApiConventions))]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class LinksController : ControllerBase
    {
        private readonly ILinkRepository _linkRepository;
        private readonly IRedirectorRepository _redirectorRepository;

        public LinksController(ILinkRepository linkRepository, IRedirectorRepository redirectorRepository)
        {
           this. _linkRepository = linkRepository;
            this._redirectorRepository = redirectorRepository;
        }
        // GET: api/Links
        /// <summary>
        /// Get all links ordered by times clicked
        /// </summary>
        /// <returns>List of Links</returns>
        [HttpGet]
        [AllowAnonymous]
        public IEnumerable<Link> GetLinks() {
           
            return this._linkRepository.GetAll().OrderBy(x => x.clickDates.Count).Reverse();
        }

        // GET : api/Links/FromCurrentUser
        /// <summary>
        /// Get all links from logged in user ordered by date created
        /// </summary>
        /// <returns>List of Links created by the current User </returns>
        [HttpGet("FromCurrentUser")]
        public IEnumerable<Link> GetLinksFromCurrentUser()
        {
            Redirector redirector = this._redirectorRepository.GetBy(User.Identity.Name);
            if (redirector == null)
            {
                return null;
            }
            return redirector.Links.OrderBy(x => x.DateCreated);
        }

        // GET : api/Links/google
        /// <summary>
        /// Get Link with given linkExtension (id)
        /// </summary>
        /// <param name="id">link extension</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [AllowAnonymous]
        public ActionResult<Link> getLink(string id)
        {
            Link link =  this._linkRepository.GetBy(id);
            if (link==null)
            {
                return NotFound();
            }
            return link;
        }

        // POST: api/Links/linkId/clickDates
        /// <summary>
        /// Add a clickdate to a link
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost("{id}/clickDates")]
        public ActionResult AddClickDate(string id)
        {
            try
            {
                Link link = _linkRepository.GetBy(id);
                if (link ==null)
                {
                    return NotFound();
                }
                _linkRepository.AddClickDate(link);
                return NoContent();

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);

            }
        }
        
        // POST: api/Links
        /// <summary>
        /// Creates a Link
        /// </summary>
        /// <param name="link">Link to be created</param>
        /// <returns>Created link</returns>
        [HttpPost]
        public ActionResult<Link> Create(Link link)
        {
            try
            {
                this._redirectorRepository.AddLink(User.Identity.Name, new Link(link.LinkExtension, link.Destination));
                this._redirectorRepository.SaveChanges();

                return CreatedAtAction(nameof(getLink), new { id = link.LinkExtension }, link);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);

            }
        
        }

        // DELETE : api/Links/google
        /// <summary>
        /// Deletes Link by id from logged in user 
        /// </summary>
        /// <param name="id">id of the Link to be deleted</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            try
            {
                Link link = _linkRepository.GetBy(id);
                if (link == null)
                {
                    return NotFound();
                }
                if (!_redirectorRepository.OwnsLink(User.Identity.Name, link))
                {
                    return Unauthorized();
                }
                _linkRepository.Delete(link);
                _linkRepository.SaveChanges();

                return NoContent();

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);

            }
        }
    }
}
