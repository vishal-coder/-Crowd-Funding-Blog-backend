import express from "express";
import {
  createPaymnetOrder,
  getPostPaymentInfo,
  linkPostPayment,
  savePaymentInfo,
} from "../controllers/PaymentController.js";
import { verifyAuth } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("default payment request");
});

router.post("/create-payment-order", verifyAuth, createPaymnetOrder);
router.post("/savePaymentInfo", verifyAuth, savePaymentInfo);
router.post("/linkPostPayment", verifyAuth, linkPostPayment);
router.post("/paymentInfo", verifyAuth, getPostPaymentInfo);

export const paymentrouter = router;
