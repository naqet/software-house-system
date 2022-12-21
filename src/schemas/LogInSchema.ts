import { z } from "zod";

const logInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LogInSchema = z.infer<typeof logInSchema>;

export default logInSchema;
