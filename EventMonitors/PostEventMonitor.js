import { io, activeUsers } from "../index.js";
import { fetchPostdetails } from "../models/PostModal.js";
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

export async function updatePostEmmiter(
  client,
  timeInMs = 60000,
  pipeline = []
) {
  const collection = client.db("blog").collection("posts");
  const changeStream = collection.watch(pipeline);

  changeStream.on("change", async (next) => {
    activeUsers.forEach(async (user) => {
      if (user.user.userType != "admin") {
        const postId = next.documentKey._id;
        const postData = await fetchPostdetails(postId);
        let data = {};
        data.fullDocument = postData;
        io.emit("new post", data);
      }
    });
  });
  await closeChangeStream(timeInMs, changeStream); //
}
