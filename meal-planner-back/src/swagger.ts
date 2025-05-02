import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
        .setTitle('Meal Planner API')
        .setDescription('API pour gérer recettes, tags et utilisateurs 🍽️')
        .setVersion('1.0.0')
        .addTag('Authentification')
        .addTag('Utilisateurs')
        .addTag('Recettes')
        .addTag('Tags')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);
}