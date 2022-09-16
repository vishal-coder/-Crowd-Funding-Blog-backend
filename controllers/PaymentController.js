import Razorpay from "razorpay";
import {
  saveLinkPostPayment,
  savePaymentDetails,
} from "../models/PaymentModal.js";
export const createPaymnetOrder = async (req, res) => {
  console.log("Inside createPaymnetOrder");
  const { amount } = req.body;
  let order = null;
  console.log(process.env.RZ_KEY_ID);

  var instance = new Razorpay({
    key_id: process.env.RZ_KEY_ID,
    key_secret: process.env.RZ_KEY_SECRET,
  });

  var options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  await instance.orders.create(options, function (err, order) {
    if (err) {
      return res
        .status(500)
        .send({ success: false, message: "some error occured" });
    } else {
      res.send({
        success: true,
        message: "payment initiated successfully",
        orderData: order,
      });
    }
    console.log(order);
  });
};

export const savePaymentInfo = async (req, res) => {
  console.log("Inside savePaymentInfo");
  const {
    postid,
    username,
    amount,
    orderCreationId,
    razorpayPaymentId,
    razorpaySignature,
  } = req.body;

  const query = {
    amount: amount,
    orderCreationId: orderCreationId,
    razorpayPaymentId: razorpayPaymentId,
    signature: razorpaySignature,
    username: username,
    createOn: new Date(),
    postid: postid,
  };

  const payment = await savePaymentDetails(query);

  if (!payment) {
    return res
      .status(500)
      .send({ success: false, message: "some error occured" });
  }

  res.send({ success: true, message: "Payment was successful" });
};

export const linkPostPayment = async (req, res) => {
  console.log("Inside linkPostPayment");
  const { postid, username, amount, payementId } = req.body;

  // const pipeline = [
  //   {
  //     $match: {
  //       operationType: "insert",

  //     },
  //   },
  // ];
  // monitorOrdersUsingEventEmitter(client, 10000, "order created", pipeline);

  const added = await saveLinkPostPayment({
    username: username,
    postid: postid,
    amount: amount,
    payementId: payementId,
    createdOn: new Date(),
  });
  if (!added) {
    res.send({
      success: false,
      message: "Failed to add payment details",
    });
    res.end();
  }
  res.send({
    success: true,
    message: "payment details  added successfully",
    product: added,
  });
};
