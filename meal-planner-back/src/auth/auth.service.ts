import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    // INSCRIPTION
    async signup(email: string, password: string) {
        const hash = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hash,
            },
        });

        return this.signToken(user.id, user.email);
    }

    // CONNEXION
    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });

        if (!user) throw new UnauthorizedException('Email incorrect');

        const pwMatches = await bcrypt.compare(password, user.password);
        if (!pwMatches) throw new UnauthorizedException('Mot de passe incorrect');

        return this.signToken(user.id, user.email);
    }

    logout() {
        return { message: 'Déconnecté avec succès' }
    }

    // GÉNÉRATION DU TOKEN
    async signToken(
        userId: number,
        email: string,
    ): Promise<{ access_token: string }> {
        const payload = { sub: userId, email };

        const token = await this.jwtService.signAsync(payload);

        return {
            access_token: token,
        };
    }
}
