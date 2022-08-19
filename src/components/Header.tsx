import Head from 'next/head';
import { Button, Flex, Text } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <div>
      <Head>
        <title>Ultimate NextJS App</title>
        <meta
          name="description"
          content="Landing page for Ultimate NextJS App"
        />
        <link rel="icon" href="/favicon-196x196.png" />
      </Head>
      <Flex align="center" justify="center" paddingX={['10px', '20px']}>
        <Flex align="center" justify="space-between" maxW={1150} width={1150}>
          <Flex align="center" justify="center">
            <Text fontSize={'48px'}>Ultimate NextJS App</Text>
          </Flex>
          <Flex align="center" justify="center">
            {status === 'unauthenticated' || status === 'loading' ? (
              <Button
                onClick={() =>
                  signIn('google', {
                    callbackUrl: `${window.location.origin}`,
                  })
                }
              >
                Login
              </Button>
            ) : (
              <Button
                marginLeft={'10px'}
                onClick={() => {
                  signOut({ callbackUrl: '/' });
                }}
              >
                Logout
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default Header;
