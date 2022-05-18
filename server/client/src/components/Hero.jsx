import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import { Logo } from './Logo';

export default function Hero() {
  return (
    <>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
          >
          <Logo />
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Boost your Productivity <br />with&nbsp; 
            <Text as={'span'} color={'green.400'}>
              Issue Tracker
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Keep your team in sync by managing all of your development team's progress with Issue Tracker. Consistently ranked the favorite productivity tool among OSU students in 2022.
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <RouterLink to="/signup">
              <Button
                colorScheme={'green'}
                bg={'green.400'}
                rounded={'full'}
                px={6}
                _hover={{
                  bg: 'green.500',
                }}>
                Get Started Free
              </Button>
            </RouterLink>
         </Stack>
        </Stack>
      </Container>
    </>
  );
}
