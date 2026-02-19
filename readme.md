# POUSADA-API

API REST de gerenciamento de pousada,
com criação, atualização, exclusão e controle de quartos, reservas e usuários,
desenvolvida com Node.js, Express, MySQL e tratamento de erros robusto.

---

## 🎯 Objetivo do Projeto

Este projeto foi criado com o objetivo de **estudar e aplicar boas práticas
de desenvolvimento de APIs REST**, abordando conceitos como:

- Organização em camadas (controllers, services, models)
- Tratamento e manipulação de erros customizados
- Validação de dados com middlewares
- Padrões de resposta consistentes
- Segurança com autenticação JWT e validação de entrada
- Documentação clara da API com Swagger

O projeto tem foco educacional e de portfólio, demonstrando
uma arquitetura bem estruturada e escalável para sistemas de gestão de pousadas.

---

## 🧱 Tecnologias Utilizadas

- Node.js
- Express
- MySQL
- Sequelize (ORM)
- JWT (JSON Web Tokens)
- bcrypt (hashing de senhas)
- dotenv (variáveis de ambiente)
- Nodemon (desenvolvimento)
- Swagger UI (documentação)
- Git

---

## 🗂️ Estrutura do Projeto

```bash
├── app.js                  # Arquivo principal da aplicação
├── package.json            # Dependências do projeto
├── readme.md               # Documentação do projeto
├── config/
│   └── config.js           # Configurações do banco de dados
├── controller/             # Camada responsável pelas requisições HTTP
│   ├── adminController.js
│   ├── authController.js
│   ├── registerController.js
│   ├── reservationController.js
│   └── roomController.js
├── docs/                   # Documentação Swagger
│   ├── swagger.admin.yml
│   └── swagger.user.yml
├── errors/
│   └── appError.js         # Classe base de erros
├── middlewares/            # Validações e tratamento de erros
│   ├── authMiddleware.js
│   ├── ensureAdminMiddleware.js
│   ├── ensureAuthMiddleware.js
│   ├── errorMiddleware.js
│   ├── rateLimit.js
│   ├── registerMiddleware.js
│   ├── reservationMiddleware.js
│   └── roomMiddleware.js
├── migrations/             # Migrações do banco de dados
├── models/                 # Definição das entidades e conexão do BD
│   ├── index.js
│   ├── reservationModel.js
│   ├── roomModel.js
│   └── useModel.js
├── routes/                 # Definição das rotas da API
│   ├── adminRouter.js
│   └── userRouter.js
├── seeders/                # Seeds para popular o banco
└── services/               # Regras de negócio da aplicação
    ├── adminService.js
    ├── authService.js
    ├── registerService.js
    ├── reservationService.js
    └── roomService.js
```

A estrutura segue o princípio de **separação de responsabilidades**,
facilitando manutenção, testes e evolução do sistema.

---

## 📦 Dependências Utilizadas

### Dependências principais

```json
{
  "bcrypt": "^6.0.0",
  "dotenv": "^17.3.1",
  "express": "^5.2.1",
  "express-rate-limit": "^8.2.1",
  "jsonwebtoken": "^9.0.3",
  "mysql2": "^3.17.2",
  "sequelize": "^6.37.7",
  "swagger-ui-express": "^5.0.1",
  "yamljs": "^0.3.0"
}
```

### Dependências de desenvolvimento

```json
{
  "nodemon": "^3.1.11",
  "sequelize-cli": "^6.6.5"
}
```

---

## ⚙️ Como Rodar o Projeto

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/seu-usuario/pousada-api.git
cd pousada-api
```

### 2️⃣ Instalar as dependências

```bash
npm install
```

### 3️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
PORT=3000
DB_HOST=localhost
DB_USER=usuario
DB_PASSWORD=senha
DB_NAME=pousada_db
DB_PORT=3306
NODE_ENV=development
JWT_SECRET=sua_chave_secreta_jwt
```

### 4️⃣ Configurar o banco de dados

Execute as migrações e seeds:

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### 5️⃣ Iniciar a aplicação

```bash
npm run dev
```

---

### A API estará disponível em:

```bash
http://localhost:3000
```

Documentação Swagger em: `http://localhost:3000/admin-docs` e `http://localhost:3000/docs` 

---

## 🔐 Funcionalidades

- ✅ Autenticação de usuários (login/registro)
- ✅ Gerenciamento de quartos (CRUD)
- ✅ Gerenciamento de reservas (CRUD)
- ✅ Controle de acesso admin
- ✅ Validação robusta de entrada
- ✅ Tratamento centralizado de erros
- ✅ Limitação de taxa de requisições
- ✅ Documentação interativa com Swagger

---

## 📡 Rotas / Endpoints

### 🔑 Autenticação

| Método | Rota           | Descrição                      |
| ------ | -------------- | ------------------------------ |
| POST   | `/login`       | Login de usuário               |
| POST   | `/register`    | Registro de novo usuário       |

### 🏨 Quartos (Usuário)

| Método | Rota           | Descrição                      |
| ------ | -------------- | ------------------------------ |
| GET    | `/rooms`       | Listar quartos ativos          |

### 🏨 Quartos (Admin)

| Método | Rota               | Descrição                      |
| ------ | ------------------ | ------------------------------ |
| GET    | `/admin/rooms`     | Listar todos os quartos        |
| POST   | `/admin/rooms`     | Criar novo quarto             |
| PATCH  | `/admin/rooms/:id` | Atualizar quarto              |
| DELETE | `/admin/rooms/:id` | Desativar quarto              |

### 📅 Reservas (Usuário)

| Método | Rota               | Descrição                      |
| ------ | ------------------ | ------------------------------ |
| POST   | `/reservations`    | Criar nova reserva            |
| GET    | `/reservations/me` | Listar minhas reservas         |

### 📅 Reservas (Admin)

| Método | Rota                   | Descrição                      |
| ------ | ---------------------- | ------------------------------ |
| GET    | `/admin/reservations`  | Listar todas as reservas       |
| PATCH  | `/admin/reservations/:id` | Cancelar reserva           |

### 👑 Admin

| Método | Rota           | Descrição                      |
| ------ | -------------- | ------------------------------ |
| GET    | `/admin/users` | Listar todos os usuários       |

---

## 🚀 Exemplo de Uso

### Criar uma reserva

```bash
POST /reservations
Content-Type: application/json
Authorization: Bearer <token>

{
  "roomId": 1,
  "checkIn": "2026-02-20",
  "checkOut": "2026-02-22",
  "guests": 2
}
```

### Resposta de sucesso

```json
{
  "id": 1,
  "roomId": 1,
  "userId": 1,
  "checkIn": "2026-02-20T00:00:00.000Z",
  "checkOut": "2026-02-22T00:00:00.000Z",
  "guests": 2,
  "status": "confirmed",
  "createdAt": "2026-02-19T10:30:00Z",
  "updatedAt": "2026-02-19T10:30:00Z"
}
```

---

## 🛠️ Tratamento de Erros

A aplicação utiliza um sistema centralizado de tratamento de erros,
retornando respostas consistentes:

```json
{
  "erro": "Quarto não encontrado",
  "status": 404
}
```

---

## 🚧 Próximos Passos

- Implementação de testes automatizados com Jest
- Sistema de notificações por email
- Paginação e filtros avançados
- Integração com gateways de pagamento
- Deploy em produção

---

## 📌 Observações

O projeto foi desenvolvido com foco em clareza de código,
organização em camadas e tratamento robusto de erros,
demonstrando boas práticas de desenvolvimento backend
e estrutura escalável para projetos futuros.