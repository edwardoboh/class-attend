import React, {useContext, useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import RefreshIcon from '@material-ui/icons/Refresh';
import Divider from '@material-ui/core/Divider'
import GetAppIcon from '@material-ui/icons/GetApp';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import {AttendanceContext} from '../context/AttendanceContext'
import {LecturerContext} from '../context/LecturerContext'
import {getAllAttendance, setCourse} from '../actions/attendanceAction'
import {useHistory, useRouteMatch} from 'react-router-dom'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});


export default function Attendance() {
  const classes = useStyles();
  const {state, dispatch} = useContext(AttendanceContext)
  const lecturer = useContext(LecturerContext)

  const [courseSelect, setCourseSelect] = useState({
    isChecked: false,
    course: null
  })

  useEffect(() => {
  }, [])

  const history = useHistory()

  const {path, url} = useRouteMatch()

  const handleChangeCheck = (event) => {
    setCourseSelect({...courseSelect, [event.target.name]: event.target.checked})
    if(courseSelect.course){
      let lecturerName = ""
      if(lecturer.state.user === {}){
        lecturerName = JSON.parse(localStorage.getItem("user")).fullName
      }
      setCourse({course: courseSelect.course, lecturerName})
    }
  }

  const handleChangeCourse = (event) => {
    setCourseSelect({...courseSelect, [event.target.name]: event.target.value})
  }

  useEffect(() => {
    getAllAttendance({dispatch})
  }, [])

  return (
    <Paper>
      <form style={{marginBottom: ".8rem"}}>
        <FormGroup row>
          <TextField
            id="outlined-basic"
            disabled={courseSelect.isChecked}
            label="Set Course"
            variant="outlined"
            name="course"
            onChange={handleChangeCourse}
            value={courseSelect.course}
            style={{marginRight: ".8rem"}}
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.courseSelect}
                onChange={handleChangeCheck}
                name="isChecked"
                color="primary"
              />
            }
            label="Set"
            // style={{marginRight: ".8rem"}}
          />
          <Divider orientation="vertical" flexItem style={{marginRight: "2rem", marginLeft:"2rem"}}/>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<ArrowForwardIcon />}
            // onClick={() => getAllAttendance({dispatch})}
            size="small"
            // style={{width: "8rem"}}
            style={{marginRight: "2rem", width: "8rem"}}
          >
            Fetch
          </Button>
          <FormControlLabel
            control={
              <TextField
                id="outlined-basic"
                // disabled={}
                // label="Set Course"
                variant="outlined"
                name="date"
                // onChange={}
                // value={}
                type="date"
                // style={{marginRight: ".8rem"}}
              />
            }
            label="Select Date"
            // style={{marginLeft: "1rem"}}
          />
          <Divider orientation="vertical" flexItem style={{marginRight: "2rem", marginLeft:"2rem"}}/>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<GetAppIcon />}
            // onClick={() => getAllAttendance({dispatch})}
            size="small"
          >
            Download CSV
          </Button>
          <Divider orientation="vertical" flexItem style={{marginRight: "2rem", marginLeft:"2rem"}}/>
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            startIcon={<RefreshIcon />}
            onClick={() => getAllAttendance({dispatch})}
            size="small"
          >
            Refresh
          </Button>
      </FormGroup>
    </form>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Student Name</StyledTableCell>
            <StyledTableCell align="right">Card ID</StyledTableCell>
            <StyledTableCell align="right">Course</StyledTableCell>
            <StyledTableCell align="right">Lecturer</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => ( */}
          {state.map((row) => (
            <StyledTableRow key={row.studentId}>
              <StyledTableCell component="th" scope="row">
                {row.studentName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.cardId}</StyledTableCell>
              <StyledTableCell align="right">{row.course}</StyledTableCell>
              <StyledTableCell align="right">{row.lecturerName}</StyledTableCell>
              <StyledTableCell align="right">{row.date}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
}
