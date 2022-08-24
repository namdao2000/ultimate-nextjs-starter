import { Product, Prisma, PrismaClient } from '@prisma/client';
import { HttpError } from '../../utils/httpError';

export class ProductRepository {
  constructor(private prisma: PrismaClient) {}

  async getManyProducts(): Promise<Product[]> {
    return await this.prisma.product.findMany({
      take: 100,
    });
  }

  async createOneProduct(
    data: Prisma.ProductUncheckedCreateInput
  ): Promise<Product> {
    return await this.prisma.product.create({
      data: {
        userId: data.userId,
        name: data.name,
        description: data.description,
        price: data.price,
      },
    });
  }

  async updateOneProduct(
    where: Prisma.ProductWhereInput,
    data: Prisma.ProductUncheckedUpdateInput
  ) {
    const result = await this.prisma.product.updateMany({
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

    if (!result.count) {
      throw new HttpError(404, 'Product not found');
    }
  }

  // Using deleteMany instead of delete because we can do permission checking + deletion in one go.
  // Same goes with updateOneProduct.
  public async deleteOneProduct(where: Prisma.ProductWhereInput) {
    const result = await this.prisma.product.deleteMany({
      where: {
        id: where.id,
        userId: where.userId,
      },
    });

    if (!result.count) {
      throw new HttpError(404, 'Product not found');
    }
  }
}
