using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTO
{
    public class EmployeeKPIReturnDto
    {
         public int KPIId { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string KPIName { get; set; }
        public int Score { get; set; }
    }
}