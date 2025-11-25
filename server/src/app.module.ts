import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config'; // 引入 ConfigModule
import { DatabaseModule } from './db/database/database.module'; // 引入 DatabaseModule

@Module({
  imports: [
    PostsModule,
    ConfigModule.forRoot({
      isGlobal: true, // 确保全局加载配置
    }),
    DatabaseModule, // 引入数据库模块
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
