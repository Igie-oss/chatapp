import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { BsImage } from "react-icons/bs";
type Props = {
  status: TFormStatus | null;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  setContentType: Dispatch<SetStateAction<EContentType>>;
};
import { EContentType } from "./InputField";
import { MdOutlineClose } from "react-icons/md";
import { EStatus } from "@/pages/RegisterScreen";
export default function ImageInput({
  status,
  content,
  setContent,
  setContentType,
}: Props) {
  const inputImgRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<any>(null);

  ///!Upload Image to server and the server return a image url and add the url to content before sending the image;

  const handleInput = (e: any) => {
    const file = e.target.files[0];
    setContent(file);
    setContentType(EContentType.IMG_URL);
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (status?.status === EStatus.IS_SUCCESS) {
      setPreview("");
      setContent("");
    }
  }, [status]);

  return (
    <>
      <input
        ref={inputImgRef}
        id="img_input"
        accept=".jpg,.jpeg,.png"
        type="file"
        onChange={handleInput}
        className="hidden"
      />
      {!preview || typeof content === "string" ? null : (
        <div className="absolute h-28 w-24 border rounded-md p-1 border-border bottom-[130%] right-1">
          <img
            title="Preview"
            src={preview}
            className="w-full h-full object-cover rounded-sm"
          />

          <button
            type="button"
            title="remove"
            disabled={status?.status === EStatus.IS_LOADING}
            onClick={() => setContent("")}
            className="absolute -top-5 -right-5 rounded-full p-1 border border-primary bg-background"
          >
            <MdOutlineClose className="w-4 h-4" />
          </button>
        </div>
      )}
      {content?.length ? null : (
        <button
          title="add image"
          type="button"
          onClick={() => inputImgRef?.current?.click()}
          className="p-1 absolute right-1 top-[0.20rem]"
        >
          <BsImage className="w-8 h-8 pointer-events-none text-primary" />
        </button>
      )}
    </>
  );
}
