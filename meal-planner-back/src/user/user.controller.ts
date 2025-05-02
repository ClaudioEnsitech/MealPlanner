

import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Utilisateurs')
@ApiBearerAuth()
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    @ApiOperation({ summary: 'Récupérer les infos de son profil' })
    @ApiResponse({ status: 200, description: 'Profil utilisateur récupéré' })
    async getMe(@CurrentUser() user: User): Promise<Partial<User>> {
        const me = await this.userService.findById(user.id);

        if (!me) {
            throw new NotFoundException('Utilisateur non trouvé');
        }

        const { id, email, name, createdAt } = me;
        return { id, email, name: name ?? null, createdAt };
    }
}
