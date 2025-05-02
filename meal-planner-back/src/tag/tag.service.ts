import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Tag, Recipe } from '@prisma/client';
import { UpdateTagDto } from 'src/tag/dto/update-tag.dto';


@Injectable()
export class TagService {
    constructor(private prisma: PrismaService) { }

    // Créer un tag
    async create(name: string): Promise<Tag> {
        return this.prisma.tag.create({
            data: { name },
        });
    }

    // Récupérer tous les tags
    async findAll(): Promise<Tag[]> {
        return this.prisma.tag.findMany();
    }

    // Modifier un tag
    async update(id: number, data: UpdateTagDto): Promise<Tag> {
        return this.prisma.tag.update({
            where: { id },
            data: {
                name: data.name,
            },
        })
    }

    // Supprimer un tag
    async remove(id: number): Promise<Tag> {
        return this.prisma.tag.delete({
            where: { id },
        });
    }

    // Trouver un tag par son nom
    async findByName(name: string): Promise<Tag | null> {
        return this.prisma.tag.findUnique({
            where: { name },
        });
    }

    // Récupérer les recettes associées à un tag
    async findRecipesByTag(name: string): Promise<Recipe[]> {
        const tag = await this.prisma.tag.findUnique({
            where: { name },
            include: {
                recipes: {
                    include: {
                        recipe: {
                            include: {
                                tags: {
                                    include: {
                                        tag: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!tag) {
            throw new Error(`Tag avec le nom "${name}" non trouvé`);
        }
        return tag.recipes.map((recipeTag) => recipeTag.recipe);
    }
}
