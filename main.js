import express from 'express'
import { TodoController } from './controller/TodoController.js'

const application = express()

application.use(express.json())

const todoController = new TodoController()

application.get("/todos", todoController.getAll) // http://localhost:8080/todos?order=asc 

application.post("/todos", todoController.create)

application.get("/todos/:id", todoController.getById)

application.put("/todos/:id", todoController.update)

application.delete("/todos/:id", todoController.delete)

application.listen(8080, () => console.log("http://localhost:8080"))