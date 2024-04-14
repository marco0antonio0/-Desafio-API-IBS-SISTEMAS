# Desafio API - IBS SISTEMAS

Este projeto, desenvolvido em NestJS, implementa uma API REST para gerenciar registros de pessoas, permitindo operações CRUD (Create, Read, Update, Delete). Cada registro contém informações como nome, sexo, data de nascimento, estado civil e endereços. A segurança é garantida por meio de autenticação e autorização de usuários.

### Desafio Proposto

O objetivo deste desafio é desenvolver uma API REST em Node.js que permita a realização de operações CRUD em registros de pessoas, com autenticação de usuários para acesso à API.

### Tecnologias Utilizadas

- **NestJS**: Framework Node.js para construir aplicações de servidor eficientes e escaláveis.
- **MySQL-Hostinger**: Sistema de gerenciamento de banco de dados SQL.
- **Swagger**: Ferramenta para documentação de APIs REST.

## Como Executar

### Instruções

1. Consulte os [endpoints](#endpoints-de-autenticação)

2. faça um acesso ao endereço [https://api-desafio-d87c8746780f.herokuapp.com/api](https://api-desafio-d87c8746780f.herokuapp.com/api)

## Documentação da API

A documentação da API é detalhada abaixo, incluindo informações sobre autenticação e os endpoints disponíveis.

### Autenticação

Todos os endpoints, exceto `/auth/login`, `/auth/register` e `/auth/check-token`, requerem autenticação. O token JWT deve ser incluído no cabeçalho `Authorization` das requisições, no formato `Authorization: Bearer YourTokenJWT`.

#### Endpoints de Autenticação

- **POST /auth/login**
  - **Descrição**: Realiza o login do usuário.
  - **Permissão de Acesso**: Todos.
  - **Dados de Entrada**: `email`, `senha`.
- **POST /auth/register**
  - **Descrição**: Registra um novo usuário.
  - **Permissão de Acesso**: Todos.
  - **Dados de Entrada**: `nome`, `senha`, `email`.
- **POST /auth/check-token**
  - **Descrição**: Valida o token JWT fornecido.
  - **Permissão de Acesso**: Todos.
  - **Dados de Entrada no Headers**: `Authorization: Bearer YourTokenJWT`.

#### Endpoints de Gerenciamento de Usuários e Fichas

- **GET /user/id**
  - **Descrição**: Consulta todas as fichas de usuários.
  - **Permissão de Acesso**: Somente SuperAdmin.
  
- **GET /user/search-id**
  - **Descrição**: Consulta uma única ficha de usuário pelo ID.
  - **Permissão de Acesso**: SuperAdmin, Proprietário.
  - **Parâmetro na URL**: `id`.
  
- **GET /user/search-email**
  - **Descrição**: Consulta uma única ficha de usuário pelo e-mail.
  - **Permissão de Acesso**: SuperAdmin, Proprietário.
  - **Parâmetro na URL**: `email`.
  
- **POST /user/create-ficha**
  - **Descrição**: Cria uma nova ficha de usuário.
  - **Permissão de Acesso**: SuperAdmin, Proprietário.
  - **Dados de Entrada**: `nome`, `sexo`, `data de nascimento`, `estado civil`, `endereços`.
  
- **DELETE /user/delete-ficha**
  - **Descrição**: Deleta a ficha de um usuário pelo e-mail.
  - **Permissão de Acesso**: SuperAdmin, Proprietário.
  - **Parâmetro na URL**: `email`.
  
- **PUT /user/update-ficha**
  - **Descrição**: Atualiza a ficha de um usuário.
  - **Permissão de Acesso**: SuperAdmin, Proprietário.
  - **Dados de Entrada**: `nome`, `sexo`, `data de nascimento`, `estado civil`, `endereços`.
  - **Parâmetro na URL**: `email`.
