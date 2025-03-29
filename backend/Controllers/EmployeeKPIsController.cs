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
{[Route("api/[controller]")]
[ApiController]
    public class EmployeeKPIsController : ControllerBase
    {private readonly DataContext _context;

    public EmployeeKPIsController(DataContext context)
    {
        _context = context;
    }

   [HttpGet]
public async Task<ActionResult<IEnumerable<EmployeeKPIReturnDto>>> GetKPIs()
{
    var kpis = await _context.EmployeeKPIs
        .Include(k => k.Employee)
        .Select(k => new EmployeeKPIReturnDto
        {
            KPIId = k.KPIId,
            EmployeeId = k.EmployeeId,
            EmployeeName = k.Employee.FullName, // Avoids circular reference
            KPIName = k.KPIName,
            Score = k.Score
        })
        .ToListAsync();

    return Ok(kpis);
}


    [HttpPost]
    public async Task<ActionResult> AddKPI(EmployeeKPIInsertDto dto)
    {
        var kpi = new EmployeeKPI
        {
            EmployeeId = dto.EmployeeId,
            KPIName = dto.KPIName,
            Score = dto.Score,
            
        };

        _context.EmployeeKPIs.Add(kpi);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetKPIs), new { id = kpi.KPIId }, kpi);
    }
        
    }
}