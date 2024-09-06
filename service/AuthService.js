import jwt from "jsonwebtoken";
import CryptoJs from "crypto-js"
import { UserService } from "./UserService.js";

export class AuthService {

    #service

    constructor() {
        this.#service = new UserService();
    }

    register = async dto => {
        const { username, password } = dto
        const encryptedPassword = CryptoJs.AES.encrypt(
            password,
            "secret"
        ).toString()
        await this.#service.create({...dto, password: encryptedPassword})
        const token = jwt.sign(
            {
                username
            },
            "secret-token",
            {
                expiresIn: "1d",
            }
        )
        return { token }
    }

    login = async dto => {
        const { username, password } = dto

        const oldUser = await this.#service.getByUsername(username)

        const decryptedPassword = CryptoJs.AES.decrypt(
            oldUser.password,
            "secret"
        ).toString(CryptoJs.enc.Utf8)

        if (password !== decryptedPassword) {
            throw new Error("Password mismatch...")
        }

        const token = jwt.sign(
            {
                username
            },
            "secret-token",
            {
                expiresIn: "1d",
            }
        )
        return { token }
    }
}