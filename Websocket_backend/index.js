const http = require("http");
const { Server } = require("socket.io");
const { Worker } = require('node:worker_threads');

const worker = new Worker('./worker.js');
const server = http.createServer();
const io = new Server(server,{
    cors: {
        origin: "http://127.0.0.1:5500", // Allows all origins, or specify your domain
        methods: ["GET", "POST"]
    }
});



io.on('connection', async (socket)=>{
    worker.on('message', (data)=>{
        socket.emit('message', data);
    })
});

server.listen(8000, ()=>{
    console.log("Server is running");
});