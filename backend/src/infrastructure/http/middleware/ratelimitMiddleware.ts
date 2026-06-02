import rateLimit from 'express-rate-limit';

import limiterOptions from '#/infrastructure/config/limiter.js';

const rateLimitMiddleware = rateLimit(limiterOptions);

export default rateLimitMiddleware;
