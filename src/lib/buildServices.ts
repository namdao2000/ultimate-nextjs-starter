// This is manual dependency injection. See why we do DI in the README.
// Yes, this is not the optimal way to do it, but there's not a nice way to do it in Typescript Nodejs.
import { ProductService } from './services/product/productService';
import { ProductRepository } from './repositories/product/productRepository';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const repositories = {
  product: new ProductRepository(prisma),
};

export const Services = {
  product: new ProductService(repositories.product),
};
