import { io, activeUsers } from "../index.js";
import { closeChangeStream } from "./EventMonitor.js";

export async function newPostEmmiter(client, timeInMs = 60000, pipeline = []) {
  const collection = client.db("blog").collection("posts");
  const changeStream = collection.watch(pipeline);

  changeStream.on("change", async (next) => {
    activeUsers.forEach((user) => {
      if (user.user.userType === "admin") {
        io.to(user.socketId).emit("new post", next);
      }
    });
  });
  await closeChangeStream(timeInMs, changeStream); //
}
