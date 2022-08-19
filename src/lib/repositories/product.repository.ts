import { Product, Prisma } from '@prisma/client';
import prisma from '../utils/prisma';
import { HttpError } from '../utils/httpError';

export const ProductRepository = {
  async getManyProducts(): Promise<Product[]> {
    return await prisma.product.findMany({
      take: 100,
    });
  },

  async createOneProduct(
    data: Prisma.ProductUncheckedCreateInput
  ): Promise<Product> {
    return await prisma.product.create({
      data: {
        userId: data.userId,
        name: data.name,
        description: data.description,
        price: data.price,
      },
    });
  },

  async updateOneProduct(
    where: Prisma.ProductWhereInput,
    data: Prisma.ProductUncheckedUpdateInput
  ) {
    const product = await prisma.product.updateMany({
      where: {
        id: where.id,
        userId: where.userId,
      },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
      },
    });

    if (!product) {
      throw new HttpError(404, 'Product not found');
    }
  },

  // Using deleteMany instead of delete because we can do permission checking + deletion in one go.
  // Same goes with updateOneProduct.
  async deleteOneProduct(where: Prisma.ProductWhereInput) {
    const product = await prisma.product.deleteMany({
      where: {
        id: where.id,
        userId: where.userId,
      },
    });

    if (!product) {
      throw new HttpError(404, 'Product not found');
    }
  },
};
