import express from "express";
import verifyJWT from "../middleware/verifyJWT.js";
import {
  getUserInfo,
  getAllUsers,
} from "../controller/usersControllers.js";

const router = express.Router();

router.use(verifyJWT);

router.route("/").get(getAllUsers);
router.route("/info/:userId").get(getUserInfo);

export default router;