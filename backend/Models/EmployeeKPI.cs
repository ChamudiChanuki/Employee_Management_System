using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Automation.Models;

namespace backend.Models
{
    public class EmployeeKPI
    {
        [Key]
        public int KPIId { get; set; }

        [Required]
        public int EmployeeId { get; set; }

        [ForeignKey("EmployeeId")]
        public Employee Employee { get; set; }

        [Required]
        [MaxLength(100)]
        public string KPIName { get; set; }

        [Required]
        [Range(0, 100)]
        public int Score { get; set; }
    }
}