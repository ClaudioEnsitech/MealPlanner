import { Controller, Post, Get, Param, Delete, Body, Put, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag } from '@prisma/client';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Tags')
@Controller('tags')
@UseGuards(JwtAuthGuard)
export class TagController {
    constructor(private tagService: TagService) { }

    // Ajouter un tag
    @Post()
    @ApiOperation({ summary: 'Créer un tag' })
    @ApiBody({ schema: { example: { name: 'Italien' } } })
    @ApiResponse({ status: 201, description: 'Tag créé avec succès' })
    async create(@Body('name') name: string): Promise<Tag> {
        return this.tagService.create(name);
    }

    // Récupérer tous les tags
    @Get()
    @ApiOperation({ summary: 'Lister tous les tags' })
    @ApiResponse({ status: 200, description: 'Liste des tags' })
    async findAll(): Promise<Tag[]> {
        return this.tagService.findAll();
    }

    @Put(':id')
    @ApiOperation({ summary: 'Mettre à jour un tag' })
    @ApiParam({ name: 'id', type: 'number' })
    @ApiBody({ type: UpdateTagDto })
    update(
        @Param('id') id: string,
        @Body() data: UpdateTagDto,
    ): Promise<Tag> {
        return this.tagService.update(+id, data);
    }

    // Supprimer un tag
    @Delete(':id')
    @ApiOperation({ summary: 'Supprimer un tag par son id' })
    @ApiParam({ name: 'id', type: 'number' })
    async remove(@Param('id') id: string): Promise<Tag> {
        return this.tagService.remove(+id);
    }

    // Récupérer les recettes associées à un tag spécifique
    @Get(':name/recipes')
    @ApiOperation({ summary: 'Récupérer les recettes liées à un tag' })
    @ApiParam({ name: 'name', type: 'string' })
    async findRecipesByTag(@Param('name') name: string) {
        return this.tagService.findRecipesByTag(name);
    }

    // Récupérer un tag par son nom
    @Get(':name')
    @ApiOperation({ summary: 'Récupérer un tag par son nom' })
    @ApiParam({ name: 'name', required: true })
    async findByName(@Param('name') name: string): Promise<Tag | null> {
        return this.tagService.findByName(name);
    }
}
