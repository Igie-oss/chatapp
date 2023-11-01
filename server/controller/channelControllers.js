import prisma from "../lib/prisma.js";
import asycnHandler from "express-async-handler";
import { formatDate } from "../lib/formatDate.js";
const getUserChannels = asycnHandler(async (req, res) => {
  const userId = req.params.userId;
  try {
    const foundChannels = await prisma.channel.findMany({
      where: {
        members: {
          some: { userId },
        },
      },
    });

    if (!foundChannels?.length) {
      return res.status(404).json({ message: "No channel found!" });
    }

    const messagesData = async () => {
      const channelLatestContent = [];

      for (let i = 0; i < foundChannels.length; i++) {
        const latestMessage = await prisma.messages.findFirst({
          where: { channelId: foundChannels[i].channelId },
          orderBy: {
            sendAt: "desc",
          },
        });
        const getChannel = await prisma.channel.findUnique({
          where: { channelId: foundChannels[i].channelId },
        });
        if (latestMessage?.id) {
          channelLatestContent.push({
            ...latestMessage,
            members: getChannel?.members,
            isGroup: getChannel?.isGroup,
            channelName: getChannel?.channelName,
          });
        }
      }
      const sortedData = channelLatestContent.sort(
        (a, b) => formatDate(b.sendAt) - formatDate(a.sendAt)
      );
      return sortedData;
    };

    const data = await messagesData();
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

const getChannel = asycnHandler(async (req, res) => {
  const channelId = req.params.channelId;
  try {
    const foundChanel = await prisma.channel.findFirst({
      where: {
        channelId,
      },
    });
    if (!foundChanel?.channelId) {
      return res.status(404).json({ message: "No channel found" });
    }

    return res.status(200).json(foundChanel);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

const getChannelMessages = asycnHandler(async (req, res) => {
  const channelId = req.params.channelId;
  try {
    const foundMessages = await prisma.messages.findMany({
      where: { channelId },
      orderBy: { sendAt: "asc" },
    });

    if (!foundMessages?.length) {
      return res.status(404).json({ message: "No Messages found" });
    }

    return res.status(200).json(foundMessages);
  } catch (error) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

const getChannelByMembers = asycnHandler(async (req, res) => {
  const members = req.body;
  if (!members.length) {
    return res.status(400).json({ message: "Chat mates required!" });
  }

  try {
    const reversed = [...members].reverse();
    const foundChannel = await prisma.channel.findFirst({
      where: {
        OR: [{ members: members }, { members: reversed }],
      },
    });

    if (!foundChannel?.channelId) {
      return res.status(404).json({ message: "No channel found" });
    }

    return res.status(200).json(foundChannel);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

export { getUserChannels, getChannel, getChannelMessages, getChannelByMembers };
