import prisma from "../../lib/prisma.js";
const sendNewMessage = ({ message, members, isGroup }) => {
  return new Promise(async (resolve, reject) => {
    if (!message.channelId || !message.content) {
      return resolve({ message: "All field are required!" });
    }
    try {
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

      return resolve({ data: {...createMessage, members:members }});
    } catch (error) {
      console.log(error);
      return reject({ error: "Something went wrong!" });
    }
  });
};
export default sendNewMessage;
