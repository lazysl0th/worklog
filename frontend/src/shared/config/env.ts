import z from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.url().default('http://localhost:3001'),
});

export const env: z.infer<typeof envSchema> = envSchema.parse(import.meta.env);
