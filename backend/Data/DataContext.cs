using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Automation.Models;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Automation.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {

         }
         public DbSet<Employee > Employees { get; set; }
         public DbSet<Department > Departments { get; set; }
         public DbSet<EmployeeKPI > EmployeeKPIs { get; set; }
         public DbSet<Goal > Goals { get; set; }
         public DbSet<PerformanceReview > PerformanceReviews { get; set; }
        
        
    }
}