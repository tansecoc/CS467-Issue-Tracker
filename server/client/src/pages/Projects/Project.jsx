import { Tr, Td, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export function Project({
  id,
  name,
  description,
  openIssues,
  closedIssues,
  showEditModalHandler
}) {

  const navigate = useNavigate();

  const viewIssueHandler = (e) => {
    navigate(`../project/${id}`);
  };

  const editIssueHandler = (e) => {
    e.stopPropagation();
    showEditModalHandler({name, description});
  }

  return (
    <Tr cursor="pointer" _hover={{backgroundColor: 'gray.300'}} onClick={viewIssueHandler}>
      <Td>{name}</Td>
      <Td>{description}</Td>
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
