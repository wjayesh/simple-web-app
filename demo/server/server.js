// import express
const express = require('express')
const app = express()

// you can choose any port number of your choice.
// confirm if the port is available
const port = 3000

// Define a function for the base url
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// start listening on the port for requests
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})