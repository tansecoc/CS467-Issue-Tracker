import { Tr, Td, Button } from '@chakra-ui/react';

export function Issue({
  title,
  summary,
  type,
  priority,
  status,
  dueDate,
  assignee,
  showEditModalHandler
}) {
  const editIssueHandler = (e) => {
    showEditModalHandler({type, priority, title, summary, dueDate, assignee});
  }

  return (
    <Tr cursor="pointer" _hover={{backgroundColor: 'gray.300'}} onClick={editIssueHandler}>
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
