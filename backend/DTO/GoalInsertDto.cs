using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTO
{
    public class GoalInsertDto
    {
        [Required]
        public int EmployeeId { get; set; }

        [Required]
        [MaxLength(200)]
        public string GoalTitle { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        public bool IsCompleted { get; set; }
    }
}