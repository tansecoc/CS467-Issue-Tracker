import { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import DeleteConfirmation from './DeleteConfirmation';
import { StatusChange } from '../../components/StatusChange';

export default function ViewIssueDetails({ issueInfo, removeIssue, closeModalHandler, editIssueHandler, showEditModalHandler }) {
  const { 
    issue_id, 
    issue_type, 
    issue_priority, 
    issue_status,
    issue_name, 
    issue_description, 
    issue_due_date,
    issue_assignee_id,
    issue_assignee_first_name,
    issue_assignee_last_name,
    issue_assignee_email 
  } = issueInfo;

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const colorValue = useColorModeValue('white', 'gray.700');

  const cancelHandler = () => setShowDeleteConfirmation(false);

  const deleteHandler = async () => {
    try {
      let res = await fetch(`/api/issues/${issue_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'aplication/json'
        }
      });
      if (res.ok) {
        removeIssue(issue_id);
        closeModalHandler();
      }
      else {
        console.error('Unable to delete');
      }
    }
    catch(err) {
      console.error(err);
    }
  }

  return showDeleteConfirmation ? <DeleteConfirmation issueInfo={issueInfo} cancelHandler={cancelHandler} deleteHandler={deleteHandler} /> : (
    <Flex
      onClick={(e) => {e.stopPropagation()}}
      align={'center'}
      justify={'center'}>
      <Stack
        spacing={4}
        w={'full'}
        bg={colorValue}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}>
        <Flex justify={'space-between'}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            View Issue
          </Heading>
          <Button
            bg={'red.400'}
            color={'white'}
            _hover={{
              bg: 'red.500',
            }}
            ml={2}
            onClick={(() => {setShowDeleteConfirmation(true)})}>
            Delete
          </Button>
        </Flex>
        <FormControl id="issue">
          <Flex grow={0} my={2}>
            <FormLabel htmlFor='title' textAlign={'right'} w={75}>Title</FormLabel>
            <Text><strong>{issue_name}</strong></Text>
          </Flex>
          <Flex grow={0} my={2}>
            <FormLabel htmlFor='status' textAlign={'right'} w={75}>Title</FormLabel>
            <StatusChange issue={issueInfo} changeHandler={editIssueHandler} />
          </Flex>
          <Flex grow={0} my={2}>
            <FormLabel htmlFor='type' textAlign={'right'} w={75}>Type</FormLabel>
            <Text>{issue_type}</Text>
          </Flex>
          <Flex my={2}>
            <FormLabel htmlFor='priority' textAlign={'right'} w={75}>Priority</FormLabel>
            <Text>{issue_priority}</Text>
          </Flex>
          <Flex grow={0} my={2}>
            <FormLabel htmlFor='summary' textAlign={'right'} w={75}>Summary</FormLabel>
            <Text w={250} overflowWrap>{issue_description}</Text>
          </Flex>
          <Flex grow={0} my={2}>
            <FormLabel htmlFor='due-date' textAlign={'right'} w={75}>Due Date</FormLabel>
            <Text>{issue_due_date.split('T')[0]}</Text>
          </Flex> 
          <Flex grow={0} my={2}>
            <FormLabel htmlFor='assignee' textAlign={'right'} w={75}>Assign To</FormLabel>
            <Text>{`${issue_assignee_first_name} ${issue_assignee_last_name}`}</Text>
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
            onClick={showEditModalHandler}>
            Edit
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
}