import { TableContainer, Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import { ArrowUpDownIcon } from '@chakra-ui/icons';

import { useSort } from '../../utils/useSort';
import { Issue } from './Issue';

export function IssuesTable({ data, editIssueHandler, showModalHandler }) {
  const [issues, sortBy] = useSort(data);

  return (
    <TableContainer marginTop={10}>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th onClick={() => sortBy('issue_type')} cursor="pointer">Type <ArrowUpDownIcon /></Th>
            <Th onClick={() => sortBy('issue_priority')} cursor="pointer">Priority <ArrowUpDownIcon /></Th>
            <Th onClick={() => sortBy('issue_status')} cursor="pointer">Status <ArrowUpDownIcon /></Th>
            <Th onClick={() => sortBy('issue_name')} cursor="pointer">Title <ArrowUpDownIcon /></Th>
            <Th onClick={() => sortBy('issue_due_date')} cursor="pointer" isNumeric>Due Date <ArrowUpDownIcon /></Th>
            <Th onClick={() => sortBy('issue_assignee_first_name')} cursor="pointer" isNumeric>Assignee <ArrowUpDownIcon /></Th>
          </Tr>
        </Thead>
        <Tbody>
          {issues.data.map(issue => <Issue key={issue.issue_id} issue={issue} editIssueHandler={editIssueHandler} showModalHandler={showModalHandler} />)}
        </Tbody>
      </Table>
    </TableContainer>
  );
}