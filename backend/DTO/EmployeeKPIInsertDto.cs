using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTO
{
    public class EmployeeKPIInsertDto
    {
        [Required]
        public int EmployeeId { get; set; }

        [Required]
        [MaxLength(100)]
        public string KPIName { get; set; }

        [Required]
        [Range(0, 100)]
        public int Score { get; set; }
    }
}