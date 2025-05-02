import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService],
  imports: [AuthModule]
})
export class RecipeModule { }
