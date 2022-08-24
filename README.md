<div align="center">
  <h1><b>🚀 The Ultimate Next.js Starter Pack</b></h1>
  <p>Next.js ^12 + TypeScript + Prisma + Chakra UI starter packed with useful development features.</p>
  <p>I've adopted industries best practices into this template from my professional experience working in big tech, startups and YC companies.</p>
  <p>Made by <a href="https://namdao.dev">Nam Dao</a></p>
</div>

# **👉 Quick start**

1. Please get the Google OAuth 2.0 Credentials by following this https://next-auth.js.org/providers/google

2. Make sure you have the following `.env` file present.
    ```
    DATABASE_URL= Your PostgreSQL url
    GOOGLE_ID= Your Google Credentials API ID for NextAuth
    GOOGLE_SECRET= Your Google Credentials API secret for NextAuth
    SECRET= A secret string used to sign the JWT token for NextAuth
    ```
3. Spin up docker and start the postgreSQL via docker compose.

4. Run `npx prisma db push`. Make sure it is pointed at the local db.

5. Run `npm run dev`.

## **🔋 Features**

### **💡 Main**
- [x] Authentication using NextAuth with Google Login.
- [x] PostgreSQL and Prisma ORM.
- [x] Protected vs public API routes.
- [x] API schema validation using JOI validator.
- [x] Data fetching using SWR.
- [x] Testing using jest and jest-mock-extended

### **🔎 Observation**

- [x] Logging using Pino (recommended by Next.js official docs)
- [x] Error handling.

### **🧑‍💻 Developer experience**

