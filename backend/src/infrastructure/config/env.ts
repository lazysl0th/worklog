import { envSchema, NodeEnv, type TConfig } from '../../../dist/application/interfaces/IConfig.js';

const env = {
  NODE_ENV: process.env.NODE_ENV ?? NodeEnv.Development,
  PORT: process.env.PORT ?? 3001,
  SHUTDOWN_SERVER_TIMEOUT: process.env.SHUTDOWN_SERVER_TIMEOUT ?? 10000,
  DATABASE_URL:
    process.env.DATABASE_URL ??
    'postgresql://postgres:root@localhost:5433/worklog_db?schema=public',
  FRONTEND_URL: process.env.FRONTEND_URL ?? 'http://localhost:3000',
};

const config: TConfig = envSchema.parse(env);

export default config;
