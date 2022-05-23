import { Tr, Td, Button } from '@chakra-ui/react';

export function Issue({
  id,
  title,
  type,
  priority,
  status,
  dueDate,
  assignee
}) {

  const clickHandler = (e) => {
    console.log('clicked!');
  }

  return (
    <Tr cursor="pointer" _hover={{backgroundColor: 'gray.300'}} onClick={clickHandler}>
      <Td>{type}</Td>
      <Td>{priority}</Td>
      <Td>{status}</Td>
      <Td>{title}</Td>
      <Td isNumeric>{dueDate}</Td>
      <Td isNumeric>{assignee}</Td>
      {/* <Td isNumeric>
        <Button mx={2}>Edit</Button>
        <Button>Delete</Button>
      </Td> */}
    </Tr>
  );
}
