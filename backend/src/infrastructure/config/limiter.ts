import type { Options } from 'express-rate-limit';

const limiterOptions: Partial<Options> = {
  windowMs: 15 * 60 * 1000,
  max: 100,
};

export default limiterOptions;
