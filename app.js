const express = require("express")
const axios = require("axios")
const cors = require("cors")

const app = express()
const port = process.env.port || 3000
app.use(cors())

app.get("/photos", async (req, res) => {
  const albumId = req.query.albumId
  const { data } = await axios.get(
    "http://jsonplaceholder.typicode.com/photos",
    { params : { albumId }}
  )

  res.json(data)
})

app.get("/photos/:id", async (req, res) => {
  const { data } = await axios.get(
    `http://jsonplaceholder.typicode.com/photos/${req.params.id}`)

  res.json(data)
})

app.listen(port, () => console.log(`app running in port ${port}`))