import { useEffect, useState } from 'react';

import { Table } from '../components/Table';
import { fakeAuthAPI } from '../auth/fakeAuthAPI';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const projects = await fakeAuthAPI.get_projects();
      console.log(projects);
      setProjects(projects);
    }
    fetchData();
  }, []);
  
  return (
    <Table projectsList={projects}></Table>
  )
}