import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { createDatabaseConnection, query0, query1 } from './database/database.config';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const corsOptions: CorsOptions = {
    origin: '*', // Permitir solicitações de qualquer origem
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type, Authorization', // Cabeçalhos permitidos
    credentials: true, // Permitir credenciais (como cookies, tokens de autenticação)
    // Você pode adicionar outras opções de configuração aqui, se necessário
  };

  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);

  app.useGlobalPipes(new ValidationPipe());

  const connection = await createDatabaseConnection({
    host: process.env.HOSTPROD,
    user: process.env.USERPROD,
    password: process.env.PASSWORDPROD,
    database: process.env.DATABASEPROD,
  });

  // Executar consulta SQL
  try {
    await connection.execute(query0);
    await connection.execute(query1);
  } catch (error) {
    return;
  } finally {
    // Fechar conexão após a execução da consulta
    await connection.end();
  }

  const config = new DocumentBuilder()
    .setTitle('Documentação API - Desafio API - IBS SISTEMAS')
    .setDescription(
      `
Este projeto consiste no desenvolvimento de uma API REST utilizando o framework NestJS para gerenciar registros de pessoas, permitindo operações de CRUD (Create, Read, Update, Delete) sobre eles. Cada registro inclui informações como nome, sexo, data de nascimento, estado civil e múltiplos endereços, detalhando itens como CEP, endereço, número, complemento, bairro, estado e cidade. Além disso, a API incorpora mecanismos de autenticação de usuário e autorização de acesso às rotas, garantindo a segurança e o controle de acesso aos dados gerenciados. Este projeto foi proposto como um desafio pela empresa IBS SISTEMAS, visando avaliar competências técnicas em desenvolvimento de software, design de APIs e segurança de aplicações.
      \n\nUtilize a token JWT **para poder ter acesso** as rotas =====>\n\n
         clique em authorize e informe o token JWT`,
    )
    .setVersion('1.0')
    .addTag('Login | Registro | Validação de token').addTag('CRUD ficha-usuario').addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(process.env.PORT || 3001);
}
bootstrap();
