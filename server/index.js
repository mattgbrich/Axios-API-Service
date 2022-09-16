const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/foods', (req, res) => {
  res.json({
    data: [{id:1, name: 'Banana'}, {id: 2, name: 'Bread'}, {id: 3, name: 'Bacon'}, {id: 4, name: 'Barley'}]
  })
})

app.get('/forbidden', (req, res) => {
  res.status(403).end()
})

app.get('/unauthorized', (req, res) => {
  res.status(401).end()
})

app.get('/not-found', (req, res) => {
  res.status(404).end()
})

app.get('/timeout', (req, res) => {
  setTimeout(() => {
    res.status(408).end()
  }, 2000)
})

app.get('/teapot', (req, res) => {
  res.status(418).end()
})

app.get('/server-error', (req, res) => {
  res.status(500).end()
})

app.get('/bad-gateway', (req, res) => {
  res.status(502).end()
})

app.get('/unavailable', (req, res) => {
  res.status(503).end()
})

app.put('/foods', (req, res) => {
  res.json({ data: req.body })
})

app.post('/foods', (req, res) => {
  res.json({ data: req.body })
})

app.delete('/foods/', (req, res) => {
  res.json({ data: req.body })
})

const port = 8080;
app.listen(port, () => console.log(`Server listening on port ${port}`))

