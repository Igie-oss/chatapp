import prisma from "../../lib/prisma.js";
import { dateNow } from "../../lib/formatDate.js";
const sendNewMessage = ({ message, members, isGroup, groupName }) => {
  return new Promise(async (resolve, reject) => {
    if (!message.channelId || !message.content) {
      return resolve({ message: "All field are required!" });
    }
    try {
      // Get the image Location by from the message.content
      // the response message.content will be the image Id
      if (message?.contentType === "image_url") {
        console.log("Message content is Img");
      }
      const foundChannel = await prisma.channel.findUnique({
        where: { channelId: message.channelId },
      });

      let channelId;

      if (!foundChannel?.channelId) {
        const createChannel = await prisma.channel.create({
          data: {
            channelId: message.channelId,
            isGroup: isGroup,
            groupName: groupName,
            members: members,
            createdAt: dateNow(),
          },
        });
        channelId = createChannel?.channelId;
      } else {
        channelId = foundChannel?.channelId;
      }

      const createMessage = await prisma.messages.create({
        data: {
          ...message,
          channelId: channelId,
        },
      });

      return resolve({ data: { ...createMessage, members: members } });
    } catch (error) {
      console.log(error);
      return reject({ error: "Something went wrong!" });
    }
  });
};
export default sendNewMessage;
