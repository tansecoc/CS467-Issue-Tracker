import { TableContainer, Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";

import { useSort } from '../../utils/useSort';
import { Project } from './Project';

export function ProjectsTable({ data }) {
  const [projects, sortBy] = useSort(data);

  return (
    <TableContainer marginTop={10}>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th fontSize={15} onClick={() => sortBy('name')} cursor="pointer">Project Name</Th>
            <Th onClick={() => sortBy('description')} cursor="pointer">Description</Th>
            <Th onClick={() => sortBy('openIssues')} cursor="pointer" isNumeric>Open Issues</Th>
            <Th onClick={() => sortBy('closedIssues')} cursor="pointer" isNumeric>Closed Issues</Th>
            <Th w={40}></Th>
          </Tr>
        </Thead>
        <Tbody>
          {projects.data.map(project => <Project key={project.id} {...project} />)}
        </Tbody>
      </Table>
    </TableContainer>
  );
}