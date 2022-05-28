import { useState, useEffect } from 'react';
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
  FormErrorMessage
} from '@chakra-ui/react';

export default function CreateIssueForm({ addIssue, closeModalHandler }) {
  const [newIssue, setNewIssue] = useState({ issue_type: null, issue_priority: null, issue_title: null, issue_desription: null, issue_due_date: null, issue_assignee_email: null, issue_status: 'Open' });
  const [members, setMembers] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/orgs/users');
        if (res.ok) {
          let membersData = await res.json();
          setMembers(membersData);
        }
      }
      catch(err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const inputHandler = (key) => {
    return (e) => {
      setNewIssue(prev => {
        let newIssue = {...prev};
        newIssue[key] = e.target.value;
        return newIssue;
      })
    };
  } 

  const createIssueHandler = () => {
    if (validateForm(newIssue)) {
      addIssue(newIssue);
    }
  }

  const validateForm = (formData) => {
    for (let field in formData) {
      if ( formData[field] === '' || formData[field] === null) {
        setIsError(true);
        return false;
      }
    }
    return true;
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
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Create New Issue
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          Tell others a little bit about this issue.
        </Text>
        <FormControl id="org" isInvalid={isError}>
            <Flex alignItems="center" mb={4} grow={0}>
              <FormLabel htmlFor='issue_type' textAlign={'right'} w={75}>Type</FormLabel>
              <Select id='issue_type' w={100} value={newIssue.issue_type}
                onChange={inputHandler('issue_type')} placeholder="Type">
                <option>Task</option>
                <option>Bug</option>
              </Select>
            </Flex>
            <Flex alignItems={'center'} mt={4}>
              <FormLabel htmlFor='priority' textAlign={'right'} w={75}>Priority</FormLabel>
              <Select id='issue_priority' w={100} value={newIssue.issue_priority}
                onChange={inputHandler('issue_priority')} placeholder="Priority">
                <option>Low</option>
                <option>Med</option>
                <option>High</option>
              </Select>
            </Flex>
            <Flex alignItems={'center'} mt={2} grow={0}>
              <FormLabel htmlFor='issue_name' textAlign={'right'} w={75}>Title</FormLabel>
              <Input
                id='issue_name'
                placeholder="Issue Title"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                my={2}
                w={300}
                value={newIssue.issue_name}
                onChange={inputHandler('issue_name')}
              />
            </Flex>
            <Flex alignItems={'start'} grow={0}>
              <FormLabel htmlFor='issue_description' textAlign={'right'} w={75} mt={3}>Summary</FormLabel>
              <Textarea
                id='issue_description'
                placeholder="Issue Description"
                _placeholder={{ color: 'gray.500' }}
                type="text-area"
                my={2}
                w={300}
                value={newIssue.issue_desription}
                onChange={inputHandler('issue_description')}
              />
            </Flex>
            <Flex alignItems={'center'} mb={2} grow={0}>
              <FormLabel htmlFor='issue_due_date' textAlign={'right'} w={75}>Due Date</FormLabel>
              <Input
                id='issue_due_date'
                _placeholder={{ color: 'gray.500' }}
                type="date"
                my={2}
                w={150}
                value={newIssue.issue_due_date}
                onChange={inputHandler('issue_due_date')}
              />
            </Flex> 
            <Flex alignItems={'center'} my={2} grow={0}>
              <FormLabel htmlFor='issue_assignee_email' textAlign={'right'} w={75}>Assign To</FormLabel>
              <Select id='issue_assignee_email' placeholder='Select Assignee' mb={2} w={200} value={newIssue.issue_assignee_email}
                onChange={inputHandler('issue_assignee_email')}>
                {members.map(member => <option id={member.user_id} first_name={member.user_first_name} last_name={member.user_last_name} value={member.user_email}>{`${member.user_first_name} ${member.user_last_name} (${member.user_email})`}</option>)}
              </Select>
            </Flex> 
            <FormErrorMessage>All fields are required.</FormErrorMessage>
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
            onClick={createIssueHandler}>
            Create Issue
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
}