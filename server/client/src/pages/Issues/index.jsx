import { useEffect, useState } from 'react';

import { Table } from '../Projects/Table';
import { fakeAuthAPI } from '../../auth/fakeAuthAPI';

export default function Projects() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const issuesData = await fakeAuthAPI.get_issues();
      setIssues(issuesData);
    }
    fetchData();
  }, []);
  
  return (
    <Table data={issues}></Table>
  )
}