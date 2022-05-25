import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function CreateOrgForm() {
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
          Join an organization 
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          Enter the invite code you received
        </Text>
        <FormControl id="org">
          <Input
            placeholder="Invite code"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={'teal.400'}
            color={'white'}
            _hover={{
              bg: 'teal.500',
            }}>
            Join Org
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}