import { TableContainer, Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import { ArrowUpDownIcon } from '@chakra-ui/icons'

import { useSort } from '../../utils/useSort';
import { Member } from './Member';

export function MembersTable({ data }) {
  const [members, sortBy] = useSort(data);

  return (
    <TableContainer marginTop={10}>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th onClick={() => sortBy('user_first_name')} cursor="pointer">First Name <ArrowUpDownIcon /></Th>
            <Th onClick={() => sortBy('user_last_name')} cursor="pointer">Last Name <ArrowUpDownIcon /></Th>
            <Th onClick={() => sortBy('user_email')} cursor="pointer">Email <ArrowUpDownIcon /></Th>
          </Tr>
        </Thead>
        <Tbody>
          {members.data.map(member => <Member key={member.user_id} {...member} />)}
        </Tbody>
      </Table>
    </TableContainer>
  );
}