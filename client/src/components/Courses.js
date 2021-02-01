import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles'

const columns = [
  { field: 'id', headerName: 'S/N', width: 100 },
  { field: 'courseCode', headerName: 'Course Code', width: 200 },
  // { field: 'lastName', headerName: 'Last name', width: 130 },
  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   type: 'number',
  //   width: 90,
  // },
  {
    field: 'courseTitle',
    headerName: 'Course Tile',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    // valueGetter: (params) =>
      // `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  },
];

const rows = [
  { id: 1, courseCode: 'Snow', courseTitle: '', age: 35 },
  { id: 2, courseCode: 'Lannister', courseTitle: 'Cersei', age: 42 },
  { id: 3, courseCode: 'Lannister', courseTitle: 'Jaime', age: 45 },
  { id: 4, courseCode: 'Stark', courseTitle: 'Arya', age: 16 },
  { id: 5, courseCode: 'Targaryen', courseTitle: 'Daenerys', age: null },
  { id: 6, courseCode: 'Melisandre', courseTitle: null, age: 150 },
  { id: 7, courseCode: 'Clifford', courseTitle: 'Ferrara', age: 44 },
  { id: 8, courseCode: 'Frances', courseTitle: 'Rossini', age: 36 },
  { id: 9, courseCode: 'Roxie', courseTitle: 'Harvey', age: 65 },
];
// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

const useStyles = makeStyles({
  title: {
    flex: '1 1 100%',
  }
})

export default function Courses() {
  const classes = useStyles()
  // const {state, dispatch} = useContext()
  return (
    <>
      <Typography className={classes.title} variant="h5" id="tableTitle" component="div">
            Courses
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
    </>
  );
}
