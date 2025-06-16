import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
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
    this.loggingService.debug('Debug message test', 'AppController');
    this.loggingService.warn('Warning message test', 'AppController');
    return this.appService.getHello();
  }

  @Get('test-error')
  testError(): string {
    throw new HttpException('This is a test error', HttpStatus.BAD_REQUEST);
  }

  @Get('test-500')
  test500(): string {
    throw new Error('Unexpected error for testing');
  }
}
