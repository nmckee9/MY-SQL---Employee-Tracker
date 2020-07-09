DROP DATABASE IF EXISTS employee_tracker_db
CREATE DATABASE employee_tracker_db

USE employee_tracker_db

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title  VARCHAR(100) NOT NULL,
  salary  VARCHAR(100) NOT NULL,
  department_id  VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name  VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role_id  VARCHAR(100),
  manager_id  VARCHAR(100),
  PRIMARY KEY (id)
);