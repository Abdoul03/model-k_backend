import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error('Erreur au démarrage du serveur :', err);
});
