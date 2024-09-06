import { TodoService } from "../service/TodoService.js";

export class TodoController {

    #service

    constructor() {
        this.#service = new TodoService()
    }

    getAll = async (req, res) => {
        const {order, q} = req.query
        if (order) {
            res.send(await this.#service.getAllOrdered(order))
        }
        if (q) {

        }
        res.send(await this.#service.getAll())
    }

    getById = async (req, res) => {
        res.send(await this.#service.getById(req.params.id))
    }

    create = async (req, res) => {
        await this.#service.create(req.body)
        res.status(201).send()
    }

    update = async (req, res) => {
        await this.#service.update(req.params.id, req.body)
        res.send()
    }

    delete = async (req, res) => {
        await this.#service.delete(req.params.id)
        res.status(204).send()
    }
}