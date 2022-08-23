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
