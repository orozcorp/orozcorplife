import { mergeTypeDefs } from "@graphql-tools/merge";
import { responses } from "./types/responses";
import { uploadSchema } from "./types/uploadAndOther";
import { usersSchema } from "./types/users";
import { resume } from "./types/resume";
import { portfolio } from "./types/portfolio";
const schema = mergeTypeDefs([
  responses,
  uploadSchema,
  resume,
  usersSchema,
  portfolio,
]);
export default schema;
