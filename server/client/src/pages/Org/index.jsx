import { useState } from 'react';
import { Button, Flex, useColorModeValue } from '@chakra-ui/react';

import CreateOrgModal from './CreateOrgModal';
import JoinOrgModal from './JoinOrgModal';

export default function Org(props) {
  let [showCreateModal, setShowCreateModal] = useState(false);
  let [showJoinModal, setShowJoinModal] = useState(false);

  return (
    <>
      <h1 style={{textAlign: 'center', margin: '50px 0px'}}>You must be a member of an organization:</h1>
      <Flex
        justifyContent="center"
        alignItems="center"
        bgColor={`${'white'}`}>
        <Button
          {...props}
          px={8}
          mx={2}
          bg={'teal.400'}  
          color={'white'}
          rounded={'md'}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
            bg: 'teal.500',
          }}
          onClick={() => {setShowCreateModal(!showCreateModal); console.log(showCreateModal);}}>
          Create Org
        </Button>
        <Button
          {...props}
          px={8}
          mx={2}
          bg={'teal.400'}  
          color={'white'}
          rounded={'md'}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
            bg: 'teal.500',
          }}
          onClick={() => {setShowJoinModal(!showJoinModal); console.log(showJoinModal);}}>
          Join Org
        </Button>
      </Flex>
      {showCreateModal ? <CreateOrgModal closeModalHandler={() => {setShowCreateModal(false)}} /> : null}
      {showJoinModal ? <JoinOrgModal closeModalHandler={() => {setShowJoinModal(false)}} /> : null}
    </>
  )
}