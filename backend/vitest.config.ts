import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
    alias: {
      '#/application': path.resolve('.', 'src/application'),
      '#/domain': path.resolve('.', 'src/domain'),
      '#/infrastructure': path.resolve('.', 'src/infrastructure'),
    },
  },

  test: {
    globals: true,
    environment: 'node',

    setupFiles: ['./tests/setup.ts'],

    include: ['tests/**/*.spec.ts', 'tests/**/*.test.ts'],

    coverage: {
      provider: 'v8',

      reporter: ['text', 'json', 'html'],

      include: ['src/**/*.ts'],

      exclude: [
        'src/infrastructure/persistence/prisma/generated/**/*',
        'src/index.ts',
        'src/infrastructure/config/**',
        'src/infrastructure/http/server.ts',
        'src/infrastructure/services/**',
        'src/infrastructure/http/middleware/limiter.ts',
        'src/application/interfaces/**',
        '**/*.d.ts',
        'tests/**',
      ],

      thresholds: {
        lines: 80,
        statements: 80,
        functions: 80,
        branches: 80,
      },
    },
  },
});
