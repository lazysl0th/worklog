import type { InjectionToken } from 'tsyringe';
import { z } from 'zod';

export enum NodeEnv {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export const envSchema = z.object({
  NODE_ENV: z.enum(NodeEnv),
  DATABASE_URL: z.url(),
  PORT: z.coerce.number(),
  SHUTDOWN_SERVER_TIMEOUT: z.coerce.number(),
});

export type TConfig = z.infer<typeof envSchema>;

export type TPort = Pick<TConfig, 'PORT'>;

export const CONFIG_TOKEN: InjectionToken<TConfig> = Symbol('CONFIG');
