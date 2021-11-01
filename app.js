const express = require("express")
const axios = require("axios")
const cors = require("cors")
const Redis = require("redis")
const redisClient = Redis.createClient()

const DEFAULT_EXPIRATION = 3600;

const app = express()
const port = process.env.port || 3000
app.use(cors())

app.get("/photos", async (req, res) => {
  const albumId = req.query.albumId
  // dicek apakah ada key photos di redis,
  // kalo belom ada get axios
  // kalo udah ada get dari redis
  const { data } = await axios.get(
    "http://jsonplaceholder.typicode.com/photos",
    { params : { albumId }}
  )
  console.log("data", JSON.stringify(data))
  redisClient.setex("photos", DEFAULT_EXPIRATION, JSON.stringify(data))
  // getPhotosDariRedis()
  res.json(data)
})

app.get("/photos/:id", async (req, res) => {
  const { data } = await axios.get(
    `http://jsonplaceholder.typicode.com/photos/${req.params.id}`)

  res.json(data)
})

app.listen(port, () => console.log(`app running in port ${port}`))