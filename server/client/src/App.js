import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, RequireAuth, RequireUnauth } from './auth/Auth';
import Org from './pages/Org';
import Projects from './pages/Projects';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
       <Routes>
          <Route element={<RequireUnauth />}>
            <Route index element={<Home />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
          </Route>
          <Route path="app" element={<RequireAuth><Layout /></RequireAuth>}>
            <Route path="org" element={<Org />} />
            <Route path="projects" element={<Projects />} />
            <Route path="issues" />
          </Route>
        </Routes>
        </AuthProvider>
      </ChakraProvider>
  );
}

export default App;
