import { useEffect } from "react";
import { useAppStore } from "@/services/states/store";
import { socket } from "@/socket";
import Aside from "@/components/ChatBoardComponents/aside/Aside";
import ChatBoxContainer from "@/components/ChatBoardComponents/chatBoardComponents/ChatBoxContainer";
export default function MainContainer() {
  const { userId } = useAppStore((state) => state.user);

  useEffect(() => {
    socket.on("connection", () => {
      console.log("socket connected");
    });
    if (userId) {
      socket.emit("registerUser", userId);
    }
    return () => {
      socket.off("registerUser");
    };
  }, [userId, socket]);

  return (
    <section className="w-screen h-screen flex items-center justify-center p-2">
      <main className="h-full w-full flex relative overflow-x-hidden">
        <Aside />
        <ChatBoxContainer />
      </main>
    </section>
  );
}
