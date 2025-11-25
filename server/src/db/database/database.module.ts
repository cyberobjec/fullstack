import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../schema';

export const DRIZZLE = 'DRIZZLE';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'PG_POOL',
      useFactory: (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');

        if (!connectionString) {
          throw new Error('DATABASE_URL is not set in environment variables');
        }

        return new Pool({
          connectionString,
        });
      },
      inject: [ConfigService],
    },
    {
      provide: DRIZZLE,
      useFactory: (pool: Pool): NodePgDatabase<typeof schema> =>
        drizzle(pool, { schema }),
      inject: ['PG_POOL'],
    },
  ],
  exports: [DRIZZLE],
})
export class DatabaseModule {}
