import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Heading, Button, Flex } from '@chakra-ui/react';

import { postData } from '../../utils/postData';

import { IssuesTable as Table } from './IssuesTable';
import { ViewIssueModal } from './ViewIssueModal';
import { CreateIssueModal } from './CreateIssueModal';
import { EditIssueModal } from './EditIssueModal';

export default function Projects() {
  const [issues, setIssues] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [issueInfo, setIssueInfo] = useState({issue_id: null, issue_type: null, issue_priority: null, issue_status: null, issue_name: null, issue_description: null, issue_due_date: null, issue_assignee_email: null});

  const params = useParams();
  const project_id = params.id;
  const { state } = useLocation();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/issues`);
        if(res.ok) {
          let issuesData = await res.json();
          setIssues(issuesData);
        }
      }
      catch(err) {
        console.error(err);
      }
    }
    fetchData();
  }, [state]);

  const closeViewModalHandler = () => {setShowViewModal(false)};
  const closeCreateModalHandler = () => {setShowCreateModal(false)};
  const closeEditModalHandler = () => {setShowEditModal(false)};
  const showViewModalHandler = (issueInfo) => {
    setIssueInfo(issueInfo);
    setShowCreateModal(false);
    setShowEditModal(false);
    setShowViewModal(true);
  };
  const showEditModalHandler = () => {
    setShowCreateModal(false);
    setShowViewModal(false);
    setShowEditModal(true);
  };

  const addIssue = async (newIssue) => {
    try {
      let res = await postData(`/api/issues`, { project_id, ...newIssue });
      if(res) {
        try {
          const res = await fetch(`/api/projects/${project_id}/issues`);
          if(res.ok) {
            let issuesData = await res.json();
            setIssues(issuesData);
          }
        }
        catch(err) {
          console.error(err);
        }
      }
      closeCreateModalHandler();
    }
    catch(err) {
      console.error(err);
    }
  }

  const editIssueHandler = async (newInfo) => {
    try {
      let res = await fetch(`/api/issues/${newInfo.issue_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newInfo)
      });
      if (res.ok) {
        setIssues(prev => {
          return prev.map(issue => {
            if (issue.issue_id === newInfo.issue_id) {
              return newInfo;
            }
            return issue;
          });
        });
      } else {
        console.error('Unable to update');
      }
      closeEditModalHandler();
    }
    catch(err) {
      console.error(err);
    }
  }

  const removeIssue = (issue_id) => {
    setIssues(prev => prev.filter(issue => issue.issue_id !== issue_id));
  }
  
  return (
    <>
      <Flex direction={'column'} px={6} pt={8} mb={-4}>
        <Heading as={'h1'} size={'md'} mb={2}>Your Issues</Heading>
        <p>All issues assigned to you.</p>
      </Flex>
      <Table data={issues} editIssueHandler={editIssueHandler} showModalHandler={showViewModalHandler}></Table>
      {showViewModal ? <ViewIssueModal issueInfo={issueInfo} removeIssue={removeIssue} closeModalHandler={closeViewModalHandler} editIssueHandler={editIssueHandler} showEditModalHandler={showEditModalHandler} /> : null}
      {showCreateModal ? <CreateIssueModal addIssue={addIssue} closeModalHandler={closeCreateModalHandler} /> : null}
      {showEditModal ? <EditIssueModal issueInfo={issueInfo} editIssueHandler={editIssueHandler} closeModalHandler={closeEditModalHandler}  /> : null}
    </>
  )
}