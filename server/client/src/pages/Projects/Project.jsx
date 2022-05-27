import { Tr, Td, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export function Project({
  project_id,
  project_name,
  project_description,
  openIssues,
  closedIssues,
  showEditModalHandler
}) {

  const navigate = useNavigate();

  const viewIssueHandler = (e) => {
    navigate(`/app/project/${project_id}`);
  };

  const editIssueHandler = (e) => {
    e.stopPropagation();
    showEditModalHandler({project_id, project_name, project_description});
  }

  return (
    <Tr cursor="pointer" _hover={{backgroundColor: 'gray.300'}} onClick={viewIssueHandler}>
      <Td>{project_name}</Td>
      <Td>{project_description}</Td>
      <Td isNumeric>{openIssues}</Td>
      <Td isNumeric>{closedIssues}</Td>
      <Td isNumeric color={'teal'} fontWeight={'500'}><Link _hover={{fontWeight: '600', textDecoration: 'underline'}} onClick={editIssueHandler}>Edit</Link></Td>
      {/* <Td isNumeric>
        <Button mx={2}>Edit</Button>
        <Button>Delete</Button>
      </Td> */}
    </Tr>
  );
}
