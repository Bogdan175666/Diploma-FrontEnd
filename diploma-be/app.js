const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const clientRoutes = require('./routes/client-routes');
const devRoutes = require('./routes/dev-routes');
const authRoutes = require('./routes/auth-routes');

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

app.use('/api/clients', clientRoutes);
app.use('/api/devs', devRoutes);
app.use('/api/login', authRoutes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join", (userId) => {
        socket.join(userId);
        console.log(`${userId} joined`);
    });

    socket.on("call-user", (data) => {
        io.to(data.to).emit("incoming-call", {
            signal: data.signal,
            from: data.from,
        });
    });

    socket.on("notify", (data) => {
        io.to(data.to).emit("notify-developer", {
            signal: data.signal,
            from: data.from,
        });
    });

    socket.on("answer-call", (data) => {
        io.to(data.to).emit("call-answered", {
            signal: data.signal,
        });
    });

    socket.on("send-message", (msg) => {
        socket.broadcast.emit("receive-message", msg);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        server.listen(4200, () => {
            console.log("Server and Socket.IO running on port 4200");
        });
    })
    .catch(err => {
        console.log(err);
    });
