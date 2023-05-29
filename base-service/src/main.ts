import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prefix = '/api/message-service';

  app.enableCors({ origin: '*' });
  app.setGlobalPrefix(prefix);

  const config = new DocumentBuilder()
    .setTitle('Message Service API')
    .setDescription('Message Service API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${prefix}/swagger`, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(+process.env.PORT || 5003);
  console.log('MessageService is running');
}
bootstrap();
