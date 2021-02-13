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
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import {AttendanceContext} from '../context/AttendanceContext'
// import {LecturerContext} from '../context/LecturerContext'
import {getAllAttendance, setCourse, getAttendanceByDateAndCourse, deleteAttendance} from '../actions/attendanceAction'
// import {useHistory, useRouteMatch} from 'react-router-dom'

import { CSVLink } from "react-csv";


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
  inputs: {
    marginTop: ".5rem",
    marginBottom: ".5rem",
  }
});


export default function Attendance() {
  const classes = useStyles();
  const {state, dispatch} = useContext(AttendanceContext)
  // const lecturer = useContext(LecturerContext)

  const [courseSelect, setCourseSelect] = useState({
    isChecked: false,
    course: "",
    date: "2021-02-01"
  })

  // const history = useHistory()

  // const {path, url} = useRouteMatch()

  const handleChangeCheck = (event) => {
    setCourseSelect({...courseSelect, [event.target.name]: event.target.checked})
    if(courseSelect.course){
      let lecturerName = JSON.parse(localStorage.getItem("user")).fullName
      let lecturerId = JSON.parse(localStorage.getItem("user"))._id
      // if(lecturer.state.user === {}){
        // lecturerName = JSON.parse(localStorage.getItem("user")).fullName
      // }
      setCourse({course: courseSelect.course, lecturerName, lecturerId})
    }
  }

  const handleChangeCourse = (event) => {
    setCourseSelect({...courseSelect, [event.target.name]: event.target.value})
  }

  const handleDateSelect = (event) => {
    setCourseSelect({...courseSelect, [event.target.name]: event.target.value})
  }

  const handleDateSubmit = () => {
    if(courseSelect.isChecked){
      if(!courseSelect.course || !courseSelect.date) return;
      const id = JSON.parse(localStorage.getItem("user"))._id
      getAttendanceByDateAndCourse({dispatch, courseSelect, id})
    }
  }

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("user"))._id
    // console.log(id)
    getAllAttendance({dispatch, id})
  }, [])

  const deleteAnAttendance = (id) => {
    deleteAttendance({dispatch, id})
  }
  
  return (
    <Paper>
      <form style={{marginBottom: ".5rem"}}>
        <FormGroup row style={{paddingLeft: ".5rem"}}>
          <TextField
            id="outlined-basic"
            disabled={courseSelect.isChecked}
            label="Set Course (e.g MCT504)"
            variant="outlined"
            name="course"
            onChange={handleChangeCourse}
            value={courseSelect.course}
            style={{marginRight: ".8rem"}}
            className={classes.inputs}
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
            className={classes.inputs}
          />
          <Divider orientation="vertical" flexItem style={{marginRight: "1.5rem", marginLeft:"1.5rem"}}/>
          <Button
            variant="contained"
            color="primary"
            // className={classes.button}
            startIcon={<ArrowForwardIcon />}
            onClick={handleDateSubmit}
            size="small"
            // style={{width: "8rem"}}
            style={{marginRight: "1.8rem", width: "8rem"}}
            className={classes.inputs}
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
                onChange={handleDateSelect}
                value={courseSelect.date}
                type="date"
                // style={{marginRight: ".8rem"}}
              />
            }
            label="Select Date"
            // style={{marginLeft: "1rem"}}
            className={classes.inputs}
          />
          <Divider orientation="vertical" flexItem style={{marginRight: "1.5rem", marginLeft:".8rem"}}/>
          {/* <Button
            variant="contained"
            color="primary"
            // className={classes.button}
            startIcon={<GetAppIcon />}
            // onClick={() => getAllAttendance({dispatch})}
            size="small"
            className={classes.inputs}
          >
            Download CSV
          </Button> */}
          <CSVLink
            data={state}
            headers={
              [
                { label: "Student Name", key: "studentName" },
                { label: "Card ID", key: "cardId" },
                { label: "Course", key: "course" },
                { label: "Lecturer", key: "lecturerName" },
                { label: "Date", key: "date" }
              ]
            }
            filename={`Attendance-${courseSelect.date}.csv`}
            className="btn btn-primary"
            target="_blank"
          >
            <Button
              variant="contained"
              color="primary"
              // className={classes.button}
              startIcon={<GetAppIcon />}
              // onClick={() => getAllAttendance({dispatch})}
              // size="small"
              className={classes.inputs}
            >
              Download CSV
            </Button>
          </CSVLink>
          <Divider orientation="vertical" flexItem style={{marginRight: "1.5rem", marginLeft:".8rem"}}/>
          <Button
            variant="outlined"
            color="primary"
            // className={classes.button}
            startIcon={<RefreshIcon />}
            onClick={() => getAllAttendance({dispatch, id: JSON.parse(localStorage.getItem("user"))._id})}
            size="small"
            className={classes.inputs}
          >
            Refresh
          </Button>
      </FormGroup>
    </form>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center"><strong style={{color: "red"}}>X</strong></StyledTableCell>
            <StyledTableCell>Student Name</StyledTableCell>
            <StyledTableCell align="right">Card ID</StyledTableCell>
            <StyledTableCell align="right">Course</StyledTableCell>
            <StyledTableCell align="right">Lecturer</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => ( */}
          {state && state.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell align="center">
                <IconButton aria-label="delete">
                  <DeleteIcon onClick={() => {deleteAnAttendance(row._id)}}/>
                </IconButton>
              </StyledTableCell>
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
