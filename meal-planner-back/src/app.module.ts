import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TagController } from './tag/tag.controller';
import { TagService } from './tag/tag.service';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [PrismaModule, RecipeModule, AuthModule, UserModule, TagModule],
  controllers: [AppController, TagController],
  providers: [AppService, TagService],
})
export class AppModule {}
