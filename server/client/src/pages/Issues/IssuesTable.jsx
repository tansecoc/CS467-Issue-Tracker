import { TableContainer, Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import { ArrowUpDownIcon } from '@chakra-ui/icons';

import { useSort } from '../../utils/useSort';
import { Issue } from './Issue';

export function IssuesTable({ data, showEditModalHandler }) {
  const [issues, sortBy] = useSort(data);

  return (
    <TableContainer marginTop={10}>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th onClick={() => sortBy('type')} cursor="pointer">Type <ArrowUpDownIcon /></Th>
            <Th onClick={() => sortBy('priority')} cursor="pointer">Priority <ArrowUpDownIcon /></Th>
            <Th onClick={() => sortBy('status')} cursor="pointer">Status <ArrowUpDownIcon /></Th>
            <Th onClick={() => sortBy('title')} cursor="pointer">Title <ArrowUpDownIcon /></Th>
            <Th onClick={() => sortBy('dueDate')} cursor="pointer" isNumeric>Due Date <ArrowUpDownIcon /></Th>
            <Th onClick={() => sortBy('assignee')} cursor="pointer" isNumeric>Assignee <ArrowUpDownIcon /></Th>
          </Tr>
        </Thead>
        <Tbody>
          {issues.data.map(issue => <Issue key={issue.id} {...issue} showEditModalHandler={showEditModalHandler} />)}
        </Tbody>
      </Table>
    </TableContainer>
  );
}