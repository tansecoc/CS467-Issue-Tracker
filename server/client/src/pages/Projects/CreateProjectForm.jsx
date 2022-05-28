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
  FormErrorMessage
} from '@chakra-ui/react';

import { postData } from '../../utils/postData';

export default function CreateProjectForm({ addProject, closeModalHandler }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [isError, setIsError] = useState(false);
  
  const createProjectHandler = async () => {
    if(name === '' || description === '') {
      setIsError(true);
      return;
    }

    let newProject = { project_name: name, project_description: description };
    try {
      await postData('/api/projects', newProject);
    }
    catch(err) {
      console.error(err);
    }
    addProject(newProject);
    closeModalHandler();
  };

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
          Create New Project
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          Tell others a little bit about the project.
        </Text>
        <FormControl id="org" isInvalid={isError}>
          <Input
            placeholder="Project name"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            mb={2}
            value={name}
            onChange={(e) => {setName(e.target.value)}}
          />
          <Input
            placeholder="Project description"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            mt={2}
            value={description}
            onChange={(e) => {setDescription(e.target.value)}}
          />
          <FormErrorMessage>Name and Description are required.</FormErrorMessage>
        </FormControl>
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
            Cancel
          </Button>
          <Button
            bg={'teal.400'}
            color={'white'}
            _hover={{
              bg: 'teal.500',
            }}
            flex={1}
            ml={2}
            onClick={createProjectHandler}>
            Create Project
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
}