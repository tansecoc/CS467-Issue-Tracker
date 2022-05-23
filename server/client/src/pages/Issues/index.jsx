import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IssuesTable as Table } from './IssuesTable';
import { fakeAuthAPI } from '../../auth/fakeAuthAPI';

export default function Projects() {
  const params = useParams();
  const projectId = params.id;

  const [issues, setIssues] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const issuesData = await fakeAuthAPI.get_issues(projectId);
      setIssues(issuesData);
    }
    fetchData();
  }, []);
  
  return (
    <Table data={issues}></Table>
  )
}