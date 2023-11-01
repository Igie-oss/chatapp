import express from "express";
import verifyJWT from "../middleware/verifyJWT.js";
import {
  getUserChannels,
  getChannel,
  getChannelMessages,
  getChannelByMembers
} from "../controller/channelControllers.js";
const router = express.Router();
router.use(verifyJWT);

router.route("/userchannels/:userId").get(getUserChannels);

router.route("/:channelId").get(getChannel);

router.route("/channelmessage/:channelId").get(getChannelMessages);

router.route("/getchannelbymembers").post(getChannelByMembers);

export default router;
