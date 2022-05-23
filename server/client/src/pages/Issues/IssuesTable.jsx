import { TableContainer, Table as Tbl, TableCaption, Thead, Tbody, Tr, Th } from "@chakra-ui/react";

import { Issue } from './Issue';

export function IssuesTable({ data }) {
  return (
    <TableContainer marginTop={10}>
      <Tbl variant='simple'>
        <Thead>
          <Tr>
            <Th>Type</Th>
            <Th>Priority</Th>
            <Th>Status</Th>
            <Th>Title</Th>
            <Th isNumeric>Due</Th>
            <Th isNumeric>Assignee</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(issue => <Issue key={issue.id} {...issue} />)}
        </Tbody>
      </Tbl>
    </TableContainer>
  );
}