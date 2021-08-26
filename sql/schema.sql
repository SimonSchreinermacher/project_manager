CREATE DATABASE IF NOT EXISTS projectmanager;
USE projectmanager;

CREATE TABLE IF NOT EXISTS project(
	project_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255),
	language VARCHAR(255),
	created_on DATETIME,
	deadline DATETIME
);

CREATE TABLE IF NOT EXISTS todo(
	todo_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(255),
	importance VARCHAR(255),
	is_finished BOOLEAN,
	project INTEGER REFERENCES project(project_id)
);