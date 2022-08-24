// Write unit test for the product service using jest

import { ProductRepository } from './productRepository';
import { mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

describe('ProductService', () => {
  const mockPrisma = mockDeep<PrismaClient>();
  let productRepository: ProductRepository;

  beforeEach(() => {
    productRepository = new ProductRepository(mockPrisma);
  });

  describe('deleteOneProduct', () => {
    test('should throw an error when no product is found', async () => {
      mockPrisma.product.deleteMany.mockResolvedValue({ count: 0 });
      const where = { id: '1', userId: 'nam' };
      await expect(productRepository.deleteOneProduct(where)).rejects.toThrow(
        'Product not found'
      );
    });
  });
});
