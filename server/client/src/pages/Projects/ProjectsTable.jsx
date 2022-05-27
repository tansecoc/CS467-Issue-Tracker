import { TableContainer, Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import { ArrowUpDownIcon } from '@chakra-ui/icons'

import { useSort } from '../../utils/useSort';
import { Project } from './Project';

export function ProjectsTable({ data, showEditModalHandler }) {
  const [projects, sortBy] = useSort(data);

  return (
    <TableContainer marginTop={10}>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th onClick={() => sortBy('name')} cursor="pointer">Project Name <ArrowUpDownIcon /></Th>
            <Th onClick={() => sortBy('description')} cursor="pointer">Description <ArrowUpDownIcon /></Th>
            <Th onClick={() => sortBy('openIssues')} cursor="pointer" isNumeric>Open Issues <ArrowUpDownIcon /></Th>
            <Th onClick={() => sortBy('closedIssues')} cursor="pointer" isNumeric>Closed Issues <ArrowUpDownIcon /></Th>
            <Th w={40}></Th>
          </Tr>
        </Thead>
        <Tbody>
          {projects.data.map(project => <Project key={project.project_id} {...project} showEditModalHandler={showEditModalHandler} />)}
        </Tbody>
      </Table>
    </TableContainer>
  );
}