import {
  Box,
  Flex,
  HStack,
  Link,
  Icon,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { IoIosRocket } from 'react-icons/io';

import { useAuth } from '../auth/Auth';

const Links = [
  {title: 'Dashboard', path: '/app'}, 
  {title: 'Projects', path: '/app/projects'},
  {title: 'Organization', path: '/app/org'}
];

const NavLink = ({ children, path }) => (
  <Link
    as={RouterLink}
    to={path}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}> 
    {children}
  </Link>
);

export default function PrivateNav() {
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  let auth = useAuth();
  let navigate = useNavigate();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Icon as={IoIosRocket} boxSize={8} /> 
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link.path} path={link.path}>{link.title}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>   
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
                _focus={{ boxShadow: "none", }}>
                <Icon as={FaUserCircle} boxSize={8} /> 
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate('/app/org')}>My Org</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => {
          auth.signout(() => navigate("/"));
        }}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}