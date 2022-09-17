DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db ;

CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX dep_ind (department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX dep_ind (department_id),
  CONSTRAINT fk_employee FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);
-- CREATE TABLE role (
--   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY(), 
--   title VARCHAR(30) NOT NULL,
--   salary DECIMAL NOT NULL,
--   department_id INT NOT NULL,


-- CREATE TABLE employee (
--     id INT NOT NULL AUTO_INCREMENT,
--     first_name VARCHAR(30) NOT NULL,
--     last_name VARCHAR(30) NOT NULL,
--     role_id INT NOT NULL,
--     manager_id INT,
--     FOREIGN KEY (role_id) REFERENCES role(id),
--     On UPDATE CASCADE,
--     On DELETE SET NULL,
--     FOREIGN KEY (manager_id) REFERENCES employee(id),
--     On UPDATE CASCADE,
--     On DELETE CASCADE,
--     ON Delete SET NULL,
--     );

-- Path: db/seeds.sql
-- DESCRIBE department;
-- DESCRIBE role;
-- DESCRIBE employee;

