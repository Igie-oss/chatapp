import { useEffect, useMemo, useState } from "react";

const useConvertBytesToUrl = (fileData: TAvatarData) => {
	const [blob, setBlob] = useState<string | null>(null);

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
	}, [fileUrl, blob]);
	return fileUrl;
};

export default useConvertBytesToUrl;
