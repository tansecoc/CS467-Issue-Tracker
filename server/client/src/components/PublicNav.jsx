import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function NavLoggedOut() {
  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('green.800', 'white')}>
            IssueTracker
          </Text>
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          align={'center'}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <RouterLink to="/signin">
            <Button
              fontSize={'sm'}
              fontWeight={400}
              variant={'link'}
            > 
              Sign In
            </Button>
          </RouterLink>
          <RouterLink to="/signup">
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'green.400'}
              _hover={{
                bg: 'green.500',
              }}>
                Sign Up
            </Button>
          </RouterLink>
        </Stack>
      </Flex>
    </Box>
  );
}

