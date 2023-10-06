const express = require("express")
const app = express()

const PORT = 4958
var managerRouter = require('./router/manager')
var boardRouter = require('./router/board')

app.use(express.static(__dirname + '/public'))
app.set("view engine", "ejs")

app.listen(PORT, '0.0.0.0')
// app.listen(PORT, () => {
//   console.log("Server don start for port: " + PORT)
// })

// HOME 이동
app.get("/", (req, res) => {
  res.render("home.ejs")
})

app.use('/manager', managerRouter)
app.use('/board', boardRouter)