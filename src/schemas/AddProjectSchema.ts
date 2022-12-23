import { z } from "zod";

const addProjectSchema = z.object({
  title: z.string().min(1, "Title field is required"),
  client: z.string().min(1, "Client field is required"),
  deadline: z.date(),
});

export type AddProjectSchema = z.infer<typeof addProjectSchema>;

export default addProjectSchema;
