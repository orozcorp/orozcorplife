import { mergeTypeDefs } from "@graphql-tools/merge";
import { medicosSchema } from "./types/medicos";
import { responses } from "./types/responses";
import { uploadSchema } from "./types/uploadAndOther";
import { usersSchema } from "./types/users";

const schema = mergeTypeDefs([
  responses,
  uploadSchema,
  usersSchema,
  medicosSchema,
]);
export default schema;
