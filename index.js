import express from 'express'
import { main } from './floatBtn.js'

const app = express()
const port = 3000

app.get('/:id', (req, res) => {
  const { id } = req
  res.send(main(id))
})

app.listen(port, () => {
  console.log('listening on port: ' + port)
})
