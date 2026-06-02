import rateLimit from 'express-rate-limit';

import limiterOptions from '#/infrastructure/config/limiter.js';

const limiter = rateLimit(limiterOptions);

export default limiter;
