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

export default function EditProjectForm({ projectInfo, updateProject, closeModalHandler }) {
  const [nameInput, setNameInput] = useState(projectInfo.project_name);
  const [descriptionInput, setDescriptionInput] = useState(projectInfo.project_description);

  const editProjectHandler = async () => {
    let res = await fetch(`/api/projects/${projectInfo.project_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({project_name: nameInput, project_description: descriptionInput}),
    });
    if (res.ok) {
      updateProject({project_id: projectInfo.project_id, project_name: nameInput, project_description: descriptionInput});
      closeModalHandler();
    }
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
          Edit Project
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          Update project information.
        </Text>
        <FormControl id="org">
          <Input
            placeholder="Project name"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            mb={2}
            value={nameInput}
            onChange={(e) => {setNameInput(e.target.value)}}
          />
          <Input
            placeholder="Project description"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            mt={2}
            value={descriptionInput}
            onChange={(e) => {setDescriptionInput(e.target.value)}}
          />
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
            onClick={editProjectHandler}>
           Save 
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
}