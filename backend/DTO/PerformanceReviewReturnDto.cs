using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTO
{
    public class PerformanceReviewReturnDto
    {
        public int ReviewId { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public DateTime ReviewDate { get; set; }
        public string Comments { get; set; }
        public int Rating { get; set; }  // 1 = Poor, 5 = Excellent
    }
}