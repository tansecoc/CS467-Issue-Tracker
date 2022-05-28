import { TableContainer, Table, Thead, Tbody, Tr, Th, Flex, Heading } from "@chakra-ui/react";
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
            <Th onClick={() => sortBy('title')} cursor="pointer">Project <ArrowUpDownIcon /></Th>
            <Th onClick={() => sortBy('type')} cursor="pointer">Type <ArrowUpDownIcon /></Th>
            <Th onClick={() => sortBy('priority')} cursor="pointer">Priority <ArrowUpDownIcon /></Th>
            <Th onClick={() => sortBy('status')} cursor="pointer">Status <ArrowUpDownIcon /></Th>
            <Th onClick={() => sortBy('title')} cursor="pointer">Title <ArrowUpDownIcon /></Th>
            <Th onClick={() => sortBy('dueDate')} cursor="pointer" isNumeric>Due Date <ArrowUpDownIcon /></Th>
          </Tr>
        </Thead>
        <Tbody>
          { issues.data.map(issue => <Issue key={issue.issue_id} issue={issue} editIssueHandler={editIssueHandler} showModalHandler={showModalHandler} />) }
        </Tbody>
      </Table>
    </TableContainer>
  );
}