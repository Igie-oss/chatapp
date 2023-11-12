import express from "express";
import verifyJWT from "../middleware/verifyJWT.js";
import {
  getUserChannels,
  getChannel,
  getChannelMessages,
  getChannelByMembers,
  createGroup,
  getUserGroupChannel,
  changeGroupName,
} from "../controller/channelControllers.js";
const router = express.Router();
router.use(verifyJWT);

router.route("/userchannels/:userId").get(getUserChannels);

router.route("/:channelId").get(getChannel);

router.route("/channelmessage/:channelId").get(getChannelMessages);

router.route("/getchannelbymembers").post(getChannelByMembers);

router.route("/creatgroup").post(createGroup);

router.route("/groupchannel/:userId").get(getUserGroupChannel);

router.route("/updategroupname").patch(changeGroupName);
export default router;
