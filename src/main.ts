import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  

  //USES NODE_ENV
  const serverConfig = config.get('server');    

  const logger = new Logger('bootstrap');
  const port = process.env.PORT || serverConfig.port;

  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  logger.log(`Application listening on port ${port}`)
}
bootstrap();
