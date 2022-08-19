import { ProductRepository } from '../repositories/product.repository';
import { Prisma, Product } from '@prisma/client';

export const ProductService = {
  async getManyProducts(): Promise<Product[]> {
    return await ProductRepository.getManyProducts();
  },

  async createOneProduct(data: Prisma.ProductUncheckedCreateInput) {
    await ProductRepository.createOneProduct(data);
  },

  async updateOneProduct(
    where: Prisma.ProductWhereInput,
    data: Prisma.ProductUncheckedUpdateInput
  ) {
    await ProductRepository.updateOneProduct(where, data);
  },

  async deleteOneProduct(where: Prisma.ProductWhereInput): Promise<void> {
    await ProductRepository.deleteOneProduct(where);
  },
};
