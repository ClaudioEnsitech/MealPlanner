import { IsString, IsNotEmpty, IsInt, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeDto {
  @ApiProperty({
    description: 'Titre de la recette',
    example: 'Poulet Curry Coco',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Description de la recette',
    example: 'Une recette savoureuse au curry et lait de coco',
    type: String,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'ID de l\'utilisateur créateur de la recette',
    example: 1,
    type: Number,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    description: 'Type de la recette (par exemple, entrée, plat, dessert)',
    example: 'plat',
    type: String,
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Liste des tags associés à la recette (facultatif)',
    example: ['poulet', 'curry'],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
