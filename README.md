
# 
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/CHASEK6/)
## Employee Tracker

## Table of Contents 
  
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)
## Installation & Packages
The application uses npm Inquirer 8.2.4, console.table and MySQL2. Running 'npm i" with the current package.json file will install all of the Dependencies.

This application program can be called from the main working directory using 'node index.js'.
npm i
```
## Usage|WalkThrough video 
Starting this program the user will be prompted to choose options from the main menu.

'View all Employees' that will show the user all Employees in the database , which will include their role, salaries, departments & managers. If the Manager name is Null that means the employee is the Manager.

'Add Employee' will prompt the user for the a first & last name of the new employee, the role of the employee & the manager of the new employee. If the user selects none as the manager that employee will be set as the Manager.

'Update Employee Role' will prompt the user for the name of the employee & the role that the user want to change that employee to.

'View All Roles' will display all of the roles and the department that the employees are associated with.

'Add Role' will prompt the user for the department, name of the role, and the salary of the role to be added.

'View All Departments' will display the current departments in the database in alphabetical order.

'Add Department' will prompt the user for the name of the department & will add it to the database.







## License
This project is licensed under the MIT license.




## Contributing
Chase Stratton 
https://github.com/Chasek6/Tracker-Employee


