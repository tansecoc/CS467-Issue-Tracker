import { useEffect, useState } from 'react';
import { Heading, Button, Flex } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons';

import { ProjectsTable as Table } from './ProjectsTable';
import { CreateProjectModal } from './CreateProjectModal';
import { EditProjectModal } from './EditProjectModal';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [projectInfo, setProjectInfo] = useState({name: null, description: null});

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/projects');
      const projects = await res.json();
      setProjects(projects);
    }
    fetchData();
  }, []);

  const closeCreateModalHandler = () => {setShowCreateModal(false)};
  const closeEditModalHandler = () => {setShowEditModal(false)};
  const showEditModalHandler = ({name, description}) => {
    setProjectInfo({name, description});
    setShowEditModal(true);
  };

  const addProject = (newProject) => {
    setProjects(prev => ([...prev, newProject]));
  }
  
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
      <Table data={projects} showEditModalHandler={showEditModalHandler}></Table>
      {showCreateModal ? <CreateProjectModal addProject={addProject} closeModalHandler={closeCreateModalHandler} /> : null}
      {showEditModal ? <EditProjectModal projectInfo={projectInfo} closeModalHandler={closeEditModalHandler}  /> : null}
    </>
  );
}