import { ProductService } from './productService';
import { ProductRepository } from '../../repositories/product/productRepository';
import { mock } from 'jest-mock-extended';

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
