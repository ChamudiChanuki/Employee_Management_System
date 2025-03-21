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

        // GET: api/employees/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeReturnDto>> GetEmployee(int id)
        {
            var employee = await _context.Employees
                .Include(e => e.Department)
                .Where(e => e.EmployeeId == id)
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
                .FirstOrDefaultAsync();

            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        // POST: api/employees
        [HttpPost]
        public async Task<ActionResult<EmployeeReturnDto>> CreateEmployee(EmployeeInsertDto employeeDto)
        {
            var department = await _context.Departments.FindAsync(employeeDto.DepartmentId);
            if (department == null)
            {
                return BadRequest("Invalid Department ID");
            }

            var employee = new Employee
            {
                FullName = employeeDto.FullName,
                Email = employeeDto.Email,
                DateOfBirth = employeeDto.DateOfBirth,
                Salary = employeeDto.Salary,
                DepartmentId = employeeDto.DepartmentId
            };

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            var returnDto = new EmployeeReturnDto
            {
                EmployeeId = employee.EmployeeId,
                FullName = employee.FullName,
                Email = employee.Email,
                DateOfBirth = employee.DateOfBirth,
                Salary = employee.Salary,
                DepartmentId = employee.DepartmentId,
                DepartmentName = department.Name
            };

            return CreatedAtAction(nameof(GetEmployee), new { id = employee.EmployeeId }, returnDto);
        }

        // PUT: api/employees/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, EmployeeInsertDto employeeDto)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            var department = await _context.Departments.FindAsync(employeeDto.DepartmentId);
            if (department == null)
            {
                return BadRequest("Invalid Department ID");
            }

            employee.FullName = employeeDto.FullName;
            employee.Email = employeeDto.Email;
            employee.DateOfBirth = employeeDto.DateOfBirth;
            employee.Salary = employeeDto.Salary;
            employee.DepartmentId = employeeDto.DepartmentId;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/employees/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        
    }
}