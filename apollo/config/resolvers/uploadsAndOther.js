import { S3Up } from "s3up-server";
export const uploadsResolver = {
  Mutation: {
    sendContact: async (root, { email, name, message }, { db }) => {
      try {
        const input = { email, name, message, status: "Not checked" };
        const insert = await db.collection("Prospectos").insertOne(input);
        return {
          code: 200,
          success: true,
          message: `Se ingreso `,
          data: insert.insertedId,
        };
      } catch (error) {
        console.log(error);
        return {
          code: error.extensions.response.status,
          success: false,
          message: error.extensions.response.body,
        };
      }
    },
    signFile: async (root, { key }, ctx) => {
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
          url: sign.url,
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
    },
  },
};
