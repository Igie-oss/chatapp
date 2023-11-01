import prisma from "../lib/prisma.js";
import asycnHandler from "express-async-handler";

const getUserInfo = asycnHandler(async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required!" });
  }

  try {
    const foundUser = await prisma.users.findUnique({
      where: { userId },
      select: { userId: true, userName: true, email: true },
    });

    if (!foundUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(200).json(foundUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

const getAllUsers = asycnHandler(async (req, res) => {
  try {
    const foundUsers = await prisma.users.findMany();
    return res.status(200).json(foundUsers);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong!" });
  }
});
export { getUserInfo, getAllUsers };
