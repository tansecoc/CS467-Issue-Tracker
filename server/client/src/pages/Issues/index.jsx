import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heading, Button, Flex } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons';

import { fakeAPI } from '../../auth/fakeAPI';
import { IssuesTable as Table } from './IssuesTable';
import { ViewIssueModal } from './ViewIssueModal';
import { CreateIssueModal } from './CreateIssueModal';
import { EditIssueModal } from './EditIssueModal';

export default function Projects() {
  const params = useParams();
  const projectId = params.id;

  const [issues, setIssues] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [issueInfo, setIssueInfo] = useState({type: null, priority: null, title: null, summary: null, dueDate: null, assignee: null});

  useEffect(() => {
    async function fetchData() {
      const issuesData = await fakeAPI.get_issues(projectId);
      setIssues(issuesData);
    }
    fetchData();
  }, [projectId]);

  const closeViewModalHandler = () => {setShowViewModal(false)};
  const closeCreateModalHandler = () => {setShowCreateModal(false)};
  const closeEditModalHandler = () => {setShowEditModal(false)};
  const showViewModalHandler = ({type, priority, title, summary, dueDate, assignee}) => {
    setIssueInfo({type, priority, title, summary, dueDate, assignee});
    setShowCreateModal(false);
    setShowEditModal(false);
    setShowViewModal(true);
  };
  const showEditModalHandler = () => {
    setShowCreateModal(false);
    setShowViewModal(false);
    setShowEditModal(true);
  };
  
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
      <Table data={issues} showModalHandler={showViewModalHandler}></Table>
      {showViewModal ? <ViewIssueModal issueInfo={issueInfo} closeModalHandler={closeViewModalHandler} showEditModalHandler={showEditModalHandler} /> : null}
      {showCreateModal ? <CreateIssueModal closeModalHandler={closeCreateModalHandler} /> : null}
      {showEditModal ? <EditIssueModal issueInfo={issueInfo} closeModalHandler={closeEditModalHandler}  /> : null}
    </>
  )
}