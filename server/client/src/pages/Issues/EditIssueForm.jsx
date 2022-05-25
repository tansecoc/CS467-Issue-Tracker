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

export default function CreateIssueForm({ issueInfo: {type, priority, title, summary, dueDate, assignee}, closeModalHandler }) {
  const [input, setInput] = useState({type, priority, title, summary, dueDate, assignee});

  const inputHandlerFactory = (key) => {
    return (e) => {
      setInput(prevState => {
        let newIssue = {...prevState};
        newIssue[key] = e.target.value;
        return newIssue;
      });
    };
  }

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
        <Flex justify={'space-between'}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Edit Issue
          </Heading>
          <Button
            bg={'red.400'}
            color={'white'}
            _hover={{
              bg: 'red.500',
            }}
            ml={2}
            onClick={(() => {console.log(`name: ${title}, desc: ${summary}`)})}>
            Delete
          </Button>
        </Flex>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          Update issue information.
        </Text>
        <FormControl id="issue">
            <Flex alignItems="center" mb={4} grow={0}>
              <FormLabel htmlFor='type' textAlign={'right'} w={75}>Type</FormLabel>
              <Select id='type' w={100} value={input.type} onChange={inputHandlerFactory('type')}>
                <option>Task</option>
                <option>Bug</option>
              </Select>
            </Flex>
            <Flex alignItems={'center'} mt={4}>
              <FormLabel htmlFor='priority' textAlign={'right'} w={75}>Priority</FormLabel>
              <Select id='priority' w={100} value={input.priority} onChange={inputHandlerFactory('priority')}>
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
                value={input.title}
                onChange={inputHandlerFactory('title')}
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
                value={input.summary}
                onChange={inputHandlerFactory('summary')}
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
                value={input.dueDate}
                onChange={inputHandlerFactory('dueDate')}
              />
            </Flex> 
            <Flex alignItems={'center'} my={2} grow={0}>
              <FormLabel htmlFor='assignee' textAlign={'right'} w={75}>Assign To</FormLabel>
              <Select 
                id='assignee' 
                placeholder='Select Assignee' 
                mb={2} 
                w={200} 
                value={input.assignee}
                onChange={inputHandlerFactory('assignee')}>
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
            onClick={(() => {console.log(`name: ${title}, desc: ${summary}`)})}>
            Save
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
}