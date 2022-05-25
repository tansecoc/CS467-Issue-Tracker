import { Tr, Td } from '@chakra-ui/react';

export function Issue({
  title,
  summary,
  type,
  priority,
  status,
  dueDate,
  assignee,
  showModalHandler
}) {
  const viewIssueHandler = (e) => {
    showModalHandler({type, priority, title, summary, dueDate, assignee});
  }

  return (
    <Tr cursor="pointer" _hover={{backgroundColor: 'gray.300'}} onClick={viewIssueHandler}>
      <Td>{type}</Td>
      <Td>{priority}</Td>
      <Td>{status}</Td>
      <Td>{title}</Td>
      <Td isNumeric>{dueDate}</Td>
      <Td isNumeric>{assignee}</Td>
    </Tr>
  );
}
