import { postData } from "@/lib/helpers/getData";
import { useRef, useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import { uploadFiles } from "s3up-client";

async function signUpload(key) {
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
async function Sign(key) {
  try {
    const signPromise = signUpload(key);
    const timeoutPromise = new Promise((resolve) => {
      setTimeout(() => resolve(), 2000); // Wait for 2 seconds
    });
    const sign = await Promise.race([signPromise, timeoutPromise]);

    if (sign) {
      const signFile = sign?.signFile;
      const newSignFile = {
        url: signFile.url,
        fields: {
          Policy: signFile.fields.Policy,
          key: signFile.fields.key,
          bucket: signFile.fields.bucket,
        },
      };
      newSignFile.fields["X-Amz-Algorithm"] = signFile.fields.xAmzAlgorithm;
      newSignFile.fields["X-Amz-Credential"] = signFile.fields.xAmzCredential;
      newSignFile.fields["X-Amz-Date"] = signFile.fields.xAmzDate;
      newSignFile.fields["X-Amz-Signature"] = signFile.fields.xAmzSignature;
      return newSignFile;
    } else {
      // Handle the timeout case here
      // For example, throw an error or return a default value
      throw new Error("Timeout occurred");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
export default function UploadImage({ heading, location, accept, setFoto }) {
  const inputFile = useRef(null);
  const [percent, setPercent] = useState(0);
  const [key, setKey] = useState("");

  async function uploadImage() {
    const Ogfile = inputFile.current.files[0];
    if (!Ogfile) return;
    setKey(`orozcorp/${location}/${Date.now()}-${Ogfile.name}`);
  }
  useEffect(() => {
    if (key) {
      (async () => {
        try {
          const sign = await Sign(key);
          uploadFiles(inputFile.current.files, {
            signer: () => Promise.resolve(sign),
            onProgress: (state) => {
              setFoto(state.list[0].url);
              setPercent(state.percent());
            },
          });
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [key, setFoto]);

  return (
    <div className="relative z-0 w-full mb-6 group">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="file_input"
      >
        {heading}
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        ref={inputFile}
        accept={accept}
        type="file"
        onChange={uploadImage}
      />
      {percent > 0 && <ProgressBar completed={percent} />}
    </div>
  );
}