- [x] Typescript
- [x] Using Uncle Bob's Clean Architecture for backend codebase.
- [x] Create React components faster with component library using Chakra UI.
- [x] Docker compose for running the app locally.
- [x] Eslint and Prettier for code formatting.
- [x] lint-staged and pretty-quick for running linting on staged files.
- [x] Using nvm (node version manager) so everyone in the team is using the same version of node.
- [x] [Depful](https://depfu.com/) for keeping the dependencies up to date.

# **📚 Best practices**
Below are some of the best practices used when creating this project. 
I've included this section to explain the reasoning behind my decisions.

## **🗂 Architecture**
The structure of the backend code has been inspired by [Uncle Bob's Clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).
But what is Clean Architecture?

![Clean Architecture Diagram](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

> The overriding rule that makes this architecture work is The Dependency Rule. 
> This rule says that source code dependencies can only point inwards. 
> Nothing in an inner circle can know anything at all about something in an outer circle.

Following this patter, the code base is organised into the following layers:

### **1. API layer (`src/pages/api/*`)**
This layer is responsible for receiving requests from the client and sending responses back to the client.
Some of its responsibilities are:
- Error handling
- Authentication
- Authorization
- API schema validation

It should not need to know any business logic or data access logic.

### **2. Service layer (`src/lib/services/*`)**
This layer is responsible for business logic. You will do most of the heavy lifting here.

### **3. Repository layer (`src/lib/repositories/*`)**
This layer is responsible for data access logic.

### **The dependency between the layers is as follows:**
API Layer -> Service Layer -> Repository Layer

```bash
 Folder structure TODO
```

### **Manual Dependency Injection with `buildServices.ts`**
Service layer and Repository layer is written in classes, so that we can mock and test them later on. 

As a result, we need to manually instantiate them in the `buildServices.ts` file and use them as `Services.[service name]` in the API layer.

Note: Yes, I do agree that this is a little bit manual and messy. There are libraries out there to help us do DI in TS/Nodejs but its not nice. 

The decision to adopt the DI pattern was not an easy one, but I believe that writing testable code is crucial to building a reliable application, so here we are.
## **🔐 Authentication** 
This is hands down one of the harder features to implement, and it could take up to a week of dev time to get it done.

Luckily, Next.js has provided us with `NextAuth` library, which allows us to do all of the authentication out of the box.
### **Login with google**
Please get the Google OAuth 2.0 Credentials by following this https://next-auth.js.org/providers/google

### **Where are the user data stored?**
All the user data is stored in the database (see `schema.prisma` file). Passwords are salted and hashed automatically.

### **Protected API routes**
Use the `getToken` method from `NextAuth` to verify the validity of the user's `JWT` token in the backend. 

```ts
  const token = await getToken({
    req,
    secret: process.env.SECRET, // The secret used to sign the JWT token.
  });
```

If the token is outdated or is tampered with, it will return null.

### **Signin / Signout**
`NextAuth` provides us with 2 useful functions for the frontend.

Signin
```ts
signIn('google', {callbackUrl: `/`})
```

Signout
```ts
signOut({ callbackUrl: '/' });
```
### **Checking if a user is logged in or not in the frontend**
`NextAuth` provides a function called `useSession`. 

```ts
const Header = () => {
  const { data: session, status } = useSession();

  return (
    <div>
      ...
    </div>
  );
};
```
- If `status` is `'unauthenticated'`, they're not logged in.
- You can also access user email, id, name etc from the `data` object. 

## **⚙️ API schema validation**
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

## **📃 Logging**
For observability, it is important to have consistent logging across the application.
In this template here, I've used Pino for logging, as recommended by Next.js official docs.

- For general logging, use the `logger.info()` level.
- For any user errors, use the `logger.warn()` level.
- For any server errors, use the `error()` level.

When you're logging something, you can also pass in extra data to the logger:

```ts
logger.info({ name: "Dyson hair dryer", price: 100 }, 'Purchased a product');
```

## **🐞 Error handling**
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

## **🗄 Database access using Prisma ORM**
There are many ways to interact with the Database. You can write straight SQLs, use ORMs or even both.
All the methods are valid if you understand the tradeoffs.

My three key reasons for choosing Prisma are:
1. Ease of use. God damn it feels good.
2. Amazing auto type generation that can be used throughout the codebase.
3. Backed by actual investors.

### **Getting started with Prisma**

The source of truth for the database schema lives inside the `prisma/schema.prisma` file.

### **How to use Prisma**

See the [Prisma documentation](https://www.prisma.io/docs/getting-started/quickstart) for more details.
To use prisma types:
```ts
import { Prisma } from '@prisma/client';

async function deleteOneProduct(where: Prisma.ProductWhereInput) // <- Use the prisma types like this
{
  // data access code...
}
```

### **How to do database changes/migration for production**

1. Edit the `prisma/schema.prisma` file.
2. Run `npx prisma format` to format the schema.
3. Run `npx prisma generate` to generate the typescript types. This will modify the files inside `node_modules`.
4. TODO: Run `npx prisma migrate` to migrate the schema.

Note: The downside of using the Prisma ORM is that later on, when you need to make a complex nested query,
Prisma may generate a really inefficient query that can hung the database. I've seen this before in production
which caused our whole database to become unresponsive. We ended up writing raw SQL for this query instead.
However, even though edge cases like this exist, I would still recommend using the Prisma because the other 98% with the added productivity 
justifies it.

## **✅ Testing**
Testing is always a controversial topic, especially in the startup world. My experience has taught me that when you're hacking together a project for an MVP or building a PoC, don't even think about it. Why spend all the effort writing test cases (which btw takes a long time) when the code could be torn down at any time. However, if your intension is to write code that **won't be torn down**, please write tests!

### **Why are repository layer and service layer all classes!?**
I've adopoted dependnecy injection for our backend code. Its basiclaly a design pattern where an object receives other objects that it depends on, usually through the constructor. This will allow us to mock dependencies easier later on.

### **How to write unit testing using Jest & Jest Mock Extended**
For example, if you have a file called `productService.ts`, a test file should be called `productService.test.ts`.

Let's say you want to test that the `ProductService.deleteOneProduct()` method actually called the `ProductRepository.deleteOneProduct()` in `ProductService` class.

`productService.ts`
```ts
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async getManyProducts(): Promise<Product[]> {
    ...
  }

  async deleteOneProduct(where: Prisma.ProductWhereInput): Promise<void> {
    ...
  }
}
```

Your test file will look like this `productService.test.ts`:
```ts
describe('ProductService', () => {
  const mockProductRepository = mock<ProductRepository>();
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService(mockProductRepository);
  });

  describe('deleteOneProduct', () => {
    test('should call ProductRepository.deleteOneProduct', async () => {
      const where = { id: '1', userId: 'nam' };
      await productService.deleteOneProduct(where);
      expect(mockProductRepository.deleteOneProduct).toHaveBeenCalledWith(
        where
      );
    });
  });
});
```

Where:
- The first `describe()` specifies the class name.
- we define all the dependnecies we need to mock using `mock` from `jest-mock-extended`.
- Do any pre testing logic in `beforeEach()`.
- The second `describe()` specifies the method name.
- Test name should follow the format `'should (logic)'`

## **🏎 CRUD requests**
Sending request to the server from the client is quite simple.

### **`GET` requests**
[`SWR`](https://www.npmjs.com/package/swr) is a React Hooks library for data fetching, that we're using in this project (recommended by the official Next.js docs) This is because `SWR` library allows us to re-validate the data / do automatic polling. 

Example of calling `api/products` endpoint in `index.tsx` with 1s refresh interval.
```ts
const Home: NextPage = () => {
  const { data } = useSWR('/api/products', fetcher, {
    refreshInterval: 1000, // default is no polling.
  });

  ...

  return (
    <div>
      ...
    </div>
  );
};
```

### **`POST`, `PUT`, `PATCH`, `DELETE` requests**
We use the axios library for these requests. Make use of my `requests` wrapper function I wrote inside `lib/utils/requests.ts`, as you can decide what to do when an error arises, on a global level. I recommend displaying an error toast there.

## **🧹 Codebase hygene**
As your team scale, it is important to have a code style consistency.

- Prettier & Eslint is used for keeping the code format consistent
- Husky is used for running eslint & prettier tasks at pre-commit.
- Make sure that files and variables are `camelCased`.


# **⭐️ Contribution**
Always looking for feedbacks and contributors! Please open an issue or a PR if you have any suggestions 😁