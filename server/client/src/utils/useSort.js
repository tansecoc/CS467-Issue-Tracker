import { useState, useEffect } from 'react';

export function useSort(data) {
  const [issues, setIssues] = useState({ data: [...data], sortedBy: '', isReversed: false});

  useEffect(() => {
    setIssues(() => ({data: data, sortedBy: ''}));
  }, [data])

  function sortBy(key) {
    if( issues.data === null || issues.data || undefined || issues.length <= 0) return;
    setIssues((prev) => {
      let newIssues = [...prev.data];
      if (prev.sortedBy === key) {
        newIssues.reverse();
        return { data: newIssues, sortedBy: key, isReversed: !prev.isReversed};
      } else {
        if (key === 'priority') {
          let priorityToNum = (priority) => {
            switch(priority) {
              case 'High':
                return 3;
              case 'Med':
                return 2;
              case 'Low':
                return 1;
              default:
                return 0;
            }
          };

          newIssues.sort((a, b) => priorityToNum(a[key]) - priorityToNum(b[key]));
        }
        else if (typeof newIssues[0][key] === 'string') {
          newIssues.sort((a, b) => a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1);
        } else {
          newIssues.sort((a, b) => a[key] - b[key]);
        }
        return { data: newIssues, sortedBy: key, isReversed: false };
      }
    });
  }

  return [issues, sortBy];
}