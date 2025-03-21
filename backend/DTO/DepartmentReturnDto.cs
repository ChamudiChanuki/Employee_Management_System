using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Automation.DTO
{
    public class DepartmentReturnDto
    {
        public int DepartmentId { get; set; }
        public string Name { get; set; }
        public List<EmployeeReturnDto> Employees { get; set; } // List of employees in the department
    }
}