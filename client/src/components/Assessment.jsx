import React, {useState, useContext, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

import {AssessmentContext} from '../context/Assessment'
import {getAssessment} from '../actions/assessmentAction'


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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

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

export default function Assessment() {
  const classes = useStyles();

  const [course, setCourse] = useState()

  const {state, dispatch} = useContext(AssessmentContext)

  useEffect(() => {
    const defCourse = JSON.parse(localStorage.getItem("user")).course
    getAssessment({course: defCourse, dispatch})
  }, [])

  const handleSelectCourse = (event) => {
    setCourse(event.target.value)
  }

  const fetchAssessment = () => {
    getAssessment({course, dispatch})
  }

  return (
      <div>
          <form style={{marginBottom: ".5rem"}}>
            <FormGroup row style={{paddingLeft: ".5rem"}}>
                <TextField
                    id="outlined-basic"
                    // disabled={courseSelect.isChecked}
                    label="Set Course (e.g MCT504)"
                    variant="outlined"
                    name="course"
                    onChange={handleSelectCourse}
                    value={course}
                    style={{marginRight: ".8rem"}}
                    className={classes.inputs}
                />
                {/* <Divider orientation="vertical" flexItem style={{marginRight: "1.5rem", marginLeft:"1.5rem"}}/> */}
                <Button
                    variant="contained"
                    color="primary"
                    // className={classes.button}
                    startIcon={<ArrowForwardIcon />}
                    onClick={fetchAssessment}
                    size="small"
                    // style={{width: "8rem"}}
                    style={{marginRight: "1.8rem", width: "8rem"}}
                    className={classes.inputs}
                >
                    Fetch
                </Button>
            </FormGroup>
        </form>
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>STUDENT NAME</StyledTableCell>
                <StyledTableCell align="right">MAT NO.</StyledTableCell>
                <StyledTableCell align="right">ATTENDANCE COUNT</StyledTableCell>
                <StyledTableCell align="right">COURSE</StyledTableCell>
                {/* <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell> */}
                {/* <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
            </TableRow>
            </TableHead>
            <TableBody>
            {
                state && state.map((row) => (
                <StyledTableRow key={row.student._id}>
                <StyledTableCell component="th" scope="row">
                    {row.student.fullName}
                </StyledTableCell>
                <StyledTableCell align="right">{row.student.matNo}</StyledTableCell>
                <StyledTableCell align="right">{row.attendanceCount}</StyledTableCell>
                <StyledTableCell align="right">{row.course}</StyledTableCell>
                {/* <StyledTableCell align="right">{row.carbs}</StyledTableCell> */}
                {/* <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  );
}
