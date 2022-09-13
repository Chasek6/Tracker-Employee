const inquirer = require('inquirer');
const table = require('console.table');
const mysql = require('mysql2');
const {orderedSelectAll, employeeQuery, roleQuery } = require('./queries');

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


// function to start the application
const init = () => {
    console.log('Welcome to the Employee Tracker!');
    
}
