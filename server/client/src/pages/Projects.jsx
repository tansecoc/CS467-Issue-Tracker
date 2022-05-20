import { Table } from '../components/Table';

let projects = [
  {
    name: 'ExampleProject1',
    description: 'We are going to build something amazing!',
    openIssues: 1,
    closedIssues: 9
  },
  {
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