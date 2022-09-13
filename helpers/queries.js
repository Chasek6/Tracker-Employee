// helper functions for queries
// need more assistance with this part
// not able to get the queries to work in the routes

const orderedSelectAll = (table, order) => {
    return `SELECT * FROM ${table} ORDER BY ${order}`;
    }

    const roleQuery = () => {
    return `SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    LEFT JOIN department ON role.department_id = department.id`;
    }

    const employeeQuery = () => {
    return `SELECT employee.id, employee.first_name, employee.last_name, role.title,
     department.name AS department, role.salary, CONCAT(manager.first_name, '
      ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id`;
    }

    module.exports = { orderedSelectAll, roleQuery, employeeQuery };
    
    //not sure if this is correct or not but I am not able to get the queries to work in the routes
    