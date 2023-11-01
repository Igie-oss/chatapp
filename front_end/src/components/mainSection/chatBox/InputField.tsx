import { useEffect, useRef, useState } from "react";
import { asycnEmit } from "@/socket";
import { useAppStore } from "@/features/store";
import { DateTime } from "luxon";
import useEmitTyping from "@/hooks/useEmitTyping";
import useGenerateChannel from "@/hooks/useGenerateChannel";
import uuid from "react-uuid";
export default function InputField() {
  const { channel } = useGenerateChannel();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const user = useAppStore((state) => state.user);
  const { isTyping, handleInput } = useEmitTyping();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message || !channel) return;

    const dateNow: Date = DateTime.now().setZone("Asia/Manila").toJSDate();
    const newMessage: TMessages = {
      channelId: channel.channelId,
      messageId: uuid(),
      senderId: user.userId,
      sendAt: dateNow,
      content: message,
      contentType: "text",
    };
    setIsLoading(true);
    asycnEmit("sent_new_message", {
      message: newMessage,
      members: channel.members,
      isGroup: channel.isGroup,
      channelName: channel.channelName,
    })
      .then(() => {
        setMessage("");
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    inputRef?.current?.focus();
  }, [channel?.channelId]);

  return (
    <div className="w-full min-h-16 max-h-36 px-2 py-1 flex justify-center relative">
      {isTyping ? <Typing /> : null}
      <form
        onSubmit={handleSubmit}
        className="w-full h-fit border flex items-center  gap-2 px-1  rounded-lg py-1"
      >
        <textarea
          ref={inputRef}
          placeholder="Message..."
          value={message || ""}
          onChange={(e) => {
            setMessage(e.target.value);
            handleInput();
          }}
          className="flex-1  h-fit min-h-12 max-h-full bg-secondary/70 rounded-lg resize-none outline-none  px-2  py-3 text-sm "
        />
        <button
          type="submit"
          title="Send"
          disabled={isLoading}
          className={`bg-primary sendBtn rounded-full !flex !items-center transition-all justify-center ${
            isLoading ? "sending" : ""
          }`}
        >
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
          <span>Send</span>
        </button>
      </form>
    </div>
  );
}

function Typing() {
  return (
    <div className="absolute bottom-[105%] left-5  py-2 px-2 rounded-full flex items-center justify-center gap-1 bg-secondary">
      <span className="w-[0.40rem] h-[0.40rem] rounded-full bg-primary animate-bounce transition-all delay-100" />
      <span className="w-[0.40rem] h-[0.40rem] rounded-full bg-primary animate-bounce transition-all delay-200" />
      <span className="w-[0.40rem] h-[0.40rem] rounded-full bg-primary animate-bounce transition-all delay-300" />
    </div>
  );
}
