import { useState } from 'react';
import { Select } from '@chakra-ui/react';

import { statusOptions } from '../models/status';

export function StatusChange({issue, changeHandler}) {
  const [status, setStatus] = useState(issue.issue_status);

  const statusChangeHandler = (e) => {
    setStatus(e.target.value);
    changeHandler({...issue, issue_status: e.target.value});
  }

  return (
    <Select 
      id="issue_status"
      variant='outline' 
      value={status}
      w={150}
      onClick={e => e.stopPropagation()}
      onChange={statusChangeHandler}>
        {statusOptions.map(status => <option id={status} value={status}>{status}</option>)}
    </Select>
  );
}