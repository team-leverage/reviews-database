const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get('/', (req, res) => res.send('Hello World!'))

app.get('/characteristics', db.getCharacteristics)

app.get('/reviews/:productId/list', db.getReviewList)

app.listen(port, () => console.log(`listening on ${port}`))
