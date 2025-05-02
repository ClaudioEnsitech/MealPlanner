import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    @ApiOperation({ summary: 'Se créer un compte' })
    @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès' })
    signup(
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        return this.authService.signup(email, password)
    }

    @Post('login')
    @ApiOperation({ summary: 'Se connecter à un compte' })
    @ApiResponse({ status: 200, description: 'Utilisateur connecté' })
    login(
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        return this.authService.login(email, password)
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    @ApiOperation({ summary: 'Se déconnecter' })
    @ApiResponse({ status: 200, description: 'Déconnexion réussie' })
    logout() {
        return this.authService.logout()
    }
}
