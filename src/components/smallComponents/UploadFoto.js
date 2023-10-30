"use client";
import { useRef, useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import { postData } from "@/lib/helpers/getData";
import { uploadFiles } from "s3up-client";

export default function UploadFoto({ setFoto, percent, setPercent }) {
  const [key, setKey] = useState("");

  const inputFile = useRef(null);

  useEffect(() => {
    if (key) {
      async function signUpload() {
        if (!key) return null;
        return await postData({
          query: `
              mutation Mutation($key: String!) {
              signFile(key: $key) {
                url
                fields {
                  key
                  bucket
                  xAmzAlgorithm
                  xAmzCredential
                  xAmzDate
                  Policy
                  xAmzSignature
                }
              }
            }
          `,
          variables: { key },
        });
      }
      async function Sign() {
        try {
          const sign = await signUpload();
          const { signFile } = sign;
          const newSignFile = {
            url: signFile.url,
            fields: {
              Policy: signFile.fields.Policy,
              key: signFile.fields.key,
              bucket: signFile.fields.bucket,
            },
          };
          newSignFile.fields["X-Amz-Algorithm"] = signFile.fields.xAmzAlgorithm;
          newSignFile.fields["X-Amz-Credential"] =
            signFile.fields.xAmzCredential;
          newSignFile.fields["X-Amz-Date"] = signFile.fields.xAmzDate;
          newSignFile.fields["X-Amz-Signature"] = signFile.fields.xAmzSignature;
          return newSignFile;
        } catch (error) {
          console.log(error);
          throw new Error(error);
        }
      }
      uploadFiles(inputFile.current.files, {
        signer: Sign,
        onProgress: (state) => {
          setFoto(state.list[0].url);
          setPercent(state.percent());
        },
      });
    }
  }, [key, setFoto, setPercent]);

  function uploadImage() {
    const Ogfile = inputFile.current.files[0];
    setKey(`orozcorp/image/${Date.now()}-${Ogfile.name}`);
  }

  return (
    <div style={{ width: "300px", margin: "6px" }}>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="file_input"
      >
        Foto
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        type="file"
        ref={inputFile}
        onChange={uploadImage}
        accept="image/png, image/gif, image/jpeg"
      />
      {percent > 0 && <ProgressBar completed={percent} />}
    </div>
  );
}
