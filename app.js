const express = require('express')
const {Server} = require('socket.io')
const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, ()=> {
    console.log('Listening to port '+PORT)
})
app.use(express.static(__dirname+'/public'))
const io = new Server(server)
let messages = []

io.on('connection', socket => {
    console.log("Connected Client")
    socket.emit('messagelog', messages)
    socket.emit('welcome', 'Bienvenido a mi Socket')
    socket.on('message', data=>{
        messages.push(data)
        io.emit('messagelog', messages)
    })
})


