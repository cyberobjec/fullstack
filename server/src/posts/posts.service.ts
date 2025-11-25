import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../db/schema';
import { DRIZZLE } from '../db/database/database.module';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @Inject(DRIZZLE)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const [created] = await this.db
      .insert(schema.posts)
      .values(createPostDto)
      .returning();

    return created;
  }

  findAll(): Promise<Post[]> {
    return this.db.select().from(schema.posts);
  }

  async findOne(id: number): Promise<Post> {
    const [post] = await this.db
      .select()
      .from(schema.posts)
      .where(eq(schema.posts.id, id))
      .limit(1);

    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    }

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const updateData = Object.fromEntries(
      Object.entries(updatePostDto).filter(([, value]) => value !== undefined),
    );

    if (Object.keys(updateData).length === 0) {
      return this.findOne(id);
    }

    const [updated] = await this.db
      .update(schema.posts)
      .set(updateData)
      .where(eq(schema.posts.id, id))
      .returning();

    if (!updated) {
      throw new NotFoundException(`Post #${id} not found`);
    }

    return updated;
  }

  async remove(id: number): Promise<Post> {
    const [deleted] = await this.db
      .delete(schema.posts)
      .where(eq(schema.posts.id, id))
      .returning();

    if (!deleted) {
      throw new NotFoundException(`Post #${id} not found`);
    }

    return deleted;
  }
  async removeAll(): Promise<{ message: string; deletedCount: number }> {
    const deleted = await this.db
      .delete(schema.posts)
      .returning({ id: schema.posts.id });

    return {
      message: 'All posts have been deleted successfully',
      deletedCount: deleted.length,
    };
  }
}
