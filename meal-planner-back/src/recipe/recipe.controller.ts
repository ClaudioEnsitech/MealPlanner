import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Recipe } from '@prisma/client';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Recettes')
@Controller('recipes')
@UseGuards(JwtAuthGuard)
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) { }

  @Post()
  @ApiOperation({ summary: 'Créer une recette' })
  @ApiResponse({ status: 201, description: 'Recette créée avec succès' })
  create(@Body() dto: CreateRecipeDto) {
    return this.recipeService.create(dto);
  }

  @Get('search')
  @ApiOperation({ summary: 'Rechercher une recette par mot clé/type' })
  @ApiResponse({ status: 201, description: 'Recette trouvée' })
  async search(
    @Query('q') query: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('type') type?: string
  ): Promise<Recipe[]> {
    if (!query && !type) {
      throw new NotFoundException('Aucun critère de recherche spécifié');
    }

    const skip = (page - 1) * limit;

    if (!query && type) {
      return this.recipeService.searchByType(skip, limit, type);
    }
    return this.recipeService.searchRecipes(query, skip, limit, type);
  }


  @Get()
  @ApiOperation({ summary: 'Lister toutes les recettes' })
  @ApiResponse({ status: 200, description: 'Liste des recettes' })
  findAll(): Promise<Recipe[]> {
    return this.recipeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une recette par son ID' })
  @ApiResponse({ status: 200, description: 'Recette trouvée' })
  findOne(@Param('id') id: string): Promise<Recipe> {
    return this.recipeService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Modifier une recette' })
  @ApiResponse({ status: 200, description: 'Recette mise à jour' })
  update(
    @Param('id') id: string,
    @Body() data: UpdateRecipeDto,
  ): Promise<Recipe> {
    return this.recipeService.update(+id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une recette' })
  @ApiResponse({ status: 200, description: 'Reecette supprimée' })
  remove(@Param('id') id: string): Promise<Recipe> {
    return this.recipeService.remove(+id);
  }
}
