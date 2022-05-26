import { useState } from 'react';
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
import { useNavigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../auth/Auth';

export default function CreateOrgForm() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  const [orgName, setOrgName] = useState('');

  const submitHandler = () => {
    auth.createOrg(orgName, () => navigate(from, { replace: true }));
  }

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
          Create your organization
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          What is the name of your organization?
        </Text>
        <FormControl id="org">
          <Input
            placeholder="Your organization name"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={'teal.400'}
            color={'white'}
            _hover={{
              bg: 'teal.500',
            }}
            onClick={submitHandler}>
            Create Org
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}