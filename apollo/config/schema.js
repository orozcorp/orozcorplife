import { mergeTypeDefs } from "@graphql-tools/merge";
import { responses } from "./types/responses";
import { uploadSchema } from "./types/uploadAndOther";
import { usersSchema } from "./types/users";
import { resume } from "./types/resume";
const schema = mergeTypeDefs([responses, uploadSchema, resume, usersSchema]);
export default schema;
