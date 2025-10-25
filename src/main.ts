import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from 'package.json';
import { AppModule } from './app.module';

function configSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Assessments API')
    .setDescription('The Assessment API')
    .setVersion(version)
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => console.error(err));
