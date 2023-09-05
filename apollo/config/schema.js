import { mergeTypeDefs } from "@graphql-tools/merge";
import { responses } from "./types/responses";
import { uploadSchema } from "./types/uploadAndOther";
import { usersSchema } from "./types/users";
import { resume } from "./types/resume";
import { portfolio } from "./types/portfolio";
import { prompts } from "./types/prompts";
import { article } from "./types/articles";
import { trabajos } from "./types/trabajos";
const schema = mergeTypeDefs([
  responses,
  uploadSchema,
  resume,
  usersSchema,
  portfolio,
  prompts,
  article,
  trabajos,
]);
export default schema;
