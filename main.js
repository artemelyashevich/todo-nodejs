import express from 'express'
import { TodoController } from './controller/TodoController.js'
import { UserController } from './controller/UserController.js'
import { AuthController } from './controller/AuthController.js'
import { requireAuth } from './middleware/authMiddleware.js'

const application = express()

application.use(express.json())

const todoController = new TodoController()
const userController = new UserController() 
const authController = new AuthController()

// todo routes
application.get("/todos", todoController.getAll) // http://localhost:8080/todos?order=asc 

application.post("/todos", requireAuth, todoController.create)

application.get("/todos/:id", todoController.getById)

application.put("/todos/:id", requireAuth, todoController.update)

application.delete("/todos/:id", requireAuth, todoController.delete)

// user routes
application.get("/users", userController.getAll)

application.post("/users", requireAuth, userController.create)

// auth routes
application.post("/auth/register", authController.register)

application.post("/auth/login", authController.login)

application.listen(8080, () => console.log("http://localhost:8080"))