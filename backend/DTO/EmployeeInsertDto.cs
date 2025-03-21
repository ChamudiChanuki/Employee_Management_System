using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Automation.DTO
{
    public class EmployeeInsertDto
    {
        [Required]
        [MaxLength(100)]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        
       

        
        public DateTime DateOfBirth { get; set; }

        
        [Range(10000, 1000000)]
        public decimal Salary { get; set; }

        [Required]
        public int DepartmentId { get; set; } // Foreign key reference to Department
    }
}