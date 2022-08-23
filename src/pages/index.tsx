import type { NextPage } from 'next';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Button, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { requests } from '../lib/utils/requests';

const Home: NextPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products').then((res) => {
      setProducts(res.data);
    });
  }, []);

  const createProduct = async () => {
    await requests.post('/api/products', {
      name: 'New Product',
      description: 'New Product Description',
    });
  };

  return (
    <div>
      <Header />
      <main>
        <Flex align="center" justify="center" paddingX={['10px', '20px']}>
          <Flex width={1150} maxWidth={1150} bg="grey">
            Hello World
            {products.map((product, index) => {
              return <div key={index}>{product.name}</div>;
            })}
            <Button
              onClick={async () => {
                await createProduct();
              }}
            >
              Create one
            </Button>
          </Flex>
        </Flex>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
