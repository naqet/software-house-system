import { z } from "zod";

const userSettingsSchema = z.object({
  name: z.string().nullish(),
});

export type UserSettingsSchema = z.infer<typeof userSettingsSchema>;

export default userSettingsSchema;
