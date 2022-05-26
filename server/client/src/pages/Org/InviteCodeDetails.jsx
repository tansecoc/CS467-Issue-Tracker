import { useState, useEffect } from 'react';
import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function InviteCodeDetails({ closeModalHandler }) {
  const [inviteCode, setInviteCode] = useState("loading...");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/orgs/invite');
      let data = await res.json();
      setInviteCode(data.org_invite_code);
    }
    fetchData();
  }, []);

  return (
    <Flex
      onClick={(e) => {e.stopPropagation()}}
      align={'center'}
      justify={'center'}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Invite New Members
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          Share the invite code below:
        </Text>
        <Text fontSize={{ base: 'md', sm: 'lg' }} fontWeight={'bold'}>{inviteCode}</Text>
        <Flex>
          <Button
            bg={'gray.400'}
            color={'white'}
            _hover={{
              bg: 'gray.500',
            }}
            flex={1}
            mr={2}
            onClick={closeModalHandler}>
            Back
          </Button>
          <Button
            bg={'teal.400'}
            color={'white'}
            _hover={{
              bg: 'teal.500',
            }}
            flex={1}
            ml={2}
            onClick={() => {navigator.clipboard.writeText(inviteCode)}}>
            Copy
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
}