import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/database/database.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
