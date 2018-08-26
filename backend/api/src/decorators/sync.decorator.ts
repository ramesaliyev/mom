import { createParamDecorator } from '@nestjs/common';

export const Sync = createParamDecorator((data, req) => req.query.hasOwnProperty('sync'));
