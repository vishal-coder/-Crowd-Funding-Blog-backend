import { client } from "../index.js";
import { ObjectId } from "mongodb";

export function savePaymentDetails(data) {
  return client.db("blog").collection("payments").insertOne(data);
}

export function saveLinkPostPayment(data) {
  return client.db("blog").collection("payments").insertOne(data);
}

export function paymentPostMapping(postid, insertedId) {
  const query = { _id: ObjectId(postid) };
  const update = { $push: { paymentList: insertedId } };
  const options = { upsert: true };

  return client
    .db("blog")
    .collection("posts")
    .updateOne(query, update, options);
}

export function fetchPostPaymentInfo(postId) {
  const query = [
    { $match: { _id: ObjectId(postId) } },
    {
      $lookup: {
        from: "payments",
        let: { paymentList: "$paymentList" },
        pipeline: [
          { $match: { $expr: { $in: ["$_id", "$$paymentList"] } } },
          {
            $project: {
              _id: 1,
              amount: 1,
              razorpayPaymentId: 1,
              createdOn: 1,
              username: 1,
            },
          },
        ],

        as: "output",
      },
    },
  ];

  return client.db("blog").collection("posts").aggregate(query).toArray();
}
