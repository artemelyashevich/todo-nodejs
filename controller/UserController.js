import { UserService } from "../service/UserService.js"

export class UserController {

    #service

    constructor() {
        this.#service = new UserService()
    }

    getAll = async (req, res) => {
        res.send(await this.#service.getAll())
    }

    create = async (req, res) => {
        await this.#service.create(req.body)
        res.status(201).send()
    }
}