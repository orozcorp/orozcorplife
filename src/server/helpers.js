"use server";
import { S3Up } from "s3up-server";

export async function signFile({ key }) {
  const s3Up = new S3Up({
    accessKeyId: process.env.S3_ACCESSKEYID,
    secretAccessKey: process.env.S3_SECRETACCESSKEY,
    bucket: process.env.S3_BUCKET,
    region: process.env.S3_REGION,
  });
  const newKey = { key };
  try {
    const sign = await s3Up.signUpload(newKey);
    return {
      url: sign.url.slice(0, -1),
      fields: {
        key: sign.fields.key,
        bucket: sign.fields.bucket,
        Policy: sign.fields.Policy,
        xAmzAlgorithm: sign.fields["X-Amz-Algorithm"],
        xAmzCredential: sign.fields["X-Amz-Credential"],
        xAmzDate: sign.fields["X-Amz-Date"],
        xAmzSignature: sign.fields["X-Amz-Signature"],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      url: null,
      fields: {},
    };
  }
}
