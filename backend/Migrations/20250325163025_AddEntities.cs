using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Automation.Migrations
{
    /// <inheritdoc />
    public partial class AddEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeKPI_Employees_EmployeeId",
                table: "EmployeeKPI");

            migrationBuilder.DropForeignKey(
                name: "FK_Goal_Employees_EmployeeId",
                table: "Goal");

            migrationBuilder.DropForeignKey(
                name: "FK_PerformanceReview_Employees_EmployeeId",
                table: "PerformanceReview");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PerformanceReview",
                table: "PerformanceReview");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Goal",
                table: "Goal");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EmployeeKPI",
                table: "EmployeeKPI");

            migrationBuilder.RenameTable(
                name: "PerformanceReview",
                newName: "PerformanceReviews");

            migrationBuilder.RenameTable(
                name: "Goal",
                newName: "Goals");

            migrationBuilder.RenameTable(
                name: "EmployeeKPI",
                newName: "EmployeeKPIs");

            migrationBuilder.RenameIndex(
                name: "IX_PerformanceReview_EmployeeId",
                table: "PerformanceReviews",
                newName: "IX_PerformanceReviews_EmployeeId");

            migrationBuilder.RenameIndex(
                name: "IX_Goal_EmployeeId",
                table: "Goals",
                newName: "IX_Goals_EmployeeId");

            migrationBuilder.RenameIndex(
                name: "IX_EmployeeKPI_EmployeeId",
                table: "EmployeeKPIs",
                newName: "IX_EmployeeKPIs_EmployeeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PerformanceReviews",
                table: "PerformanceReviews",
                column: "ReviewId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Goals",
                table: "Goals",
                column: "GoalId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EmployeeKPIs",
                table: "EmployeeKPIs",
                column: "KPIId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeKPIs_Employees_EmployeeId",
                table: "EmployeeKPIs",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Goals_Employees_EmployeeId",
                table: "Goals",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PerformanceReviews_Employees_EmployeeId",
                table: "PerformanceReviews",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeKPIs_Employees_EmployeeId",
                table: "EmployeeKPIs");

            migrationBuilder.DropForeignKey(
                name: "FK_Goals_Employees_EmployeeId",
                table: "Goals");

            migrationBuilder.DropForeignKey(
                name: "FK_PerformanceReviews_Employees_EmployeeId",
                table: "PerformanceReviews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PerformanceReviews",
                table: "PerformanceReviews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Goals",
                table: "Goals");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EmployeeKPIs",
                table: "EmployeeKPIs");

            migrationBuilder.RenameTable(
                name: "PerformanceReviews",
                newName: "PerformanceReview");

            migrationBuilder.RenameTable(
                name: "Goals",
                newName: "Goal");

            migrationBuilder.RenameTable(
                name: "EmployeeKPIs",
                newName: "EmployeeKPI");

            migrationBuilder.RenameIndex(
                name: "IX_PerformanceReviews_EmployeeId",
                table: "PerformanceReview",
                newName: "IX_PerformanceReview_EmployeeId");

            migrationBuilder.RenameIndex(
                name: "IX_Goals_EmployeeId",
                table: "Goal",
                newName: "IX_Goal_EmployeeId");

            migrationBuilder.RenameIndex(
                name: "IX_EmployeeKPIs_EmployeeId",
                table: "EmployeeKPI",
                newName: "IX_EmployeeKPI_EmployeeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PerformanceReview",
                table: "PerformanceReview",
                column: "ReviewId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Goal",
                table: "Goal",
                column: "GoalId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EmployeeKPI",
                table: "EmployeeKPI",
                column: "KPIId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeKPI_Employees_EmployeeId",
                table: "EmployeeKPI",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Goal_Employees_EmployeeId",
                table: "Goal",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PerformanceReview_Employees_EmployeeId",
                table: "PerformanceReview",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
