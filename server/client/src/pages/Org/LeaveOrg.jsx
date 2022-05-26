import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../auth/Auth';

export function LeaveOrg() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  let navigate = useNavigate();
  let auth = useAuth();

  const leaveHandler = () => {
    auth.leaveOrg(() => navigate('/app/add-org'));
  }

  return (
    <>
      <Button
        variant={'solid'}
        colorScheme={'red'}
        size={'sm'}
        mr={4}
        onClick={onOpen}>
        Leave Org
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Leave Organization
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={leaveHandler} ml={3}>
                Leave
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}