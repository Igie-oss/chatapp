import prisma from "../lib/prisma.js";
import asycnHandler from "express-async-handler";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { v4 as uuid } from "uuid";
import { dateNow, formatDate } from "../lib/formatDate.js";
import otpEmail from "../lib/mailer/otpMailer.js";
const saltRounds = process.env.SALTROUND;

const requestEmailVerify = asycnHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName | !email | !password) {
    return res.status(400).json({ message: "All field are required!" });
  }
  try {
    const founExistOtp = await prisma.otp.findUnique({ where: { email } });
    if (founExistOtp?.email) {
      await prisma.otp.delete({ where: { email } });
    }

    const duplicateEmail = await prisma.users.findUnique({
      where: { email },
      select: { email: true },
    });

    if (duplicateEmail?.email) {
      return res.status(409).json({ message: "Please provide unique email!" });
    }
    const duplicateUsername = await prisma.users.findUnique({
      where: { userName },
      select: { userName: true },
    });

    if (duplicateUsername?.userName) {
      return res
        .status(409)
        .json({ message: "Please provide unique user name!" });
    }

    const generatedOtp = crypto.randomInt(100000, 999999).toString();
    const generateOtpId = `${uuid()}`;
    const generateUserId = `${uuid()}`;
    const hasPassword = await bcrypt.hash(password, Number(saltRounds));
    const otp = generatedOtp;
    const hasOtp = await bcrypt.hash(otp, Number(saltRounds));

    const makeOtp = {
      otpId: generateOtpId,
      otp: hasOtp,
      email: email,
      createdAt: dateNow(),
    };

    const saveOtp = await prisma.otp.create({ data: makeOtp });

    //send email
    await otpEmail(email, otp);

    const resData = {
      otpId: saveOtp?.otpId,
      userId: generateUserId,
      userName,
      email,
      password: hasPassword,
    };

    return res.status(200).json(resData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

const verifyOtp = asycnHandler(async (req, res) => {
  const { otpId, otp } = req.body;
  if (!otpId | !otp) {
    return res.status(400).json({ message: "All field are required!" });
  }
  try {
    const foundOtp = await prisma.otp.findUnique({ where: { otpId } });
    const dateToday = dateNow();
    const formatOtpDate = formatDate(foundOtp?.createdAt);

    const isExpired =
      (dateToday.getDate() !== formatOtpDate.getDate()) |
      (dateToday.getMinutes() > formatOtpDate.getMinutes() + 5);

    if (isExpired) {
      return res
        .status(400)
        .json({ message: "Otp expired! Please try again!" });
    }

    const compareOtp = await bcrypt.compare(otp, foundOtp?.otp);

    if (!compareOtp) {
      return res.status(400).json({ message: "Invalid Otp!" });
    }

    const toCleanOtp = await prisma.otp.findUnique({ where: { otpId } });
    if (toCleanOtp?.email) {
      await prisma.otp.delete({ where: { otpId } });
    }
    return res.status(200).json({ message: "Otp verified!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

const reRequestOtp = asycnHandler(async (req, res) => {
  const { otpId, email } = req.body;

  if (!otpId | !email) {
    return res.status(400).json({ message: "All field are required!" });
  }

  try {
    const foundOtp = await prisma.otp.findUnique({ where: { otpId } });

    if (foundOtp?.otpId) {
      await prisma.otp.delete({ where: { otpId } });
    }

    const generatedOtp = crypto.randomInt(100000, 999999).toString();
    const generateOtpId = `${uuid()}`;
    const otp = generatedOtp;
    const hasOtp = await bcrypt.hash(otp, Number(saltRounds));

    const makeOtp = {
      otpId: generateOtpId,
      otp: hasOtp,
      email: email,
      createdAt: dateNow(),
    };

    const saveOtp = await prisma.otp.create({ data: makeOtp });

    //send email
    await otpEmail(email, otp);

    return res.status(200).json({ otpId: saveOtp?.otpId });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

const registerUser = asycnHandler(async (req, res) => {
  const {userId, userName, email, password } = req.body;
  if (!userId || !userName || !email || !password) {
    return res.status(400).json({ message: "All field are required!" });
  }

  try {
    const userData = {
      userId: userId,
      userName: userName,
      email: email,
      password: password,
    };

    const createUser = await prisma.users.create({ data: userData });

    if (!createUser) {
      return res.status(205).json({ message: "Failed to register user!" });
    }

    return res.status(201).json({ message: "User register successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

const getAllUserNames = asycnHandler(async (req, res) => {
  try {
    const foundUsersNames = await prisma.users.findMany({
      select: { userName: true },
    });

    return res.status(200).json(foundUsersNames);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

export {
  requestEmailVerify,
  verifyOtp,
  reRequestOtp,
  registerUser,
  getAllUserNames,
};
