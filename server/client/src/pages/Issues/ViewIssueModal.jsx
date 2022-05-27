import ViewIssueDetails from './ViewIssueDetails';

export function ViewIssueModal({ issueInfo, removeIssue, closeModalHandler, showEditModalHandler}) {
  return (
    <div onClick={closeModalHandler} style={{position: 'absolute', top: 0, left: 0, height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(203, 213, 224, 0.3)'}}>
      <ViewIssueDetails issueInfo={issueInfo} removeIssue={removeIssue} closeModalHandler={closeModalHandler} showEditModalHandler={showEditModalHandler} />
    </div>
  );
}