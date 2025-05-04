import { WebSocketServer, WebSocket } from "ws";
import jwt, { decode, JwtPayload } from "jsonwebtoken";
import { JWT_SECRETE } from "../node_modules/@repo/common-backend/src/config";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  userId: String;
  roomId: String[];
  ws: WebSocket;
}

const users: User[] = [];

wss.on("connection", (socket, req) => {
  console.log("Client Connected!");

  const getParams = new URLSearchParams(req.url?.split("?")[1]);
  const token = getParams.get("token");
  try {
    const decoded = jwt.verify(token as string, JWT_SECRETE);
    if (decoded && (decoded as JwtPayload).userid) {
      users.push({
        userId: (decoded as JwtPayload).userid,
        roomId: [],
        ws: socket,
      });

      socket.on("message", (data) => {
        const parseData = JSON.parse(data.toString());
        if (parseData.type == "join_room") {
          const user = users.find(
            (x) => x.userId == (decoded as JwtPayload).userid
          );
          user?.roomId.push(parseData.roomId);
          socket.send("room Join");
        }

        if (parseData.type == "chat") {
          users.forEach((x) => {
            if (x.roomId.includes(parseData.roomId)) {
              x.ws.send(
                JSON.stringify({
                  message: parseData.message,
                })
              );
            }
          });
        }

        if (parseData.type == "leave_room") {
          const user = users.find(
            (x) => x.userId == (decoded as JwtPayload).userid
          );
          if (user) {
            user.roomId = user.roomId.filter((x) => x != parseData.roomId);
            socket.send("room Leave");
          }
        }
      });
    }
  } catch (err) {
    socket.close();
    return;
  }
});
