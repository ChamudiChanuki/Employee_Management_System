using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Automation.Data;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
[ApiController]
    public class PerformanceReviewsController : ControllerBase
    {
        private readonly DataContext _context;

    public PerformanceReviewsController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PerformanceReview>>> GetReviews()
    {
        return await _context.PerformanceReviews.Include(r => r.Employee).ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult> AddReview(PerformanceReviewInsertDto dto)
    {
        var review = new PerformanceReview
        {
            EmployeeId = dto.EmployeeId,
            ReviewDate = dto.ReviewDate,
            Comments = dto.Comments,
            Rating = dto.Rating
        };

        _context.PerformanceReviews.Add(review);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetReviews), new { id = review.ReviewId }, review);
    }
    }
}