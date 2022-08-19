import { Flex } from '@chakra-ui/react';

const Footer: React.FC<any> = () => {
  return (
    <Flex
      align="center"
      justify="center"
      paddingX={['10px', '20px']} // mobile responsive
      background={'black'}
      color={'white'}
    >
      <Flex align="center" justify="end" maxW={1150} width={1150} height={50}>
        &copy; Ultimate NextJS App
      </Flex>
    </Flex>
  );
};

export default Footer;
