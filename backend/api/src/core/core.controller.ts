import { Get, Controller } from '@nestjs/common';

@Controller()
export class CoreController {
  @Get()
  root(): string {
    return 'Welcome to API of MOM based architecture POC';
  }
}
