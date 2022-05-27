import { useEffect, useState } from 'react';
import { Heading, Button, Flex } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons';

import { useAuth } from '../../auth/Auth';

import { MembersTable as Table } from './MembersTable';
import { InviteCodeModal } from './InviteCodeModal';
import { LeaveOrg } from './LeaveOrg';

export default function Projects() {
  const auth = useAuth()
  const orgName = auth.user.orgName;

  const [members, setMembers] = useState([]);
  const [showInviteModal, setShowInviteModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/orgs/users');
        if (res.ok) {
          let membersData = await res.json();
          setMembers(membersData);
        }
      }
      catch(err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const closeInviteModalHandler = () => {setShowInviteModal(false)};
  
  return (
    <>
      <Flex justify={'space-between'} px={6} pt={8} mb={-4}>
        <Heading as={'h1'} size={'md'}>{orgName} Members</Heading>
        <Flex>
          <Button
            variant={'solid'}
            colorScheme={'teal'}
            size={'sm'}
            mr={4}
            leftIcon={<AddIcon />}
            onClick={() => {setShowInviteModal(!showInviteModal);}}>
            Invite
          </Button>
          <LeaveOrg />
        </Flex>
      </Flex>
      <Table data={members}></Table>
      {showInviteModal ? <InviteCodeModal closeModalHandler={closeInviteModalHandler} /> : null}
    </>
  );
}