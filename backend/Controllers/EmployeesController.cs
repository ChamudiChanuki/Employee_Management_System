using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Automation.Data;
using Automation.DTO;
using Automation.Models;
using backend.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Automation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly DataContext _context;

        public EmployeesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
public async Task<ActionResult<IEnumerable<EmployeeReturnDto>>> GetEmployees()
{
    var employees = await _context.Employees
        .Include(e => e.Department)
        .Select(e => new EmployeeReturnDto
        {
            EmployeeId = e.EmployeeId,
            FullName = e.FullName,
            Email = e.Email,
            DateOfBirth = e.DateOfBirth,
            Salary = e.Salary,
            DepartmentId = e.DepartmentId,
            DepartmentName = e.Department.Name
        })
        .ToListAsync();

    return Ok(employees);
}
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employees.Include(e => e.Department).FirstOrDefaultAsync(e => e.EmployeeId == id);
            if (employee == null) return NotFound();

            return employee;
        }

        [HttpPost]
        public async Task<ActionResult<Employee>> CreateEmployee(EmployeeInsertDto dto)
        {
            var employee = new Employee
            {
                FullName = dto.FullName,
                Email = dto.Email,
                DateOfBirth = dto.DateOfBirth,
                Salary = dto.Salary,
                DepartmentId = dto.DepartmentId
            };

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEmployee), new { id = employee.EmployeeId }, employee);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, EmployeeInsertDto dto)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) return NotFound();

            employee.FullName = dto.FullName;
            employee.Email = dto.Email;
            employee.DateOfBirth = dto.DateOfBirth;
            employee.Salary = dto.Salary;
            employee.DepartmentId = dto.DepartmentId;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) return NotFound();

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}