import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { MongoClient } from "mongodb";
import { authRouter } from "./routes/auth.js";
import http from "http";
import { postRouter } from "./routes/postRoutes.js";
import { paymentrouter } from "./routes/PaymentRoutes.js";
import { Server } from "socket.io";
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
const app = express();
dotenv.config();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
export const activeUsers = new Set();
app.use(cors(corsOptions));
app.use(express.json());

export const io = new Server(server, {
  cors: {
    origin: `${process.env.CLIENT_URL}`,
    methods: ["GET", "POST"],
  },
});
async function createConnection() {
  try {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("connected to database");
    return client;
  } catch (error) {
    console.log("error while connecting to database", error);
  }
}
export const client = await createConnection();

server.listen(PORT, () => {
  console.log("listening on *:", PORT);
});

app.get("/", (req, res) => {
  res.send({ message: "default request" });
});

io.on("connection", function (socket) {
  socket.on("new user", function (user) {
    if (
      !activeUsers.has(
        (existinguser) => existinguser.user.username === user.username
      )
    ) {
      activeUsers.add({ user: user, socketId: socket.id });
    }
  });

  socket.on("disconnect", () => {
    activeUsers.forEach((user) => {
      if (user.socketId == socket.id) {
        activeUsers.delete(user);
      }
    });
  });
});

app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/payment", paymentrouter);
