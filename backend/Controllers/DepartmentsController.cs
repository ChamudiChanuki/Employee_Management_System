using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Automation.Data;
using Automation.DTO;
using Automation.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Automation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly DataContext _context;

        public DepartmentsController(DataContext context)
        {
            _context = context;
        }
        // GET: api/departments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DepartmentReturnDto>>> GetDepartments()
        {
            var departments = await _context.Departments
                .Include(d => d.Employees)
                .Select(d => new DepartmentReturnDto
                {
                    DepartmentId = d.DepartmentId,
                    Name = d.Name,
                    Employees = d.Employees.Select(e => new EmployeeReturnDto
                    {
                        EmployeeId = e.EmployeeId,
                        FullName = e.FullName,
                        Email = e.Email,
                        
                        DateOfBirth = e.DateOfBirth,
                        Salary = e.Salary,
                        DepartmentId = e.DepartmentId,
                        DepartmentName = d.Name
                    }).ToList()
                })
                .ToListAsync();

            return Ok(departments);
        }

        // GET: api/departments/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<DepartmentReturnDto>> GetDepartment(int id)
        {
            var department = await _context.Departments
                .Include(d => d.Employees)
                .Where(d => d.DepartmentId == id)
                .Select(d => new DepartmentReturnDto
                {
                    DepartmentId = d.DepartmentId,
                    Name = d.Name,
                    Employees = d.Employees.Select(e => new EmployeeReturnDto
                    {
                        EmployeeId = e.EmployeeId,
                        FullName = e.FullName,
                        Email = e.Email,
                        
                        DateOfBirth = e.DateOfBirth,
                        Salary = e.Salary,
                        DepartmentId = e.DepartmentId,
                        DepartmentName = d.Name
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (department == null)
            {
                return NotFound();
            }

            return Ok(department);
        }

        // POST: api/departments
        [HttpPost]
        public async Task<ActionResult<DepartmentReturnDto>> CreateDepartment(DepartmentInsertDto departmentDto)
        {
            var department = new Department
            {
                Name = departmentDto.Name
            };

            _context.Departments.Add(department);
            await _context.SaveChangesAsync();

            var returnDto = new DepartmentReturnDto
            {
                DepartmentId = department.DepartmentId,
                Name = department.Name,
                Employees = new List<EmployeeReturnDto>() // Empty initially
            };

            return CreatedAtAction(nameof(GetDepartment), new { id = department.DepartmentId }, returnDto);
        }

        // PUT: api/departments/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDepartment(int id, DepartmentInsertDto departmentDto)
        {
            var department = await _context.Departments.FindAsync(id);
            if (department == null)
            {
                return NotFound();
            }

            department.Name = departmentDto.Name;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/departments/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            var department = await _context.Departments.FindAsync(id);
            if (department == null)
            {
                return NotFound();
            }

            _context.Departments.Remove(department);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}