import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET","POST"],
    allowedHeaders: ["*"]
  },
  transports: ["websocket", "polling"]
});

// required dummy route so Render thinks server is alive
app.get("/", (req,res)=> res.send("OK"));

io.on("connection", (socket) => {
  console.log("connected:", socket.id);

  socket.on("epc", (epc) => {
    console.log("EPC:", epc);
    io.emit("epc", epc);
  });
});

const port = process.env.PORT || 3000;
httpServer.listen(port, () => console.log("running on " + port));
