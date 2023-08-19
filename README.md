# 🐶 Find a Friend API
![NodeJS](https://img.shields.io/badge/-NodeJS-339933?style=flat-square&logo=node.js&logoColor=white)
![Typescript](https://img.shields.io/badge/-Typescript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/-Fastify-202020?style=flat-square&logo=fastify&logoColor=white)
![Prisma](https://img.shields.io/badge/-Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
![Vitest](https://img.shields.io/badge/-Vitest-000000?style=flat-square&logo=vitest&logoColor=white)

An API project to help people find their new best friend
1. View pets available for adoption in your city
2. Filter pets by their characteristics
3. View details of a pet for adoption
4. Register as an organization
5. Authenticate as an organization

## 🔧 Getting started
Create a .env file with the variables as in .env.example

Install dependencies
```bash
npm install
```

Run migrations
```bash
npx prisma migrate dev
```

Run application
```bash
npm run start:dev
```

## 🧪 Testing
Run tests using Vitest

Unity tests
```bash
npm run test
```

E2E tests
```bash
npm run test:e2e
```

---
Made with ❤️ by [Yuri Paiva](https://yuripaiva.dev) 