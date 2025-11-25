import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title'),
  content: text('content'),
  // 把 authorId 那一行删掉，我们先不做用户关联
});
