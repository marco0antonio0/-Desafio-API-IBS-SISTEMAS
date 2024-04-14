# Desafio API - IBS SISTEMAS

Este projeto, desenvolvido em NestJS, implementa uma API REST para gerenciar registros de pessoas, permitindo operações CRUD (Create, Read, Update, Delete). Cada registro contém informações como nome, sexo, data de nascimento, estado civil e endereços. A segurança é garantida por meio de autenticação e autorização de usuários.

### Desafio Proposto

O objetivo deste desafio é desenvolver uma API REST em Node.js que permita a realização de operações CRUD em registros de pessoas, com autenticação de usuários para acesso à API.

### Tecnologias Utilizadas

- **NestJS**: Framework Node.js para construir aplicações de servidor eficientes e escaláveis.
- **MariaDB**: Sistema de gerenciamento de banco de dados SQL.
- **Docker**: Plataforma para desenvolver, enviar e executar aplicações em containers.
- **Swagger**: Ferramenta para documentação de APIs REST.

## Como Executar

### Pré-requisitos

- Docker instalado
- Docker Compose instalado
- Portas 3306 (MariaDB), 3000 (API NestJS), e 8080 (phpMyAdmin) disponíveis

### Instruções

1. Clone este repositório e navegue até a pasta do projeto.

    ```curl
    git clone https://github.com/marco0antonio0/Desafio-API-IBS-SISTEMAS
    ```

2. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto com as seguintes variáveis:

    ```env
    HOSTPROD=localhost
    USERPROD=root
    PASSWORDPROD="Example1_5MGvTMcjwsEAed3"
    DATABASEPROD=mydb
    SECRETTOKEN="Example2_5MGvTMcjwsEAed3"
    PORT=3000
    ```

3. Execute o seguinte comando para iniciar todos os serviços definidos no Docker Compose:

    ```sh
    docker-compose up -d
    ```

4. A API estará acessível em `http://localhost:3000`, phpMyAdmin em `http://localhost:8080`, e o banco de dados MariaDB na porta 3306.

## Docker Compose

O `docker-compose.yml` define três serviços principais:

- **node-rest-api**: Container customizado para executar a aplicação NestJS.
- **mariadb**: Banco de dados MariaDB para persistência de dados.
- **phpmyadmin**: Interface web para gerenciar o banco de dados MariaDB.

Os dados do banco de dados são persistentes e armazenados localmente na pasta `mariadb_data`.

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
