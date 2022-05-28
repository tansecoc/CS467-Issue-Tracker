import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function DeleteConfirmation({ issueInfo, cancelHandler, deleteHandler }) {
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
          Are you sure? 
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          Deleting <strong>{issueInfo.issue_name}</strong> is permanent and cannot be undone.
        </Text>
        <Flex>
          <Button
            bg={'gray.400'}
            color={'white'}
            _hover={{
              bg: 'gray.500',
            }}
            flex={1}
            mr={2}
            onClick={cancelHandler}>
            Cancel
          </Button>
          <Button
            bg={'red.400'}
            color={'white'}
            _hover={{
              bg: 'red.500',
            }}
            flex={1}
            ml={2}
            onClick={deleteHandler}>
            Yes, Delete
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
}