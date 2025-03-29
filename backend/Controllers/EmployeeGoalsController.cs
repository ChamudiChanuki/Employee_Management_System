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
    public class GoalsController : ControllerBase
    {
        private readonly DataContext _context;

        public GoalsController(DataContext context)
        {
            _context = context;
        }

        // ✅ Get All Goals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GoalReturnDto>>> GetGoals()
        {
            var goals = await _context.Goals
                .Include(g => g.Employee)
                .Select(g => new GoalReturnDto
                {
                    GoalId = g.GoalId,
                    EmployeeId = g.EmployeeId,
                    EmployeeName = g.Employee.FullName,
                    GoalTitle = g.GoalTitle,
                    Description = g.Description,
                    StartDate = g.StartDate,
                    EndDate = g.EndDate,
                    IsCompleted = g.IsCompleted
                })
                .ToListAsync();

            return Ok(goals);
        }

        // ✅ Get Goal by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<GoalReturnDto>> GetGoalById(int id)
        {
            var goal = await _context.Goals
                .Include(g => g.Employee)
                .Where(g => g.GoalId == id)
                .Select(g => new GoalReturnDto
                {
                    GoalId = g.GoalId,
                    EmployeeId = g.EmployeeId,
                    EmployeeName = g.Employee.FullName,
                    GoalTitle = g.GoalTitle,
                    Description = g.Description,
                    StartDate = g.StartDate,
                    EndDate = g.EndDate,
                    IsCompleted = g.IsCompleted
                })
                .FirstOrDefaultAsync();

            if (goal == null)
                return NotFound();

            return Ok(goal);
        }

        // ✅ Add a New Goal
        [HttpPost]
        public async Task<ActionResult<GoalReturnDto>> CreateGoal(GoalInsertDto dto)
        {
            var employeeExists = await _context.Employees.AnyAsync(e => e.EmployeeId == dto.EmployeeId);
            if (!employeeExists)
                return BadRequest("Employee not found.");

            var goal = new Goal
            {
                EmployeeId = dto.EmployeeId,
                GoalTitle = dto.GoalTitle,
                Description = dto.Description,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                IsCompleted = dto.IsCompleted
            };

            _context.Goals.Add(goal);
            await _context.SaveChangesAsync();

            var goalReturnDto = new GoalReturnDto
            {
                GoalId = goal.GoalId,
                EmployeeId = goal.EmployeeId,
                EmployeeName = (await _context.Employees.FindAsync(goal.EmployeeId))?.FullName,
                GoalTitle = goal.GoalTitle,
                Description = goal.Description,
                StartDate = goal.StartDate,
                EndDate = goal.EndDate,
                IsCompleted = goal.IsCompleted
            };

            return CreatedAtAction(nameof(GetGoalById), new { id = goal.GoalId }, goalReturnDto);
        }

        // ✅ Update Goal
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGoal(int id, GoalInsertDto dto)
        {
            var goal = await _context.Goals.FindAsync(id);
            if (goal == null)
                return NotFound();

            goal.GoalTitle = dto.GoalTitle;
            goal.Description = dto.Description;
            goal.StartDate = dto.StartDate;
            goal.EndDate = dto.EndDate;
            goal.IsCompleted = dto.IsCompleted;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // ✅ Mark Goal as Completed
        [HttpPut("{id}/complete")]
        public async Task<IActionResult> MarkGoalAsCompleted(int id)
        {
            var goal = await _context.Goals.FindAsync(id);
            if (goal == null)
                return NotFound();

            goal.IsCompleted = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // ✅ Delete Goal
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGoal(int id)
        {
            var goal = await _context.Goals.FindAsync(id);
            if (goal == null)
                return NotFound();

            _context.Goals.Remove(goal);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
    
}