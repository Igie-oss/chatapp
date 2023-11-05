import { useEffect, useMemo, useState } from "react";

const useConvertBytesToUrl = () => {
  const [fileData, setFileData] = useState<any>("");
  const [blob, setBlob] = useState<string>("");

  const fileUrl = useMemo(() => {

    if (fileData?.imgData?.data) {
      const stringArray = fileData.imgData.data.data;
      const byteArray = new Uint8Array(stringArray);
      const blob = new Blob([byteArray], { type: fileData.imgData.mimetype });
      return URL.createObjectURL(blob);
    }
    return "";
  }, [fileData]);

  useEffect(() => {
    if (fileUrl) {
      setBlob(fileUrl);
    }
    return () => {
      if (blob) {
        URL.revokeObjectURL(blob);
      }
    };
  }, [fileUrl]);
  return { fileUrl: blob, setFileData };
};

export default useConvertBytesToUrl;
