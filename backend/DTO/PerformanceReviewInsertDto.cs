using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTO
{
    public class PerformanceReviewInsertDto
    {
        [Required]
        public int EmployeeId { get; set; }

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