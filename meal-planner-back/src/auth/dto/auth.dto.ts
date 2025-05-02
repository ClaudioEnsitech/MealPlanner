import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
    @ApiProperty({ example: 'john@example.com', description: 'Adresse email de l’utilisateur' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'strongpassword123', description: 'Mot de passe' })
    @IsString()
    @MinLength(6)
    password: string;
}
