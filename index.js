const inquirer = require("inquirer")
const connection = require("./connection")
// const cTable = require('console.table');




//function init

function init() {
    inquirer
        .prompt({
            name: "choice",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all Employees",
                "View all Departments",
                "View all Roles",
                "Add Employee",
                "Add Department",
                "Add Roles",
                "Update Existing Employee Role",
                "exit"
            ]
        })
        .then(function (answer) {

            switch (answer.choice) {

                case ("View all Employees"):
                    viewEmployees();
                    break;
                case ("View all Departments"):
                    viewDepartments();
                    break;
                case ("View all Roles"):
                    viewRoles();
                    break;
                case ("Add Employee"):
                    addEmployee();
                    break;
                case ("Add Department"):
                    addDepartment();
                    break;
                case ("Add Roles"):
                    addRole();
                    break;
                case ("Update Existing Employee Role"):
                    updateEmployee();
                    break;
                case "exit":
                    connection.end();
                    break;

            }
        })
};
function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    })
};
function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    })
};
function viewRoles() {
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    })
};
async function addDepartment() {
    inquirer.prompt(
        {
            name: "department",
            type: "input",
            message: "Add the Department Name",
        }
    )
        .then(function (answer) {
            connection.query("INSERT INTO department SET ?",
                {
                    name: answer.department,
                },
                function (err) {
                    if (err) throw err;
                });

            init();
        })
};

function addRole() {
    const departmentsArray = []
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        res.map(department => departmentsArray.push(department.name + " " + department.id))
        const questions = inquirer.prompt([
            {
                name: "department_id",
                type: "list",
                message: "What department is the role in?",
                choices: departmentsArray
            },
            {
                name: "title",
                type: "input",
                message: "What is the title of the role?",
            },
            {
                name: "salary",
                type: "number",
                message: "what is the role's salary?",
            },
        ])
            .then(function (answer) {
                connection.query("INSERT INTO department SET ?",
                    {
                        department_id: response.department_id,
                        title: response.title,
                        salary: response.salary
                    },
                    function (err) {
                        if (err) throw err;
                    });

                init();
            })

    })
};

async function addEmployee() {
    const rolesArray = [];
    const roles = await connection.query("SELECT title, id FROM roles", function (err, res) {
        if (err) throw err;
        res.map(role => rolesArray.push(role.title + " " + role.id))
    })
    const managerArray = [];
    const employee = await connection.query("SELECT manager_id, first_name, last_name FROM employee", function (err, res) {
        if (err) throw err;
        res.map(manager => managerArray.push(manager.first_name + " " + manager.last_name + " " + manager.manager_id))
    })

    const questions = await inquirer.prompt([
        {

            name: "employee_first",
            type: "input",
            message: "What is the employees first name"

        },
        {
            name: "employee_last",
            type: "input",
            message: "What is the employees last name"
        },
        {
            name: "employee_role",
            type: "list",
            message: "What is the employees role",
            choices: rolesArray
        },
        {
            name: "manager_id",
            type: "list",
            message: "Who is the employees manager?",
            choices: managerArray

        }
    ])
        .then(function (answer) {
            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: answer.employee_first,
                    last_name: answer.employee_last,
                    role_id: answer.role_id,
                    manager_id: answer.manager_id,
                },
                function (err) {
                    if (err) throw err;
                });

            init();
        })
};

async function updateEmployee() {
    const employees = await connection.dbQuery("SELECT * FROM employee");
    const employeesArray = employees.map(employee => ({
        value: employee.id,
        name: employee.first_name + " " + employee.last_name
    }))

    inquirer.prompt ([
        {

            name: "updateEmployee",
            type: "list",
            message: "Select employee to update their role",
            choices: employeesArray
    
        }]).then( async (answer) => { 
                 const roles = await connection.dbQuery("SELECT title, id FROM roles");
            
                 const roleChoices = roles.map(role => ({
                     name: role.title,
                     value: role.id
                 }));
                 inquirer.prompt([
                    {
                        name: "updateRole",
                        type: "list",
                        message: "Which role does this employee have?",
                        choices: roleChoices
                
                    }]
                 ).then(
                    async roleAnswer => {
                        
                         const response = await connection.dbQuery("UPDATE employee SET role_id = ? WHERE id = ?", [
                            roleAnswer.updateRole, answer.updateEmployee
                         ])
                         console.log(response)
                         init()
                     }
                 )
        })
}

init()

//function for view department, add, modify

//SELECT * FROM department