import express from "express";
import loginLimiter from "../middleware/loginLimiter.js";
import {
  logIn,
  logOut,
  refresh,
  redirect,
} from "../controller/authControllers.js";

const router = express.Router();

router.route("/login").post(loginLimiter, logIn);
router.route("/refresh").get(refresh);
router.route("/redirect").get(redirect);
router.route("/logout").post(logOut);

export default router;
