import { z } from "zod";

export const EventTypeValidator = z.object({
  title: z.string(),
  color: z.string().optional(),
  durationInMinutes: z.number().int().optional(), // Assuming duration is an integer
  isDefault: z.boolean().default(false),
  active: z.boolean().default(true),
  link: z.string().optional(), // Assuming link is a URL
  description: z.string().optional(),
});

export type EventTypeRequest = z.infer<typeof EventTypeValidator>;
