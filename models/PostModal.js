import { client } from "../index.js";
import { ObjectId } from "mongodb";

export function savePost(data) {
  return client.db("blog").collection("posts").insertOne(data);
}

export function fetchPostForAllUser() {
  let query = { status: { $ne: "New" } };
  return client.db("blog").collection("posts").find(query).toArray();
}

export function fetchPostForAllAdmin() {
  return client.db("blog").collection("posts").find().toArray();
}

export function fetchPostForUser(username) {
  let query = { $or: [{ status: { $ne: "New" } }, { username: username }] };

  return client.db("blog").collection("posts").find(query).toArray();
}

export function fetchPostdetails(Id) {
  return client
    .db("blog")
    .collection("posts")
    .findOne({ _id: ObjectId(Id) });
}

export function fetchUserdetails(username) {
  return client.db("blog").collection("users").findOne({ username: username });
}

export function updatePostStatus(id, status) {
  return client
    .db("blog")
    .collection("posts")
    .updateOne({ _id: ObjectId(id) }, { $set: { status: status } });
}

export function deletePostById(id) {
  return client
    .db("blog")
    .collection("posts")
    .deleteOne({ _id: ObjectId(id) });
}
