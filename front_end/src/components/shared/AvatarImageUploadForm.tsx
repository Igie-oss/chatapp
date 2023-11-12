import { DialogTrigger, DialogFooter} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import { BsImage } from "react-icons/bs";
import { customAxios } from "@/lib/helper";
import { EStatus } from "../registerSection/RegisterForm";
import BtnsLoaderSpinner from "./loader/BtnLoader";
import { useQueryClient } from "react-query";
type Props = {
  id: string;
};

export default function AvatarImageUploadForm({ id }: Props) {
  const inputImgRef = useRef<HTMLInputElement | null>(null);
  const [imageData, setImageData] = useState<any>(null);
  const [preview, setPreview] = useState<any>(null);
  const [status, setStatus] = useState<TFormStatus | null>(null);
const queryClient = useQueryClient()
  const handleInput = (e: any) => {
    const file = e.target.files[0];
    setImageData(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id || !imageData) return;
    const formUploadData = new FormData();
    formUploadData.append("avatarUpload", imageData);
    formUploadData.append("id", id);
    setStatus({ status: EStatus.IS_LOADING });
    customAxios("/images/uploadavatar", {
      method: "POST",
      headers: { "content-type": "multipart/form-data" },
      data: formUploadData,
    })
      .then((res) => {
        if (res?.status === 200) {
          setStatus({
            status: EStatus.IS_SUCCESS,
            message: "Avatar change successfully!",
          });
          queryClient.invalidateQueries({queryKey:`user_avatar_${id}`})
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus({
          status: EStatus.IS_ERROR,
          message: "Failed to upload file",
        });
      })
  };
  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="w-full flex flex-col items-center py-2"
    >
      <h1 className="text-lg font-semibold px-4 py-2 mb-5 bg-secondary border rounded-md">
        Change Avatar
      </h1>
      {status?.status === EStatus.IS_ERROR ? (
        <p className="text-sm text-destructive my-5 px-3 py-2 border bg-secondary/50 border-destructive">
          {status?.message}
        </p>
      ) : null}
      {status?.status === EStatus.IS_SUCCESS ? (
        <p className="text-sm my-5 px-3 py-2 border bg-secondary/50 border-border">
          {status?.message}
        </p>
      ) : null}
      {!preview ? (
        <button
          title="Add image"
          type="button"
          disabled={status?.status === EStatus.IS_LOADING}
          onClick={() => inputImgRef?.current?.click()}
        >
          <BsImage className="w-28 h-32 pointer-events-none text-muted-foreground" />
        </button>
      ) : (
        <>
          <img
            alt="Preview"
            src={preview}
            className="object-cover w-32 h-40 rounded-md overflow-hidden"
          />
          <Button
            title="Add image"
            type="button"
            disabled={status?.status === EStatus.IS_LOADING}
            onClick={() => inputImgRef?.current?.click()}
            className="text-sm font-semibold px-4 py-2 mt-2 bg-primary/50 text-white border rounded-md"
          >
            Choose another
          </Button>
        </>
      )}
      <input
        ref={inputImgRef}
        id="img_input"
        accept=".jpg,.jpeg,.png"
        type="file"
        onChange={handleInput}
        className="hidden"
      />
      <DialogFooter className="mt-5">
        <DialogTrigger
          title="Cancel"
          type="button"
          disabled={status?.status === EStatus.IS_LOADING}
          className="bg-secondary h-full w-40 rounded-md"
        >
          Cancel
        </DialogTrigger>
        <Button
          type="submit"
          disabled={status?.status === EStatus.IS_LOADING}
          className="w-40 relative"
        >
          {status?.status === EStatus.IS_LOADING ? (
            <BtnsLoaderSpinner />
          ) : (
            "Save"
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}
