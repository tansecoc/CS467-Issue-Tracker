import { TableContainer, Table as Tbl, TableCaption, Thead, Tbody, Tr, Th } from "@chakra-ui/react";

import { Project } from './Project';

export function Table({ projectsList }) {
  return (
    <TableContainer marginTop={10}>
      <Tbl variant='simple'>
        <TableCaption>Projects within Organization</TableCaption>
        <Thead>
          <Tr>
            <Th fontSize={15}>Project Name</Th>
            <Th>Description</Th>
            <Th isNumeric>Open Issues</Th>
            <Th isNumeric>Closed Issues</Th>
          </Tr>
        </Thead>
        <Tbody>
          {projectsList.map(project => <Project key={project.id} {...project} />)}
        </Tbody>
      </Tbl>
    </TableContainer>
  );
}