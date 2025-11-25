import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts', // 👈 这里指向我们刚才写的图纸
  out: './drizzle', // SQL 迁移文件的输出目录
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
