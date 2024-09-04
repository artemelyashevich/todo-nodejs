import express from 'express'

let exampleArrForPostRequest = [
    1, 2, 3, 4, 5
]

const application = express()

// Позволяет express работать с json (javascript object notation)
application.use(express.json())

// http://localhost:8080/example - endpoint - url, на который пользователь отправляет запрос
// req = request - запрос (то, что пользователь отправляет на сервер)
// res = response - ответ (то, что пользователь получает от сервера)
// next = middleware - "прослойка / филтер / обработчик" между тем, когда запрос отправлен на конкретный endpoint и тем, когда запрос попал на endpoint

// GET, POST, PUT, DELETE ---> CRUD (create-read-update-delete)

// Get запрос http://localhost:8080/todos (Статус код = 200 (ok))
application.get("/todos", (req, res) => {
    res.send(
        [
            {
                name: "Dima",
                id: 10
            },
            {
                name: "Dmitry",
                id: 11
            }
        ]
    )
})

// Post запрос http://localhost:8080/todos [body: value: 1111] (Статус код = 201 (created))
application.post("/example", (req, res) => {
    const requestDataFromUser = req.body
    exampleArrForPostRequest.push(requestDataFromUser.value)
    res.status(201).send(exampleArrForPostRequest)
})

// Put запрос (должен изменять ВСЕ поля!!!) http://localhost:8080/example/3 [body: value: 1111]
application.put("/example/:value", (req, res) => {
    
    const param = req.params
    const data = req.body
    
    const index = exampleArrForPostRequest.indexOf(Number(param.value))
    exampleArrForPostRequest[index] = data.value

    res.send(exampleArrForPostRequest)
})

// Delete запрос (Статус код = 204 (no content))
application.delete("/example/:value", (req, res) => {
    const params = req.params
    exampleArrForPostRequest = exampleArrForPostRequest.filter(example => example !== params.value)
    res.status(204)
})

// Query параметры в запросе http://localhost:8080/todo?id=10&name=Dima
application.get("/todo", (req, res) => {
    const query = req.query
    res.send({
        name: query.name || "Default name",
        id: query.id || -1
    })
})

// Параметры в запросе http://localhost:8080/todo/10/Dima
application.get("/todo/:id/:name", (req, res) => {
    const params = req.params
    res.send({
        id: params.id,
        name: params.name
    })
})

// Middleware (next) 
const middlewareFunctionExample = (req, res, next) => {
    console.log(req.headers)
    next()
}

application.get("/middleware", middlewareFunctionExample, (req, res) => {
    res.status(418).send("Hello!")
})

application.listen(8080, () => console.log("http://localhost:8080"))