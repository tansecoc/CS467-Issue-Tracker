import { TableContainer, Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";

import { useSort } from '../../utils/useSort';
import { Issue } from './Issue';

export function IssuesTable({ data }) {
  const [issues, sort] = useSort(data);
  console.log(data + ':' + issues.data);

  return (
    <TableContainer marginTop={10}>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th onClick={() => sort('type')} cursor="pointer">Type</Th>
            <Th onClick={() => sort('priority')} cursor="pointer">Priority</Th>
            <Th onClick={() => sort('status')} cursor="pointer">Status</Th>
            <Th onClick={() => sort('title')} cursor="pointer">Title</Th>
            <Th onClick={() => sort('dueDate')} cursor="pointer" isNumeric>Due Date</Th>
            <Th onClick={() => sort('assignee')} cursor="pointer" isNumeric>Assignee</Th>
          </Tr>
        </Thead>
        <Tbody>
          {issues.data.map(issue => <Issue key={issue.id} {...issue} />)}
        </Tbody>
      </Table>
    </TableContainer>
  );
}