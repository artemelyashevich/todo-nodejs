import { AuthService } from "../service/AuthService.js"

export class AuthController {

    #service

    constructor() {
        this.#service = new AuthService();
    }

    register = async (req, res) => {
        res.status(201).send(await this.#service.register(req.body))
    }

    login = async (req, res) => {
        try {
            const result = await this.#service.login(req.body)
            res.status(201).send(result)
        } catch (err) {
            res.status(400).send(
                {
                    message: err.message
                }
            )
        }
    }
}