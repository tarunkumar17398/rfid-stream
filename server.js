import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("connected:", socket.id);

  socket.on("epc", (epc) => {
    console.log("EPC:", epc);
    io.emit("epc", epc);
  });
});

const port = process.env.PORT || 3000;
httpServer.listen(port, () => console.log("running on " + port));
