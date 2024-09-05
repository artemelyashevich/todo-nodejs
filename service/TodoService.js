import { TodoDao } from "../dao/TodoDao.js"

export class TodoService {

    #dao

    constructor() {
        this.#dao = new TodoDao()
    }

    getAll = async () => {
        return this.#dao.getAll()
    }

    getAllOrdered = async (order) => {
        switch (order.toLowerCase()) {
            case "asc":
                break;
            case "desc":
                break;
            default:
                break;
        }
    }

    getById = async id => {
        return this.#dao.getById(id)
    }

    create = async dto => {
        const { title, body, is_done: isDone } = dto
        await this.#dao.create(title, body, isDone)
    }

    update = async (id, dto) => {
        const { title, body, is_done: isDone } = dto
        await this.#dao.update(id, title, body, isDone)
    }

    delete = async id => {
        await this.#dao.delete(id)
    }
}