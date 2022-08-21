<div align="center">
  <h1>🚀 The Ultimate Next.js Starter Pack</h1>
  <p>Next.js ^12 + TypeScript + Prisma + Chakra UI starter packed with useful development features.</p>
  <p>I've adopted industries best practices into this template from my professional experience in big tech, startups and YC companies.</p>
  <p>Made by <a href="https://namdao.dev">Nam Dao</a></p>
</div>

## 🔋 Features

### 💡 Main
- [x] Authentication using NextAuth with Google Login.
- [x] PostgreSQL and Prisma ORM.
- [x] Protected vs public API routes.
- [x] API schema validation using JOI validator.
- [ ] Data fetching using SWR.
- [ ] Testing using jest and jest-mock-extended

### 🔎 Observation

- [x] Logging using Pino (recommended by Next.js official docs)
- [ ] Integration with Datadog for monitoring the logs.
- [x] Error handling.
- [ ] Analytics using PostHog (YC Backed).

### 🧑‍💻 Developer Experience

- [x] Typescript
- [x] Using Uncle Bob's Clean Architecture for backend codebase.
- [x] Create React components faster with component library using Chakra UI.
- [ ] Docker compose for running the app locally.
- [x] Eslint and Prettier for code formatting.
- [x] lint-staged and pretty-quick for running linting on staged files.
- [x] Using nvm (node version manager) so everyone in the team is using the same version of node.
- [ ] Run in development mode and production mode.
- [x] [Depful](https://depfu.com/) for keeping the dependencies up to date.

# 👉 Quick start

1. Make sure you have the following `.env` file present.

```
DATABASE_URL= Your PostgreSQL url
GOOGLE_ID= Your Google Credentials API ID for NextAuth
GOOGLE_SECRET= Your Google Credentials API secret for NextAuth
SECRET= A secret string used to sign the JWT token for NextAuth
```
2. Spin up docker and start the postgreSQL via docker compose.

3. Run `npx prisma db push`. Make sure it is pointed at the local db.

4. Run `npm run dev`.

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

### 1. API Layer (`src/pages/api/*`)
This layer is responsible for receiving requests from the client and sending responses back to the client.
Some of its responsibilities are:
- Error handling
- Authentication
- Authorization
- API schema validation

It should not need to know any business logic or data access logic.

### 2. Service Layer (`src/lib/services/*`)
This layer is responsible for business logic. You will do most of the heavy lifting here.

### 3. Repository Layer (`src/lib/repositories/*`)
This layer is responsible for data access logic.

### The dependency between the layers is as follows:
**API Layer** -> **Service Layer** -> **Repository Layer**

```bash
 Folder structure TODO
```

## ⚙️ API Schema Validation
It is important to sanitize/validate the incoming requests to the API before running ANY business logic. 
There are numbers of libraries out there that can do JSON validation, but I've found JOI to 
be the easiest to use.

For example, if you're expecting a request to the API that has `name`, `price` and `description` fields,
simply define a schema:

```ts
import { Joi } from '@hapi/joi';

const schema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
});
```

Then you can use the schema to validate the incoming request:

```ts
const data = {
  name: 'Product 1',
  price: 100,
  description: 'This is a product',
};

await schema.validateAsync(data);
```

It is recommended to wrap the `validateAsync` call in a try catch block to catch any errors and return 
an appropriate response to the client.

## 📃 Logging
For observability, it is important to have consistent logging across the application.
In this template here, I've used Pino for logging, as recommended by Next.js official docs.

- For general logging, use the `logger.info()` level.
- For any user errors, use the `logger.warn()` level.
- For any server errors, use the `error()` level.

When you're logging something, you can also pass in extra data to the logger:

```ts
logger.info({ name: "Dyson hair dryer", price: 100 }, 'Purchased a product');
```

## 🐞 Error Handling
When you're writing anything, it is important to wrap your code in try catch blocks. 
Especially for APIs, as if you don't do this, you'll run into runtime errors that are hard to debug.
See my example `handleError` function, which returns an appropriate message to the client when an error arises.

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
    // This will capture the error above, log it and send a response to the client.
    handleError(error, res); 
  }
}
```

When throwing a Http Error, you can use my helper `HttpError` class which works in conjunction with the `handleError` function.

```ts
if (!product) {
  throw new HttpError(404, 'Product not found', { id: productId });
}
```

## 🗄 Database access using Prisma ORM
There are many ways to interact with the Database. You can write straight SQLs, use ORMs or even both.
All the methods are valid if you understand the tradeoffs.

My three key reasons for choosing Prisma are:
1. Ease of use. God damn it feels good.
2. Amazing auto type generation that can be used throughout the codebase.
3. Backed by actual investors.

### Getting started with Prisma

The source of truth for the database schema lives inside the `prisma/schema.prisma` file.

### How to use Prisma

See the [Prisma documentation](https://www.prisma.io/docs/getting-started/quickstart) for more details.
To use prisma types:
```ts
import { Prisma } from '@prisma/client';

async function deleteOneProduct(where: Prisma.ProductWhereInput) // <- Use the prisma types like this
{
  // data access code...
}
```

### How to do database changes/migration for production

1. Edit the `prisma/schema.prisma` file.
2. Run `npx prisma format` to format the schema.
3. Run `npx prisma generate` to generate the typescript types. This will modify the files inside `node_modules`.
4. TODO: Run `npx prisma migrate` to migrate the schema.

Note: The downside of using the Prisma ORM is that later on, when you need to make a complex nested query,
Prisma may generate a really inefficient query that can hung the database. I've seen this before in production
which caused our whole database to become unresponsive. We ended up writing raw SQL for this query instead.
However, even though edge cases like this exist, I would still recommend using the Prisma because the other 98% with the added productivity 
justifies it.

## ✅ Backend testing with jest and jest-mock-extend.
TODO

# ⭐️ Contribution
Always looking for feedbacks and contributors! Please open an issue or a PR if you have any suggestions 😁