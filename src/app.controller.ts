import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggingService } from './common/logging/logging.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly loggingService: LoggingService,
  ) {}

  @Get()
  getHello(): string {
    this.loggingService.log('Hello endpoint accessed', 'AppController');
    return this.appService.getHello();
  }

  @Get('test-uncaught')
  testUncaught(): string {
    setTimeout(() => {
      throw new Error('Uncaught exception test');
    }, 100);
    return 'Check logs in 100ms';
  }

  @Get('test-rejection')
  testRejection(): string {
    Promise.reject(new Error('Unhandled rejection test'));
    return 'Check logs for unhandled rejection';
  }
}
