const express = require('express')
const app = express()

const path = require('path')

app.use(express.static('static'))

app.set('port', process.env.PORT || 3000)

app.locals.title = 'Pizza Express'
app.locals.pizzas = {}

app.set('view engine', 'jade')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const generateId = require('./lib/generate-id')

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  })
}

app.get('/', (request, response) => {
  response.render('index')
})

app.post('/pizzas', (request, response) => {
  var id = generateId()
  app.locals.pizzas[id] = request.body
  response.sendStatus(201)
})

module.exports = app
