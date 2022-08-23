import { ProductRepository } from '../../repositories/product/productRepository';
import { Prisma, Product } from '@prisma/client';

export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async getManyProducts(): Promise<Product[]> {
    return await this.productRepository.getManyProducts();
  }

  async createOneProduct(data: Prisma.ProductUncheckedCreateInput) {
    await this.productRepository.createOneProduct(data);
  }

  async updateOneProduct(
    where: Prisma.ProductWhereInput,
    data: Prisma.ProductUncheckedUpdateInput
  ) {
    await this.productRepository.updateOneProduct(where, data);
  }

  async deleteOneProduct(where: Prisma.ProductWhereInput): Promise<void> {
    await this.productRepository.deleteOneProduct(where);
  }
}
