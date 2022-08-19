import { Product, Prisma } from '@prisma/client';
import prisma from '../utils/prisma';

export type ProductCreateInput = {
  id?: string;
  userId: string;
  name: string;
  description: string;
  price: number;
};

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
    await prisma.product.updateMany({
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
  },

  async deleteOneProduct(where: Prisma.ProductWhereInput) {
    await prisma.product.deleteMany({
      where: {
        id: where.id,
        userId: where.userId,
      },
    });
  },
};
