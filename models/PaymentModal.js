import { client } from "../index.js";
import { ObjectId } from "mongodb";

export function savePaymentDetails(data) {
  return client.db("blog").collection("payments").insertOne(data);
}

export function saveLinkPostPayment(data) {
  return client.db("blog").collection("payments").insertOne(data);
}
