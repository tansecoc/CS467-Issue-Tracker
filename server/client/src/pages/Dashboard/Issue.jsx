import { Tr, Td, Icon, Select } from '@chakra-ui/react';
import { WarningIcon, CheckCircleIcon, ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { FiChevronsUp } from 'react-icons/fi';

import { StatusChange } from '../../components/StatusChange';

export function Issue({
  issue,
  editIssueHandler,
  showModalHandler
}) {

  const {
    issue_id, 
    project_name,
    issue_type, 
    issue_priority, 
    issue_status,
    issue_name, 
    issue_description, 
    issue_due_date,
    issue_assignee_id,
    issue_assignee_first_name,
    issue_assignee_last_name,
    issue_assignee_email 
  } = issue;

  const viewIssueHandler = (e) => {
    showModalHandler({
      issue_id, 
      project_name,
      issue_type, 
      issue_priority, 
      issue_status,
      issue_name, 
      issue_description, 
      issue_due_date,
      issue_assignee_id,
      issue_assignee_first_name,
      issue_assignee_last_name,
      issue_assignee_email
    });
  }

  const typeLabel = () => {
    switch(issue_type) {
      case 'Bug':
        return <WarningIcon color="#ff3333" w={3} h={3} />;
      case 'Task':
        return <CheckCircleIcon color="lightgreen" w={3} h={3} />;
      default:
        return null;
    }
  }

  const priorityLabel = () => {
    switch(issue_priority) {
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
      <Td>{project_name}</Td>
      <Td>{typeLabel()} {issue_type}</Td>
      <Td>{issue_priority} {priorityLabel()}</Td>
      <Td>
        <StatusChange issue={issue} changeHandler={editIssueHandler} />
      </Td>
      <Td>{issue_name}</Td>
      <Td isNumeric>{issue_due_date.split('T')[0]}</Td>
    </Tr>
  );
}
