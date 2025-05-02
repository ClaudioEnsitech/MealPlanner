import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiOperation({ summary: 'Point d\'entrée' })
  @ApiResponse({ status: 200, description: 'l\'API tourne bien !' })
  getHello(): object {
    return {
      message: 'Bienvenue sur l’API Meal Planner 🍽️',
      docs: '/api',
      status: 'OK',
      timestamp: new Date().toISOString(),
    };
  }

}
