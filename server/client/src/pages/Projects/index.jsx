import { useEffect, useState } from 'react';

import { ProjectsTable as Table } from './ProjectsTable';
import { fakeAPI } from '../../auth/fakeAPI';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const projects = await fakeAPI.get_projects();
      setProjects(projects);
    }
    fetchData();
  }, []);
  
  return (
    <Table data={projects}></Table>
  )
}