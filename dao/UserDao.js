import { db } from "../db/dbConnection.js";
import util from 'util'


export class UserDao {

    constructor() {
        db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username VARCHAR(10) UNIQUE NOT NULL, password VARCHAR(255));")
    }

    create = async (username, password) => {
        db.run(`INSERT INTO users (username, password) VALUES ('${username}', '${password}');`)
    }

    getAll = async () => {
        const dbAllAsync = util.promisify(db.all).bind(db);
        try {
            const rows = await dbAllAsync("SELECT * FROM users");
            return rows;
        } catch (error) {
            throw new Error(`Error fetching todos: ${error.message}`);
        }
    }

    getByUsername = async username => {
        const dbAllAsync = util.promisify(db.all).bind(db);
        try {
            const rows = await dbAllAsync(`SELECT * FROM users WHERE username = '${username}'`);
            return rows[0]
        } catch (error) {
            throw new Error(`Error fetching todos: ${error.message}`);
        }
    }
}