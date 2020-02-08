// import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express() // create your express app// make app use dependencies
const mongo = require('mongodb')
const MongoClient = mongo.MongoClient
const uri = 'mongodb+srv://databaseUser:databaseTestingPassword@cluster0-vlmbs.mongodb.net/todo-example?retryWrites=true&w=majority'

let client
let mongoClient = new MongoClient(uri, {
  // reconnectTries: Number.MAX_VALUE,
  // autoReconnect: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoClient.connect((err, db) => {
  if (err !== null) {
    console.log(err)
    return
  }
  client = db
})

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())
// app.get('/todo', (req, res) => {
//   res.send([
//     'Thing 1',
//     'Thing 2',
//     'This is another thing!'
//   ])
// })

app.get('/todos', (req, res) => {
  const collection = client.db('todo-example').collection('todos')
  collection.find().toArray(function (err, results) {
    if (err) {
      console.log(err)
      res.send([])
      return
    }

    res.send(results)
  })
})

app.post('/addTodo', (req, res) => {
  const collection = client.db('todo-example').collection('todos')
  var todo = req.body.todo // parse the data from the request's body
  collection.insertOne({title: todo}, function (err, results) {
    if (err) {
      console.log(err)
      res.send('')
      return
    }
    res.send(results.ops[0]) // returns the new document
  })
})

app.listen(process.env.PORT || 8081) // client is already running on 8080
