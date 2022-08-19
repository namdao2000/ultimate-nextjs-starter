# The Ultimate Nextjs Starter

Look no further. This is an opinionated starter template for Nextjs for serious developers.
I've adopted industry's best practices in this project from my professional experience in big tech, startups and YC companies.

### Main features

- [x] Authentication using NextAuth with Google Login.
- [x] PostgreSQL and Prisma ORM.
- [ ] Protected vs public API routes.
- [ ] API schema validation using JOI validator.
- [x] Using nvm (node version manager) so everyone in the team is using the same version of node.

### Observation

- [ ] All levels of logging using Pino
- [ ] Error handling
- [ ] Analytics

### Developer Experience

- [x] Typescript
- [ ] Using Uncle Bob's Clean Architecture for API codebase.
- [x] Create React components faster with component library using Chakra UI.
- [ ] Docker compose for running the app locally.
- [x] Eslint and Prettier for code formatting.
- [x] lint-staged and pretty-quick for running linting on staged files.
- [ ] Run in development mode vs production mode.
- [ ] Renovate for keeping the dependencies up to date.

## Getting started

Make sure you have the following `.env` file present

```env
DATABASE_URL= Your PostgreSQL url
GOOGLE_ID= Your Google Credentials API ID for NextAuth
GOOGLE_SECRET= Your Google Credentials API secret for NextAuth
SECRET= A secret string used to sign the JWT token for NextAuth
```

### Fresh install
2. Start the postgreSQL via docker compose
3. Run `npx prisma db push`. Make sure it is pointed at the local db

### Normal development
Just run `npm run dev`