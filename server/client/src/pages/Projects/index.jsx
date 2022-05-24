import { useEffect, useState } from 'react';
import { Heading, Button, Flex } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons';

import { ProjectsTable as Table } from './ProjectsTable';
import { fakeAPI } from '../../auth/fakeAPI';
import { CreateProjectModal } from './CreateProjectModal';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const projects = await fakeAPI.get_projects();
      setProjects(projects);
    }
    fetchData();
  }, []);
  
  return (
    <>
      <Flex justify={'space-between'} px={6} pt={8} mb={-4}>
        <Heading as={'h1'} size={'md'}>Projects</Heading>
        <Button
          variant={'solid'}
          colorScheme={'teal'}
          size={'sm'}
          mr={4}
          leftIcon={<AddIcon />}
          onClick={() => {setShowCreateModal(!showCreateModal);}}>
          New Project
        </Button>
      </Flex>
      <Table data={projects}></Table>
      {showCreateModal ? <CreateProjectModal closeModalHandler={() => {setShowCreateModal(false)}} /> : null}
    </>
  );
}