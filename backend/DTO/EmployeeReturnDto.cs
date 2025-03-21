using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Automation.DTO
{
    public class EmployeeReturnDto
    {
         public int EmployeeId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime DateOfBirth { get; set; }
        public decimal Salary { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; } // For returning department name
    }
}