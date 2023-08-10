import { mergeTypeDefs } from "@graphql-tools/merge";
import { responses } from "./types/responses";
import { uploadSchema } from "./types/uploadAndOther";
import { usersSchema } from "./types/users";
import { resume } from "./types/resume";
import { portfolio } from "./types/portfolio";
import { prompts } from "./types/prompts";
import { article } from "./types/articles";
const schema = mergeTypeDefs([
  responses,
  uploadSchema,
  resume,
  usersSchema,
  portfolio,
  prompts,
  article,
]);
export default schema;
