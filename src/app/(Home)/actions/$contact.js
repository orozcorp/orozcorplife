import { z } from "zod";
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const contact = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email(),
  message: z.string().min(2).max(5000),
  phone: z.string().min(10).max(10).regex(phoneRegex, "Invalid Number!"),
});

export default contact;
