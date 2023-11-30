const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");

init();

function init() {
  const logoText = logo({ name: "Employee Manager" }).render();
  console.log(logoText);
  loadMainPrompts();
}

function loadMainPrompts() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        { name: "View All Employees", value: "VIEW_EMPLOYEES" },
        { name: "View All Employees By Department", value: "VIEW_EMPLOYEES_BY_DEPARTMENT" },
        { name: "View All Employees By Manager", value: "VIEW_EMPLOYEES_BY_MANAGER" },
        // ... (other choices omitted for brevity)
      ]
    }
  ]).then(res => {
    let choice = res.choice;
    switch (choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "VIEW_EMPLOYEES_BY_DEPARTMENT":
        viewEmployeesByDepartment();
        break;
      // ... (other cases omitted for brevity)
      default:
        quit();
    }
  });
}

function viewEmployees() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => loadMainPrompts());
}

function viewEmployeesByDepartment() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));
      // ... (additional logic omitted for brevity)
    });
}

// ... (other functions omitted for brevity)

function quit() {
  console.log("Goodbye!");
  process.exit();
}
