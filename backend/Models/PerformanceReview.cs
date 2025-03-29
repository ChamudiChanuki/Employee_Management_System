using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Automation.Models;

namespace backend.Models
{
    public class PerformanceReview
    {
        [Key]
        public int ReviewId { get; set; }

        [Required]
        public int EmployeeId { get; set; }

        [ForeignKey("EmployeeId")]
        public Employee Employee { get; set; }

        [Required]
        public DateTime ReviewDate { get; set; }

        [Required]
        [MaxLength(500)]
        public string Comments { get; set; }

        [Required]
        [Range(1, 5)]
        public int Rating { get; set; }  // 1 = Poor, 5 = Excellent
    }
}