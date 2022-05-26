import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider, RequireAuth, RequireUnauth, RequireOrg } from './auth/Auth';
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
            <Route path="add-org" element={<Pages.AddOrg />} />
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
