import { Tr, Td } from '@chakra-ui/react';

export function Member({
  user_first_name,
  user_last_name,
  user_email
}) {


  return (
    <Tr cursor="pointer" _hover={{backgroundColor: 'gray.300'}}>
      <Td>{user_first_name}</Td>
      <Td>{user_last_name}</Td>
      <Td>{user_email}</Td>
    </Tr>
  );
}
