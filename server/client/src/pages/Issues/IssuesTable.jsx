import { TableContainer, Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";

import { useSort } from '../../utils/useSort';
import { Issue } from './Issue';

export function IssuesTable({ data }) {
  const [issues, sortBy] = useSort(data);

  return (
    <TableContainer marginTop={10}>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th onClick={() => sortBy('type')} cursor="pointer">Type</Th>
            <Th onClick={() => sortBy('priority')} cursor="pointer">Priority</Th>
            <Th onClick={() => sortBy('status')} cursor="pointer">Status</Th>
            <Th onClick={() => sortBy('title')} cursor="pointer">Title</Th>
            <Th onClick={() => sortBy('dueDate')} cursor="pointer" isNumeric>Due Date</Th>
            <Th onClick={() => sortBy('assignee')} cursor="pointer" isNumeric>Assignee</Th>
          </Tr>
        </Thead>
        <Tbody>
          {issues.data.map(issue => <Issue key={issue.id} {...issue} />)}
        </Tbody>
      </Table>
    </TableContainer>
  );
}