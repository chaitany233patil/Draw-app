import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRETE } from "../node_modules/@repo/common-backend/src/config";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket, req) => {
  console.log("Client Connected!");

  const getParams = new URLSearchParams(req.url?.split("?")[1]);
  const token = getParams.get("token");
  try {
    const decoded = jwt.verify(token as string, JWT_SECRETE);
    if (decoded && (decoded as JwtPayload).userid) {
      socket.on("message", (data) => {
        const pasrseData = JSON.parse(data.toString());
        if (pasrseData.type == "join_room") {
          socket.send("room Join");
        }

        if (pasrseData.type == "chat") {
          socket.send("chating room");
        }

        if (pasrseData.type == "leave_room") {
          socket.send("Leave room");
        }
      });
    }
  } catch (err) {
    socket.close();
    return;
  }
});
