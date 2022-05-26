import { Tr, Td, Icon } from '@chakra-ui/react';
import { WarningIcon, CheckCircleIcon, ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { FiChevronsUp } from 'react-icons/fi';

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

  const typeLabel = () => {
    switch(type) {
      case 'Bug':
        return <WarningIcon color="#ff3333" w={3} h={3} />;
      case 'Task':
        return <CheckCircleIcon color="lightgreen" w={3} h={3} />;
      default:
        return null;
    }
  }

  const priorityLabel = () => {
    switch(priority) {
      case 'High':
        return <Icon as={FiChevronsUp} color="red" />;
      case 'Med':
        return <ArrowUpIcon color="orange" />;
      case 'Low':
        return <ArrowDownIcon color="blue" />;
      default:
        return null;
    }
  }

  return (
    <Tr cursor="pointer" _hover={{backgroundColor: 'gray.300'}} onClick={viewIssueHandler}>
      <Td>{typeLabel()} {type}</Td>
      <Td>{priority} {priorityLabel()}</Td>
      <Td>{status}</Td>
      <Td>{title}</Td>
      <Td isNumeric>{dueDate}</Td>
      <Td isNumeric>{assignee}</Td>
    </Tr>
  );
}
