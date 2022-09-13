USE DATABASE IF EXISTS `company_db`;
CREATE DATABASE IF NOT EXISTS `company_db`;

USE `company_db`;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (name)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT NOT NULL,
 FOREIGN KEY (department_id) REFERENCES department(id),
  REFERENCES department(id),
  On UPDATE CASCADE,
    On DELETE CASCADE,
    );

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    On UPDATE CASCADE,
    On DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employee(id),
    On UPDATE CASCADE,
    On DELETE CASCADE,
    ON Delete SET NULL,
    );

-- Path: db/seeds.sql
DESCRIBE department;
DESCRIBE role;
DESCRIBE employee;
