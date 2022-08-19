import type { NextPage } from 'next';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Flex } from '@chakra-ui/react';

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <main>
        <Flex align="center" justify="center" paddingX={['10px', '20px']}>
          <Flex width={1150} maxWidth={1150} bg="vercel.background">
            Hello World
          </Flex>
        </Flex>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
