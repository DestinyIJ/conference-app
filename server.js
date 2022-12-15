const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

app.use(cors());

const PORT = process.env.PORT || 8000;

app.get("/", (req,res) => {
    res.send('Server is running');
})

io.on('connection', (socket) => {
    socket.emit('hostCall');

    socket.on()

    socket.on('callUser', ({ userToCall, signalData, host, name }) => {
        io.to(userToCall).emit('callStarted', { signal:signalData, host, name })
    })

    socket.on('answerCall', (data) => {
        io.to(data.from).emit('callAccepted', data.signal)
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('callEnded')
    })
})

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
