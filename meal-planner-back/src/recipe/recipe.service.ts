import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { Prisma, Recipe, Tag } from '@prisma/client'
import { UpdateRecipeDto } from './dto/update-recipe.dto'

@Injectable()
export class RecipeService {
  [x: string]: unknown
  constructor(private prisma: PrismaService) { }

  // créer une recette
  async create(data: CreateRecipeDto): Promise<Recipe> {
    const {
      tags,
      ...rest
    }: { tags?: string[]; title: string; description: string; type: string; userId: number } = data

    const createdRecipe = await this.prisma.recipe.create({
      data: rest,
    })

    if (tags?.length) {
      for (const tagName of tags) {
        const tag = (await this.prisma.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName },
        })) satisfies Tag

        await this.prisma.recipeTag.create({
          data: {
            recipeId: createdRecipe.id,
            tagId: tag.id,
          },
        })
      }
    }

    return this.prisma.recipe.findUniqueOrThrow({
      where: { id: createdRecipe.id },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })
  }

  // get toutes les recettes
  async findAll(): Promise<Recipe[]> {
    return this.prisma.recipe.findMany({})
  }

  // get recettes by id
  async findOne(id: number) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
    })

    if (!recipe) {
      throw new NotFoundException(`La recette avec l'id : ${id} n'existe pas`)
    }

    return recipe
  }

  // Modifier une recette
  async update(id: number, data: UpdateRecipeDto): Promise<Recipe> {
    return this.prisma.recipe.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        type: data.type,
      },
    })
  }

  // Supprimer une recette
  async remove(id: number): Promise<Recipe> {
    return this.prisma.recipe.delete({
      where: { id },
    })
  }

  // Recherche par mot-clé (title ou description) et type
  async searchRecipes(query: string, skip: number, limit: number, type?: string): Promise<Recipe[]> {
    if (!query) {
      throw new BadRequestException(`Le champ "query" est requis.`)
    }

    const whereCondition: Prisma.RecipeWhereInput = {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    }

    if (type) {
      whereCondition.AND = [{ type: { equals: type } }]
    }

    const results = await this.prisma.recipe.findMany({
      where: whereCondition,
      skip,
      take: limit,
    })

    if (!results.length) {
      throw new NotFoundException(
        `Aucune recette trouvée pour "${query}"${type ? ` avec le type "${type}"` : ''}.`,
      )
    }

    return results
  }

  // Recherche uniquement par type
  async searchByType(skip: number, limit: number, type: string): Promise<Recipe[]> {
    if (!type) {
      throw new BadRequestException('Le type est requis.')
    }

    const results = await this.prisma.recipe.findMany({
      where: { type: { equals: type } },
      skip,
      take: limit,
    })

    if (!results.length) {
      throw new NotFoundException(`Aucune recette trouvée avec le type "${type}".`)
    }

    return results
  }
}
