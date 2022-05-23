import { Tr, Td, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export function Project({
  id,
  name,
  description,
  openIssues,
  closedIssues
}) {

  const navigate = useNavigate();

  const clickHandler = (e) => {
    navigate(`../project/${id}`);
  }

  return (
    <Tr cursor="pointer" _hover={{backgroundColor: 'gray.300'}} onClick={clickHandler}>
      <Td>{name}</Td>
      <Td>{description}</Td>
      <Td isNumeric>{openIssues}</Td>
      <Td isNumeric>{closedIssues}</Td>
      <Td isNumeric color={'teal'} fontWeight={'500'}><Link _hover={{fontWeight: '600', textDecoration: 'underline'}}>Edit</Link></Td>
      {/* <Td isNumeric>
        <Button mx={2}>Edit</Button>
        <Button>Delete</Button>
      </Td> */}
    </Tr>
  );
}
