import { Tr, Td, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export function Project({
  name,
  description,
  openIssues,
  closedIssues
}) {
  return (
    <Tr cursor="pointer" _hover={{backgroundColor: 'gray.100'}}>
      <Td>{name}</Td>
      <Td>{description}</Td>
      <Td>{openIssues}</Td>
      <Td>{closedIssues}</Td>
      {/* <Td isNumeric>
        <Button mx={2}>Edit</Button>
        <Button>Delete</Button>
      </Td> */}
    </Tr>
  );
}
