import express from "express"

const PORT = 3000

const app = express()

app.get("/hello", (_, response) => {
  response.send("Hello Full Stack!")
})

app.listen(PORT, () => {
  console.log(`Now running at http://localhost:${PORT}`)
})
