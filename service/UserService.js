import { UserDao } from "../dao/UserDao.js"

export class UserService {

    #dao

    constructor() {
        this.#dao = new UserDao()
    }

    getAll = async () => {
        return this.#dao.getAll()
    }

    create = async dto => {
        const { username, password } = dto
        await this.#dao.create(username, password)
    }

    getByUsername = async username => {
        return this.#dao.getByUsername(username)
    }
}