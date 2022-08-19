# 🚀 The Ultimate Nextjs Starter Template

🔋 Battery included™️.
This an opinionated starter template for a production grade NextJS project.
I've adopted industries best practices into this template from my professional experience in big tech, startups and YC companies.

### 💡 Main features

- [x] Authentication using NextAuth with Google Login.
- [x] PostgreSQL and Prisma ORM.
- [x] Protected vs public API routes.
- [x] API schema validation using JOI validator.
- [ ] Data fetching using SWR.

### 🔎 Observation

- [x] Logging using Pino.
- [ ] Integration with Datadog for monitoring the logs.
- [x] Error handling.
- [ ] Analytics.

### 🧑‍💻 Developer Experience

- [x] Typescript
- [x] Using Uncle Bob's Clean Architecture for backend codebase.
- [x] Create React components faster with component library using Chakra UI.
- [ ] Docker compose for running the app locally.
- [x] Eslint and Prettier for code formatting.
- [x] lint-staged and pretty-quick for running linting on staged files.
- [x] Using nvm (node version manager) so everyone in the team is using the same version of node.
- [ ] Run in development mode vs production mode.
- [ ] Renovate for keeping the dependencies up to date.

## 👉 Getting started

Make sure you have the following `.env` file present

```
DATABASE_URL= Your PostgreSQL url
GOOGLE_ID= Your Google Credentials API ID for NextAuth
GOOGLE_SECRET= Your Google Credentials API secret for NextAuth
SECRET= A secret string used to sign the JWT token for NextAuth
```

### Fresh install
1. Make sure you have the `.env` file.
2. Start the postgreSQL via docker compose
3. Run `npx prisma db push`. Make sure it is pointed at the local db

### Running for development
Just run `npm run dev`

# 📚 Best Practices
Below are some of the best practices used when creating this project. 
I've included this section to explain the reasoning behind my decisions.

## 🗂 Architecture
The structure of the backend code has been inspired by [Uncle Bob's Clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).
But what is Clean Architecture?

![Clean Architecture Diagram](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

> The overriding rule that makes this architecture work is The Dependency Rule. 
> This rule says that source code dependencies can only point inwards. 
> Nothing in an inner circle can know anything at all about something in an outer circle.

Following this patter, the code base is organised into the following layers:

- API Layer
- Service Layer
- Repository Layer

```bash
 TODO
```

## ⚙️ API Schema Validation
TODO

## 📃 Logging
TODO

## 🐞 Error Handling
When you're writing an API code, make sure you wrap your code in try catch blocks. If you don't do this, you'll run into runtime errors that are hard to debug.
See `handleError` function, which knows what to do when an error arises.

i.e `api/products.ts`

```ts
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Your code goes here
    throw new Error('Something went wrong');
    
  } catch (error) {
    handleError(error, res); // <-- this is the important line. It will capture the error above, log it and send a response to the client.
  }
}
```

# ⭐️ Contribution
Always looking for feedbacks and contributors! Please open an issue or a PR if you have any suggestions 😁