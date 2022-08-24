import type { NextPage } from 'next';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Button, Flex } from '@chakra-ui/react';
import { fetcher, requests } from '../lib/utils/requests';
import { Product } from '@prisma/client';
import useSWR from 'swr';

const Home: NextPage = () => {
  // Example get request
  const { data: products } = useSWR('/api/products', fetcher, {
    refreshInterval: 1000,
  });

  // Example post request
  const createProduct = async () => {
    await requests.post('/api/product', {
      name: 'New Product',
      description: 'New Product Description',
      price: 100,
    });
  };

  return (
    <div>
      <Header />
      <main>
        <Flex align="center" justify="center" paddingX={['10px', '20px']}>
          <Flex width={1150} maxWidth={1150} bg="grey">
            Hello World
            {products &&
              products.map((product: Product, index: number) => {
                return <div key={index}>{product.name}</div>;
              })}
          </Flex>
          <Button
            onClick={async () => {
              await createProduct();
            }}
          >
            Create one
          </Button>
        </Flex>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
