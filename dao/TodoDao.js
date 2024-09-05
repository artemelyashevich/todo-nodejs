import { db } from "../db/dbConnection.js"
import util from 'util'

export class TodoDao {

    constructor() {
        db.run("CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, title VARCHAR(255) NOT NULL, body VARCHAR NULL, is_done INTEGER);")
    }

    getAll = async () => {
        const dbAllAsync = util.promisify(db.all).bind(db);
        try {
            const rows = await dbAllAsync("SELECT * FROM todos");
            return rows;
        } catch (error) {
            throw new Error(`Error fetching todos: ${error.message}`);
        }
    }

    getById = async id => {
        const dbAllAsync = util.promisify(db.all).bind(db);
        try {
            const rows = await dbAllAsync("SELECT * FROM todos WHERE id = " + id);
            return rows[0];
        } catch (error) {
            throw new Error(`Error fetching todos: ${error.message}`);
        }
    }

    create = async (title, body, isDone) => {
        db.run(`INSERT INTO todos (title, body, is_done) VALUES ('${title}', '${body}', ${isDone});`)
    }

    update = async (id, title, body, isDone) => {
        db.run(`UPDATE todos SET title = '${title}', body = '${body}', is_done = ${+isDone} WHERE id = ${+id};`)
    }

    delete = async id => {
        db.run(`DELETE FROM todos WHERE id = ${+id}`)
    }
}