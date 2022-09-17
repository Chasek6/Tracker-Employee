-- DROP DATABASE IF EXISTS Company_db;
-- CREATE DATABASE Company_db;
USE Compnay_db;

INSERT INTO department (name) 
VALUES ("AMAZON"), ("WHOLEFOODS"), ("GOOGLE"), ("MANDIANT");
--
INSERT INTO role (title, salary, department_id)
VAULES ("CEO", 10000000, 1),
("SENIORVICEPRESIDENT", 10000000, 1),
("DICRECTOR", 500000, 2),
("ENGINEER", 500000, 2),
("FINANCEDIRECTOR", 500000, 2),
("CREATIVEDIRECTOR", 300000, 3),
("MARKETINGDIRECTOR", 300000, 3),
("ACCOUNTANT", 300000, 3),

--
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mark", "Zuckerberg", 1,null),
("Jeff", "Bezos", 2, 1),
("Sundar", "Pichai", 3, null),
("Elon", "Musk", 4, 3),
("Bill", "Gates", 5, 3),
("Steve", "Jobs", 6, null),
("Steve", "Ballmer", 7, 6),
("Satya", "Nadella", 8, 6),

--
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
