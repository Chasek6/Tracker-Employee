// note to self :CHASE -- Double check the following with tutor
// weeks behind, need to catch up and get ahead hopefully this works and i can submit with little to no errors ! *note to self Chase*
// assign variables to the functions being called' " inquirer, mysql, console.table, and the init function"  not 100 sure if this is correct


const inquirer = require('inquirer');
const table = require('console.table');
const mysql = require('mysql2');
const {orderedSelectAll, employeeQuery, roleQuery } = require('./helpers/queries');

// create the connection to database

let managerArray = [];
let roleArray = [];
let employeeArray = [];
let departmentArray = [];
let managerIdArray = [];

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Justforyou@',
    database: 'company_db'
}, 
console.log('Connected to the company_db database.')
);

// 
// // function to start the application
// const init = () => {
//     console.log('Welcome to the Employee Tracker!');
    
// }

// function to view main menu

const mainMenu = () => {
    inquirer.prompt({
        type: 'list',
        name: 'mainMenu',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 
        'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'View All Roles', 'Add Role', 'Remove Role', 'View All Departments', 'Add Department', 'Remove Department', 'Quit']
    }).then((answer) => {
        switch (answer.mainMenu) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'View All Employees By Department':
                viewAllEmployeesByDepartment();
                break;
            case 'View All Employees By Manager':
                viewAllEmployeesByManager();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Remove Employee':
                removeEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'Update Employee Manager':
                updateEmployeeManager();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Remove Role':
                removeRole();
                break;
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Remove Department':
                removeDepartment();
                break;
            case 'Quit':
                quit();
                break;
                process.exit();
        }
    })
}

// view all employees check class repo for help *note to self*

const viewAllEmployees = () => {
    db.query(orderedSelectAll("employee","first_name"), function(err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
}

//view all employees by department should be the same as view all employees but add a where clause to the query to filter by department and the same should be done for view all employees by manager
// note to self :CHASE -- Double check the following with tutor  

const viewAllEmployeesByDepartment = () => {
    db.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            departmentArray.push(res[i].name);
        }
        inquirer.prompt({
            type: 'list',
            name: 'department',
            message: 'Which department would you like to view?',
            choices: departmentArray
        }).then((answer) => {
            db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id WHERE department.name = ?', answer.department, function(err, res) {
                if (err) throw err;
                console.table(res);
                mainMenu();
            })
        })
    })
}

const viewAllEmployeesByManager = () => {
    db.query('SELECT * FROM employee', function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            managerArray.push(res[i].first_name + ' ' + res[i].last_name);
            managerIdArray.push(res[i].id);
        }
        inquirer.prompt({
            type: 'list',
            name: 'manager',
            message: 'Which manager would you like to view?',
            choices: managerArray
        }).then((answer) => {
            db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id WHERE employee.manager_id = ?', managerIdArray[managerArray.indexOf(answer.manager)], function(err, res) {
                if (err) throw err;
                console.table(res);
                mainMenu();
            })
        })
    })
}

// function to add employee

const addEmployee = () => {
    db.query('SELECT * FROM role', function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            roleArray.push(res[i].title);
        }
        db.query('SELECT * FROM employee', function(err, res) {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                employeeArray.push(res[i].first_name + ' ' + res[i].last_name);
            }
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the employee\'s first name?'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'What is the employee\'s last name?'
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is the employee\'s role?',
                    choices: roleArray
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: 'Who is the employee\'s manager?',
                    choices: employeeArray
                }
            ]).then((answer) => {
                db.query('INSERT INTO employee SET ?', {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: roleArray.indexOf(answer.role) + 1,
                    manager_id: employeeArray.indexOf(answer.manager) + 1
                }, function(err, res) {
                    if (err) throw err;
                    console.log('Employee successfully added!');
                    mainMenu();
                })
            })
        })
    })
}

// remove employee function should be similar to other remove functions check notes *note to self*

const removeEmployee = () => {
    db.query('SELECT * FROM employee', function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            employeeArray.push(res[i].first_name + ' ' + res[i].last_name);
        }
        inquirer.prompt({
            type: 'list',
            name: 'employee',
            message: 'Which employee would you like to remove?',
            choices: employeeArray
        }).then((answer) => {
            db.query('DELETE FROM employee WHERE ?', {
                first_name: answer.employee.split(' ')[0],
                last_name: answer.employee.split(' ')[1]
            }, function(err, res) {
                if (err) throw err;
                console.log('Employee successfully removed!');
                mainMenu();
            })
        })
    })
}

// update employee role function, manager function, and view all roles function should be similar to the add employee function

const updateEmployeeRole = () => {
    db.query('SELECT * FROM employee', function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            employeeArray.push(res[i].first_name + ' ' + res[i].last_name);
        }
        db.query('SELECT * FROM role', function(err, res) {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                roleArray.push(res[i].title);
            }
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Which employee would you like to update?',
                    choices: employeeArray
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is the employee\'s new role?',
                    choices: roleArray
                }
            ]).then((answer) => {
                db.query('UPDATE employee SET ? WHERE ?', [
                    {
                        role_id: roleArray.indexOf(answer.role) + 1
                    },
                    {
                        first_name: answer.employee.split(' ')[0],
                        last_name: answer.employee.split(' ')[1]
                    }
                ], function(err, res) {
                    if (err) throw err;
                    console.log('Employee successfully updated!');
                    mainMenu();
                })
            })
        })
    })
}

// employee manager function confused on how to do this but I think I have the right idea

const updateEmployeeManager = () => {
    db.query('SELECT * FROM employee', function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            employeeArray.push(res[i].first_name + ' ' + res[i].last_name);
        }
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Which employee would you like to update?',
                choices: employeeArray
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Who is the employee\'s new manager?',
                choices: employeeArray
            }
        ]).then((answer) => {
            db.query('UPDATE employee SET ? WHERE ?', [
                {
                    manager_id: employeeArray.indexOf(answer.manager) + 1
                },
                {
                    first_name: answer.employee.split(' ')[0],
                    last_name: answer.employee.split(' ')[1]
                }
            ], function(err, res) {
                if (err) throw err;
                console.log('Employee successfully updated!');
                mainMenu();
            })
        })
    })
}

// view all roles function to be added but i dont know how to do it yet

const viewAllRoles = () => {
    db.query('SELECT * FROM role', function(err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
}

// add role function

const addRole = () => {
    db.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            departmentArray.push(res[i].name);
        }
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'list',
                name: 'department',
                message: 'What is the department of the role?',
                choices: departmentArray
            }
        ]).then((answer) => {
            db.query('INSERT INTO role SET ?', {
                title: answer.title,
                salary: answer.salary,
                department_id: departmentArray.indexOf(answer.department) + 1
            }, function(err, res) {
                if (err) throw err;
                console.log('Role successfully added!');
                mainMenu();
            })
        })
    })
}

//  remove role function

const removeRole = () => {

}

// view all departments function

const viewAllDepartments = () => {
    db.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
}

//add department function

const addDepartment = () => {
    inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'What is the name of the department?'
    }).then((answer) => {
        db.query('INSERT INTO department SET ?', {
            name: answer.name
        }, function(err, res) {
            if (err) throw err;
            console.log('Department successfully added!');
            mainMenu();
        })
    })
}

// function to remove department. // function to exit application. // function to view total utilized budget of a department. // function to exit application

const removeDepartment = () => {
    
    }

const viewUtilizedBudget = () => {

}


const exitApplication = () => {
    console.log('Goodbye!');
    process.exit();
}
// initialize application

const init = () => {
    console.log('Welcome to the Employee Tracker!');
    mainMenu();
}

init();


