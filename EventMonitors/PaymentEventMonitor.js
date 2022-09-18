import { io, activeUsers } from "../index.js";
import { closeChangeStream } from "./EventMonitor.js";

export async function PaymentEventEmmiter(
  client,
  timeInMs = 10000,
  pipeline = []
) {
  const collection = client.db("blog").collection("payments");
  const changeStream = collection.watch(pipeline);
  changeStream.on("change", async (next) => {
    activeUsers.forEach((user) => {
      if (user.user.userType === "admin") {
        io.to(user.socketId).emit("new Donation", next);
      }
    });
  });

  await closeChangeStream(timeInMs, changeStream); //
}
