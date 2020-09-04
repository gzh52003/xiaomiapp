const express = require("express")
const app = express()
const path = require("path")
const allRouter = require("./public/index")

app.use(express.static(path.join(__dirname, "./public"), {}))

app.use('/api', allRouter)

app.listen(2003, () => {
    console.log("server 2003 is running…")
})