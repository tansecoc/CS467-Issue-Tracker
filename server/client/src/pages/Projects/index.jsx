import { useEffect, useState } from 'react';

import { ProjectsTable as Table } from './ProjectsTable';
import { fakeAuthAPI } from '../../auth/fakeAuthAPI';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const projects = await fakeAuthAPI.get_projects();
      setProjects(projects);
    }
    fetchData();
  }, []);
  
  return (
    <Table data={projects}></Table>
  )
}