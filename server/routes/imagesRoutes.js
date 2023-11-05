import express from "express";
import verifyJWT from "../middleware/verifyJWT.js";
import {
  uploadImage,
  imageAvatarUpload,
  getImageById,
} from "../controller/imageController.js";

const router = express.Router();
router.use(verifyJWT);

router
  .route("/uploadavatar")
  .post(uploadImage.single("avatarUpload"), imageAvatarUpload);

router.route("/getimagebyid/:id").get(getImageById);

export default router;
