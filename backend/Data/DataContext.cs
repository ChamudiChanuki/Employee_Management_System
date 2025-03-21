using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Automation.Models;
using Microsoft.EntityFrameworkCore;

namespace Automation.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {

         }
         public DbSet<Employee > Employees { get; set; }
         public DbSet<Department > Departments { get; set; }
        
    }
}