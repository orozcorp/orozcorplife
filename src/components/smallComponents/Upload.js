import { useRef, useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import { postData } from "@/lib/helpers/getData";
import { uploadFiles } from "s3up-client";

export default function Upload({
  percent,
  setPercent,
  location,
  fileKeys,
  setFileKeys,
}) {
  const inputFile = useRef(null);

  async function signUpload(individualKey) {
    if (!individualKey) return null;
    const result = await postData({
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
      variables: { key: individualKey },
    });
    return result;
  }

  function uploadImage() {
    const files = Array.from(inputFile.current.files);
    const keys = files.map(
      (file) => `orozcorp/trabajos/${location}/${Date.now()}-${file.name}`
    );
    console.log("Generated keys:", keys);
    setFileKeys(keys);
  }

  useEffect(() => {
    async function Sign(individualKey) {
      const sign = await signUpload(individualKey);
      if (sign) {
        const signFile = sign.signFile;
        return {
          url: signFile.url,
          fields: {
            Policy: signFile.fields.Policy,
            key: signFile.fields.key,
            bucket: signFile.fields.bucket,
            "X-Amz-Algorithm": signFile.fields.xAmzAlgorithm,
            "X-Amz-Credential": signFile.fields.xAmzCredential,
            "X-Amz-Date": signFile.fields.xAmzDate,
            "X-Amz-Signature": signFile.fields.xAmzSignature,
          },
        };
      } else {
        throw new Error("Sign returned null or undefined");
      }
    }

    if (fileKeys.length > 0) {
      const uploadPromises = fileKeys.map((individualKey, index) => {
        return new Promise((resolve, reject) => {
          uploadFiles([inputFile.current.files[index]], {
            signer: () => Sign(individualKey),
            onProgress: (state) => {
              setPercent(state.percent());
            },
          })
            .then(resolve)
            .catch(reject);
        });
      });

      Promise.all(uploadPromises)
        .then(() => {
          console.log("All files uploaded successfully");
        })
        .catch((error) => {
          console.log("Error uploading files:", error);
        });
    }
  }, [fileKeys, setPercent]);

  return (
    <div style={{ width: "300px" }}>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="file_input"
      >
        Trabajos
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        type="file"
        ref={inputFile}
        onChange={uploadImage}
        accept="image/png, image/gif, image/jpeg"
        multiple
      />
      {percent > 0 && <ProgressBar completed={percent} />}
    </div>
  );
}
