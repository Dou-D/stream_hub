import z from "zod";

export const authResponseSchema = z.object({
  data: z.object({
    access_token: z.string(),
    refresh_token: z.string(),
  }),
  message: z.string(),
  status: z.number(),
});
