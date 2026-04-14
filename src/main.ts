import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as os from 'os';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("Model'K Backend API")
    .setDescription(
      "API pour le backend de Model'K qui est une plateforme de couture luxueuse sur mesure. Cette API permet de gérer les utilisateurs, les produits, les commandes et les paiements.",
    )
    .setVersion('1.0')
    .addTag("Model'K")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const desktopPath = join(os.homedir(), 'Desktop', 'modolk_uploads');
  app.useStaticAssets(desktopPath, {
    prefix: '/uploads/',
  });

  app.setGlobalPrefix('api/v1');

  app.enableCors({
    origin: ['http://localhost:8080'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 600,
  });
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error('Erreur au démarrage du serveur :', err);
});
