import express from 'express'
import { main } from './floatBtn.js'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(main())
})


app.listen(port, () => {
  console.log('listening on port: ' + port)
})
