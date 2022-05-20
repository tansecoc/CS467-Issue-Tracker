import { Table } from '../components/Table';

let projects = [
  {
    id: 0,
    name: 'ExampleProject1',
    description: 'We are going to build something amazing!',
    openIssues: 1,
    closedIssues: 9
  },
  {
    id: 1,
    name: 'ExampleProject2',
    description: 'Solving big other issues',
    openIssues: 2,
    closedIssues: 14
  } 
];

export default function Projects() {
  return (
    <Table projectsList={projects}></Table>
  )
}