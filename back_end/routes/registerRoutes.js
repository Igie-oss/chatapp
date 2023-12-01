import express from "express";
import {
  requestEmailVerify,
  verifyOtp,
  reRequestOtp,
  registerUser,
  getAllUserNames,
} from "../controller/registerControllers.js";

const router = express.Router();
router.route("/reqotp").post(requestEmailVerify);
router.route("/verifyotp").post(verifyOtp);
router.route("/rerequestotp").post(reRequestOtp);
router.route("/newuser").post(registerUser);
router.route("/getallusersname").get(getAllUserNames);

export default router;
