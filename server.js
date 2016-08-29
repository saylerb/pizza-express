const express = require('express')
const app = express()

const path = require('path')

app.use(express.static('static'))

app.set('port', process.env.PORT || 3000)

app.locals.title = 'Pizza Express'

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  })
}

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '/static/index.html'))
})

module.exports = app
