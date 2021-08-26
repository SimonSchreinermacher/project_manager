CREATE DATABASE IF NOT EXISTS ProjectManager;
USE ProjectManager;

CREATE TABLE IF NOT EXISTS Project(
	project_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255),
	language VARCHAR(255),
	created_on DATE,
	deadline DATE
);

CREATE TABLE IF NOT EXISTS Todo(
	todo_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(255),
	importance VARCHAR(255),
	is_finished BOOLEAN,
	project_id INTEGER REFERENCES Project(project_id)
);