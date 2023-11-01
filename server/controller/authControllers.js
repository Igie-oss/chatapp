import prisma from "../lib/prisma.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const audience = process.env.CLIENT_URL;
const issuer = process.env.SERVER_URL;

const logIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const foundUser = await prisma.users.findUnique({
      where: { email },
    });

    if (!foundUser) {
      return res.status(401).json({
        message: "Your password or email was a mismatch in our records!",
      });
    }

    const comparePass = await bcrypt.compare(password, foundUser.password);

    if (!comparePass) {
      return res.status(401).json({
        message: "Your password or email was a mismatch in our records!",
      });
    }

    const accessToken = jwt.sign(
      {
        UserInfo: {
          userId: foundUser.userId,
          userName: foundUser.userName,
        },
        aud: `${audience}`,
        iss: `${issuer}`,
      },
      process.env.ACCESS_TOKEN_SECRET
    );
    const refreshToken = jwt.sign(
      {
        userId: foundUser.userId,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json({ accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
  try {
    const refreshToken = cookies.jwt;
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Forbidden!" });
        }
        const userId = decoded.userId;
        const foundUser = await prisma.users.findUnique({
          where: { userId },
          select: {
            userId: true,
            userName: true,
          },
        });
        if (!foundUser) {
          res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
          });
          return res.status(401).json({ message: "Cookie cleared!" });
        }
        const accessToken = jwt.sign(
          {
            UserInfo: {
              userId: foundUser.userId,
              userName: foundUser.userName,
            },
            aud: `${audience}`,
            iss: `${issuer}`,
          },
          process.env.ACCESS_TOKEN_SECRET
        );
        return res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

const logOut = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  return res.json({ message: "Cookie cleared!" });
});

const redirect = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }
  return res.status(200).json({ message: "Has cookie" });
});
export { logIn, refresh, logOut, redirect };
