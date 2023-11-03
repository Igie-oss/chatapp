import prisma from "../../lib/prisma.js";
const sendNewMessage = ({ message, members, isGroup }) => {
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

      if (!foundChannel?.channelId) {
        await prisma.channel.create({
          data: {
            channelId: message.channelId,
            isGroup: isGroup,
            members: members,
          },
        });
      }
      const createMessage = await prisma.messages.create({ data: message });

      return resolve({ data: { ...createMessage, members: members } });
    } catch (error) {
      console.log(error);
      return reject({ error: "Something went wrong!" });
    }
  });
};
export default sendNewMessage;
