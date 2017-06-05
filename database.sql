CREATE TABLE task_table (
    user_id serial PRIMARY KEY,
    task text,
    completed boolean
);

SELECT * FROM task_table;

DELETE  FROM task_table;
