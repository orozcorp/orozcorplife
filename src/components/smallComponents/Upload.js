"use client";
import { postData } from "@/lib/helpers/getData";
import { useRef, useState } from "react";
import ProgressBar from "./ProgressBar";
import { uploadFiles } from "s3up-client";
export default async function Upload({
  setFoto,
  location,
  user,
  heading,
  accept,
}) {
  const [percent, setPercent] = useState(0);
  const [key, setKey] = useState("");
  const inputFile = useRef(null);
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
      const { data } = sign;
      const { signFile } = data;
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
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  function uploadImage() {
    const Ogfile = inputFile.current.files[0];
    setKey(`orozcorp/${user}/${location}/${Date.now()}-${Ogfile.name}`);
    uploadFiles(inputFile.current.files, {
      signer: Sign,
      onProgress: (state) => {
        setFoto(state.list[0].url);
        setPercent(state.percent());
      },
    });
  }

  return (
    <div style={{ width: "100%", margin: "8px" }}>
      <label htmlFor={heading}>{heading}</label>
      <input
        className="border border-gray-300 rounded-md p-2 w-full mt-2"
        type="file"
        ref={inputFile}
        onChange={uploadImage}
        accept={accept}
      />
      {percent > 0 && <ProgressBar completed={percent} />}
    </div>
  );
}
