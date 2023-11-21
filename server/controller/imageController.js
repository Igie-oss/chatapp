import prisma from "../lib/prisma.js";
import asycnHandler from "express-async-handler";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
dotenv.config();
import multer from "multer";
import { fileURLToPath } from "url";
import sharp from "sharp";
import fs from "fs";
import { promises as fsPromises } from "fs";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const acceptMimetype = ["image/jpeg", "image/png"];
const destinationPath = path.join(__dirname, "..", "uploads");

//? MULTER
const imageData = {
  fileName: "",
  filePath: "",
  mimetype: "",
};

const storageFiles = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      if (!fs.existsSync(destinationPath)) {
        await fsPromises.mkdir(destinationPath);
      }
      cb(null, destinationPath);
    } catch (err) {
      console.log(err);
      cb(err, null);
    }
  },
  filename: (req, file, cb) => {
    const customName = `${Math.round(
      Math.random() * 5000
    )}${uuid()}${path.extname(file.originalname)}`;
    const filePath = `${destinationPath}/${customName}`;
    imageData.fileName = file.originalname;
    imageData.filePath = filePath;
    imageData.mimetype = file.mimetype;

    cb(null, customName);
  },
  fileFilter: (req, file, cb) => {
    if (
      !file.originalname.match(/\.(jpg|jpeg|png)$/i) ||
      !acceptMimetype.includes(file.mimetype)
    ) {
      return cb(new Error("Only .docx and .pdf files are allowed!"));
    }
    cb(null, true);
  },
});

const uploadImage = multer({
  limits: {
    fieldSize: 2024 * 2024 * 3,
  },
  storage: storageFiles,
  onError: function (err, next) {
    console.log(err);
    fs.unlink(`${imageData.filePath}`, function (err) {
      if (err) {
        console.log(err);
      }
    });
    return res.status(500).json({ message: "Failed to upload files!" });
  },
});

const sharpFn = (imageData) => {
  sharp(fs.readFileSync(`${imageData.filePath}`))
    .resize(500, 500)
    .toFormat("png", { palette: true })
    .toFile(`${imageData.filePath}`, (err, info) => {
      if (err) {
        console.log("Sharp Error: ", err);
        if (fs.existsSync(imageData.filePath)) {
          fs.unlink(`${imageData.filePath}`, function (err) {
            if (err) {
              console.log(err);
            }
          });
        }
        return res.status(500).json({ message: "Failed to upload Image!" });
      }
    });
};

const imageAvatarUpload = asycnHandler(async (req, res) => {
  const { id } = req.body;
  try {
    sharpFn(imageData);
    const uploadData = {
      avatarId: id,
      imgData: {
        data: fs.readFileSync(`${imageData.filePath}`),
        mimetype: imageData.mimetype,
      },
    };

    const foundIdImage = await prisma.avatar.findFirst({
      where: { avatarId: id },
    });

    if (foundIdImage?.avatarId) {
      await prisma.avatar.delete({
        where: { avatarId: foundIdImage.avatarId },
      });
    }
    const saveImage = await prisma.avatar.create({ data: uploadData });

    if (saveImage?.avatarId) {
      if (fs.existsSync(imageData.filePath)) {
        fs.unlink(`${imageData.filePath}`, function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
    }

    return res.status(200).json({ data: saveImage?.avatarId });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

const getImageById = asycnHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const foundImage = await prisma.avatar.findUnique({
      where: { avatarId: id },
    });

    if (!foundImage?.avatarId) {
      return res.status(404).json({ message: "Image not found!" });
    }

    return res.status(200).json(foundImage);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

const handleSendImage = asycnHandler(async (req, res) => {
  try {
    sharpFn(imageData);
    const uploadData = {
      avatarId: uuid(),
      imgData: {
        data: fs.readFileSync(`${imageData.filePath}`),
        mimetype: imageData.mimetype,
      },
    };

    const saveImage = await prisma.avatar.create({
      data: uploadData,
    });

    if (saveImage?.avatarId) {
      if (fs.existsSync(imageData.filePath)) {
        fs.unlink(`${imageData.filePath}`, function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
    }

    return res.status(200).json({ data: saveImage?.avatarId });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong!" });
  }
});
export { uploadImage, imageAvatarUpload, getImageById ,handleSendImage};