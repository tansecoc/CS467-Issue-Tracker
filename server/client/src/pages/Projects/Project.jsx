import { Tr, Td, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { DeleteButton } from './DeleteButton';

export function Project({
  project_id,
  project_name,
  project_description,
  open_count,
  closed_count,
  removeProject,
  showEditModalHandler
}) {
  const navigate = useNavigate();

  const viewIssueHandler = (e) => {
    navigate(`/app/project/${project_id}`, { state: { project_name, project_description }});
  };

  const editProjectHandler = (e) => {
    e.stopPropagation();
    showEditModalHandler({project_id, project_name, project_description});
  }

  const deleteProjectHandler = async (e) => {
    e.stopPropagation();
    try {
      let res = await fetch(`/api/projects/${project_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.ok) {
        removeProject(project_id);
      }
      else {
        console.error('Failed to delete project');
      }
    }
    catch(err) {
      console.error(err);
    }
  }

  return (
    <Tr cursor="pointer" _hover={{backgroundColor: 'gray.300'}} onClick={viewIssueHandler}>
      <Td>{project_name}</Td>
      <Td>{project_description}</Td>
      <Td isNumeric>{open_count}</Td>
      <Td isNumeric>{closed_count}</Td>
      <Td isNumeric onClick={(e) => e.stopPropagation()}>
        <Button mx={2} onClick={editProjectHandler}>Edit</Button>
        <DeleteButton project_name={project_name} deleteHandler={deleteProjectHandler} /> 
      </Td>
    </Tr>
  );
}
