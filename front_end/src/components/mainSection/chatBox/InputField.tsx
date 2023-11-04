import { useEffect, useRef, useState } from "react";
import { asycnEmit } from "@/socket";
import { useAppStore } from "@/features/store";
import { DateTime } from "luxon";
import useEmitTyping from "@/hooks/useEmitTyping";
import useGenerateChannel from "@/hooks/useGenerateChannel";
import uuid from "react-uuid";
import ImageInput from "./ImageInput";
export enum EContentType {
  TEXT = "text",
  IMG_URL = "image_url",
}
export default function InputField() {
  const { channel } = useGenerateChannel();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const [contentType, setContentType] = useState(EContentType.TEXT);
  const user = useAppStore((state) => state.user);
  const { isTyping, handleInput } = useEmitTyping();
  const inputMsgRef = useRef<HTMLTextAreaElement | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content || !channel) return;

    const dateNow: Date = DateTime.now().setZone("Asia/Manila").toJSDate();
    const newMessage: TMessages = {
      channelId: channel.channelId,
      messageId: uuid(),
      senderId: user.userId,
      sendAt: dateNow,
      content: content,
      contentType: contentType,
    };
    setIsLoading(true);
    asycnEmit("sent_new_message", {
      message: newMessage,
      members: channel.members,
      isGroup: channel.isGroup,
      groupName: channel.groupName,
    })
      .then(() => {
        setContent("");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false);
      });
  };

  useEffect(() => {
    inputMsgRef?.current?.focus();
  }, [channel?.channelId]);

  return (
    <div className="w-full h-16 border rounded-md p-1 flex items-center justify-between">
      {isTyping ? <Typing /> : null}
      <form
        onSubmit={handleSubmit}
        className="h-full w-full rounded-md flex px-2 py-1 gap-2 md:gap-5 items-center"
      >
        <div className="h-full w-full bg-secondary relative rounded-md px-2">
          <textarea
            placeholder="Text..."
            ref={inputMsgRef}
            value={typeof content === "object" ? "" : content}
            onChange={(e) => {
              setContentType(EContentType.TEXT);
              setContent(e.target.value);
              handleInput();
            }}
            className="resize-none h-full w-full text-sm outline-none py-2 bg-transparent"
          />
          <ImageInput
            content={content}
            setContent={setContent}
            setContentType={setContentType}
          />
        </div>
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
