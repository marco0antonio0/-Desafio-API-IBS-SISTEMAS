# Desafio API - SISTEMAS
![img](https://github.com/marco0antonio0/Desafio-API-SISTEMAS/assets/72234855/9b65289d-976d-4bcf-b4d7-07c63c060e5a)
Este projeto, desenvolvido em NestJS, implementa uma API REST para gerenciar registros de pessoas, permitindo operações CRUD (Create, Read, Update, Delete). Cada registro contém informações como nome, sexo, data de nascimento, estado civil e endereços. A segurança é garantida por meio de autenticação e autorização de usuários.
### Documentação extensa no Swagger
Acesse em [https://api-desafio-d87c8746780f.herokuapp.com/api](https://api-desafio-d87c8746780f.herokuapp.com/api)
### Desafio Proposto

O objetivo deste desafio é desenvolver uma API REST em Node.js que permita a realização de operações CRUD em registros de pessoas, com autenticação de usuários para acesso à API.

### Tecnologias Utilizadas

- **NestJS**: Framework Node.js para construir aplicações de servidor eficientes e escaláveis.
- **MySQL-Hostinger**: Sistema de gerenciamento de banco de dados SQL.
- **Swagger**: Ferramenta para documentação de APIs REST.

## Como Executar

### Instruções

1. Consulte os [endpoints](#endpoints-de-autenticação)

2. faça uma consulta no **swagger docs** acessando o endereço [https://api-desafio-d87c8746780f.herokuapp.com/api](https://api-desafio-d87c8746780f.herokuapp.com/api)

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
 
### Segurança dos dados

No projeto Desafio-FRONT-SISTEMAS, foram implementados vários recursos de segurança para garantir a integridade e proteção dos dados dos usuários. Alguns desses recursos incluem:

**Autenticação com Token JWT**: A autenticação é realizada utilizando tokens JWT (JSON Web Tokens), fornecendo um método seguro e eficiente para autenticar usuários. Isso permite que o usuário seja autenticado de forma segura após o login, e o token JWT é armazenado no cliente para autorizar futuras requisições.

**Controle de Acesso de Usuários**: A API implementa controle de acesso baseado em papéis de usuário, permitindo diferentes níveis de permissões para diferentes tipos de usuários. Por exemplo, certas operações podem ser restritas apenas a superusuários, enquanto outras podem ser acessíveis a todos os usuários autenticados.

**Requisições Seguras**: Todas as requisições feitas à API são protegidas pelo protocolo HTTPS, garantindo que os dados sejam transmitidos de forma segura entre o cliente e o servidor. Além disso, as requisições que exigem autenticação devem incluir o token JWT no cabeçalho Authorization, seguindo as melhores práticas de segurança.

**Documentação Extensa via Swagger**: A API é documentada de forma extensa e detalhada usando o Swagger, uma ferramenta de documentação de API amplamente utilizada. Isso permite que os desenvolvedores compreendam facilmente como interagir com a API, quais endpoints estão disponíveis e quais parâmetros são necessários para cada requisição.

**Validações de Entrada**: A API implementa validações de entrada em todas as requisições para garantir que os dados fornecidos pelos usuários sejam válidos e seguros. Isso ajuda a prevenir ataques de injeção de SQL, XSS (Cross-Site Scripting) e outros tipos de ataques comuns.

### Servidores Hospedados

- O servidor backend da API está hospedado no Heroku.
- O servidor frontend está hospedado no Netlify.
- O servidor DBaaS está hospedado na Hostinger.

Repositório Utilizado:

O repositório utilizado para o projeto foi hospedado no GitHub.

