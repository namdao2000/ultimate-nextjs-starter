import { ProductService } from './services/product/productService';
import { ProductRepository } from './repositories/product/productRepository';
import { PrismaClient } from '@prisma/client';
import prisma from './utils/prisma';

export class Core {
  private repositories: any;
  public services: any;

  constructor() {
    console.log('Core constructor');
    this.repositories = {
      product: new ProductRepository(new PrismaClient()),
    };

    this.services = {
      product: new ProductService(this.repositories.product),
    };
  }
}
