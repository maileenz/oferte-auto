import type { MediaFile } from "~/types";

export interface UploaderOptions {
  onProgress?: (progress: number) => void;
}

export const uploader = (
  file: File,
  options?: UploaderOptions
): Promise<MediaFile> =>
  new Promise((response, reject) => {
    const imageTypes: string[] = ["image/jpeg", "image/png", "image/jpg"];
    const allTypes = [...imageTypes, "video/flv", "video/mp4"];

    if (!allTypes.includes(file.type))
      throw new Error("File type not supported");

    const isImage = imageTypes.includes(file.type);

    const hash = isImage ? null : null;

    const url = `https://api.cloudinary.com/v1_1/demo/${
      isImage ? "image" : "video"
    }/upload`;
    const key = "docs_upload_example_us_preset";

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText) as { secure_url: string };
      response({
        url: resp.secure_url,
        hash,
        type: isImage ? "photo" : "video",
      });
    };
    xhr.onerror = (evt) => reject(evt);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        if (options?.onProgress) options.onProgress(Math.round(percentage));
      }
    };

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", key);

    xhr.send(formData);
  });
