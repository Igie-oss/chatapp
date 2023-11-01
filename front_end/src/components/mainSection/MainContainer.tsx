import { useEffect } from "react";
import { useAppStore } from "@/features/store";
import { socket } from "@/socket";
import Aside from "./aside/Aside";
import ChatBoxContainer from "./chatBox/ChatBoxContainer";
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
    <section className="w-screen h-screen flex items-center justify-center ">
      <main className="h-full w-full flex relative overflow-x-hidden">
        <Aside />
        <ChatBoxContainer />
      </main>
    </section>
  );
}
