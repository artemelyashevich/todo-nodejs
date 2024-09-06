import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send(
            {
                message: "Unauthorized!"
            }
        )
    }
    const token = req.headers.authorization.replace(/Bearer\s?/, "")
    if (!token) {
        return res.status(401).send(
            {
                message: "Unauthorized!"
            }
        )
    }
    try {
        const decodedToken = jwt.verify(token, "secret-token")
        req.body.username = decodedToken.username
    }
    catch(err) {
        return res.status(401).send(
            {
                message: "Invalid token!"
            }
        )
    }
    next()
}