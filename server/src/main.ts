import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get config service
  const configService = app.get(ConfigService);

  //cors configuration
  app.enableCors({
    origin: configService.get('FRONTEND_URL') || 'http://localhost:5173',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Serenity Telemedicine API')
    .setDescription('API documentation for Serenity telemedicine platform')
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('consultations', 'Consultation management')
    .addTag('messages', 'Messaging system')
    .addTag('photos', 'Photo management and comparison')
    .addTag('notifications', 'Notification system')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  //Global prefix
  app.setGlobalPrefix('api');

  // Increase payload size for file uploads
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));

  const port = configService.get('PORT') || 3000;
  await app.listen(port);

  console.log(
    `📚 Swagger docs available at: http://localhost:${port}/api/docs`,
  );
  console.log(`🚀 Server is running on: http://localhost:${port}`);
  console.log(`📚 API docs available at: http://localhost:${port}/api`);

  // await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
