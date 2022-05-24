import { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Select,
  Flex,
  Heading,
  Input,
  Textarea,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function CreateIssueForm({ closeModalHandler }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Flex
      onClick={(e) => {e.stopPropagation()}}
      align={'center'}
      justify={'center'}>
      <Stack
        spacing={4}
        w={'full'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Create New Issue
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          Tell others a little bit about this issue.
        </Text>
        <FormControl id="org">
            <Flex alignItems="center" mb={4} grow={0}>
              <FormLabel htmlFor='type' textAlign={'right'} w={75}>Type</FormLabel>
              <Select id='type' w={100}>
                <option>Task</option>
                <option>Bug</option>
              </Select>
            </Flex>
            <Flex alignItems={'center'} mt={4}>
              <FormLabel htmlFor='priority' textAlign={'right'} w={75}>Priority</FormLabel>
              <Select id='priority' w={100}>
                <option>Low</option>
                <option>Med</option>
                <option>High</option>
              </Select>
            </Flex>
            <Flex alignItems={'center'} mt={2} grow={0}>
              <FormLabel htmlFor='title' textAlign={'right'} w={75}>Title</FormLabel>
              <Input
                id='title'
                placeholder="Issue Title"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                my={2}
                w={300}
                value={name}
                onChange={(e) => {setName(e.target.value)}}
              />
            </Flex>
            <Flex alignItems={'start'} grow={0}>
              <FormLabel htmlFor='summary' textAlign={'right'} w={75} mt={3}>Summary</FormLabel>
              <Textarea
                id='summary'
                placeholder="Issue Description"
                _placeholder={{ color: 'gray.500' }}
                type="text-area"
                my={2}
                w={300}
                value={name}
                onChange={(e) => {setName(e.target.value)}}
              />
            </Flex>
            <Flex alignItems={'center'} mb={2} grow={0}>
              <FormLabel htmlFor='due-date' textAlign={'right'} w={75}>Due Date</FormLabel>
              <Input
                id='due-date'
                _placeholder={{ color: 'gray.500' }}
                type="date"
                my={2}
                w={150}
                value={description}
                onChange={(e) => {setDescription(e.target.value)}}
              />
            </Flex> 
            <Flex alignItems={'center'} my={2} grow={0}>
              <FormLabel htmlFor='assignee' textAlign={'right'} w={75}>Assign To</FormLabel>
              <Select id='assignee' placeholder='Select Assignee' mb={2} w={200}>
                <option>Kevin Gilpin</option>
                <option>Kevin Peralta</option>
                <option>Casimero Tanseco</option>
              </Select>
            </Flex> 
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
            onClick={(() => {console.log(`name: ${name}, desc: ${description}`)})}>
            Create Issue
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
}