import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heading, Button, Flex } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons';

import { fakeAPI } from '../../auth/fakeAPI';
import { IssuesTable as Table } from './IssuesTable';
import { CreateIssueModal } from './CreateIssueModal';

export default function Projects() {
  const params = useParams();
  const projectId = params.id;

  const [issues, setIssues] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const issuesData = await fakeAPI.get_issues(projectId);
      setIssues(issuesData);
    }
    fetchData();
  }, [projectId]);

  const closeCreateModalHandler = () => {setShowCreateModal(false)};
  
  return (
    <>
      <Flex justify={'space-between'} px={6} pt={8} mb={-4}>
        <Flex direction={'column'}>
          <Heading as={'h1'} size={'md'} mb={2}>ExampleProject1</Heading>
          <p>We are going to build something amazing!</p>
        </Flex>
        <Button
          variant={'solid'}
          colorScheme={'teal'}
          size={'sm'}
          mr={4}
          leftIcon={<AddIcon />}
          onClick={() => {setShowCreateModal(!showCreateModal);}}>
          New Issue
        </Button>
      </Flex>
      <Table data={issues}></Table>
      {showCreateModal ? <CreateIssueModal closeModalHandler={closeCreateModalHandler} /> : null}
    </>
  )
}