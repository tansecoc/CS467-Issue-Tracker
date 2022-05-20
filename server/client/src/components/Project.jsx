import { Tr, Td, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export function Project({
  id,
  name,
  description,
  openIssues,
  closedIssues
}) {

  const clickHandler = (e) => {
    console.log('clicked!');
  }

  return (
    <Tr cursor="pointer" _hover={{backgroundColor: 'gray.100'}} onClick={clickHandler}>
      <Td>{name}</Td>
      <Td>{description}</Td>
      <Td isNumeric>{openIssues}</Td>
      <Td isNumeric>{closedIssues}</Td>
      {/* <Td isNumeric>
        <Button mx={2}>Edit</Button>
        <Button>Delete</Button>
      </Td> */}
    </Tr>
  );
}
