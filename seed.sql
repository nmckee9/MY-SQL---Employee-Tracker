USE employee_tracker_db;

INSERT INTO department (name)
VALUES ("Production"), ("HR"), ("Account"), ("Strategy"), ("Creative");

INSERT INTO roles (title, salary, department_id)
VALUES ("HR Manager", 80000, 2), ("Producer", 60000, 1), ("Account Manager", "80000", 3), ("Strategist", "70000", 4), ("Copywriter", 70000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sally", "Harris", 2, 2), ("Joe", "Dirt", 1, NULL), ("Cindy", "Johnson", 3, 2), ("Max", "Burns", 4, NULL), ("Grace", "Wilson", 5, NULL);
