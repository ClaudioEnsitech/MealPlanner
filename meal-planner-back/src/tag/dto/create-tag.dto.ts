import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTagDto {
    @ApiProperty({
        description: 'Nom du tag',
        example: 'Protéine, junk-food...',
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}
