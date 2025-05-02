import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../types/jwt-payload.interface';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext): JwtPayload => {
        const request = context.switchToHttp().getRequest<Request>();
        return request.user as JwtPayload;
    },
);
