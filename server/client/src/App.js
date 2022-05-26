import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider, RequireAuth, RequireUnauth } from './auth/Auth';
import { RequireOrg } from './components/RequireOrg';
import Layout from './components/Layout';
import * as Pages from './pages';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
       <Routes>
          <Route element={<RequireUnauth />}>
            <Route index element={<Pages.Home />} />
            <Route path="signup" element={<Pages.SignUp />} />
            <Route path="signin" element={<Pages.SignIn />} />
          </Route>
          <Route path="app" element={<RequireAuth><Layout /></RequireAuth>}>
            <Route path="org" element={<Pages.Org />} />
            <Route element={<RequireOrg />}>
              <Route path="" element={<h1>Dashboard</h1>} />
              <Route path="projects" element={<Pages.Projects />} />
              <Route path="project/:id" element={<Pages.Issues />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
