using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTO
{
    public class GoalReturnDto
    {
         public int GoalId { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string GoalTitle { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsCompleted { get; set; }
    }
}