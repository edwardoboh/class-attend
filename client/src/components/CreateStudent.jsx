import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper'
// import Input from '@material-ui/core/Input'
// import Typography from '@material-ui/core/Typography'
import { useState, useContext } from 'react';
import {addStudent} from '../actions/studentActions'
import {StudentContext} from '../context/StudentContext'

const useStyles2 = makeStyles((theme) => ({
  root: {
    '& > *': {
    //   margin: theme.spacing(1),
    //   width: '25ch',
    padding: theme.spacing(.5)
    },
  },
}));

const useStyles = makeStyles(theme => ({
    root: {
        // display: 'flex'
    },
    formControl: {
        margin: theme.spacing(4)
    },
    paper: {
        position: 'absolute',
        width: 800,
        height: 600,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
}))

export default function CreateStudent() {
  const classes = useStyles();
  const classes2 = useStyles2();
  const courses = ["MCT502", "MCT304", "MCT508", "MCT516", "MCT506", "MCT510", "MCT313", "MCT528", "MCT524", "MCT526", "MCT512", "MCT504", "MCT314", "FET504"]
  const [state, setState] = useState({
     MCT502: false, MCT304: false, MCT508: true, MCT516: true, MCT506: false, MCT510: false, MCT313: false, MCT528: true, MCT524: false, MCT526: false, MCT512: false, MCT504: false, MCT314: false, FET504: false
  })

  const student = useContext(StudentContext)

  const [formState, setFormState] = useState({
      cardId: "",
      fullName: "",
      matNo: "",
      dept: "",
      level: "",
      phone: "",
      imgUrl: ""
  })

//   const {MCT502, MCT304, MCT508, MCT516, MCT506, MCT510, MCT313, MCT528, MCT524, MCT526, MCT512, MCT504, MCT314, FET504} = state
//   const error = [MCT502, MCT304, MCT508, MCT516, MCT506, MCT510, MCT313, MCT528, MCT524, MCT526, MCT512, MCT504, MCT314, FET504].filter(one => one).length < 3
const error = false

  const getCourses = () => {
      return courses.filter(course => state[course])
  }

  const handleChange = (event) => {
      setState({...state, [event.target.name]: event.target.checked})
  }

  const handleFormChange = (e) => {
      setFormState({...formState, [e.target.name]: e.target.value})
  }

  const handleFormSubmit = (e) => {
      const theSelectCourse = getCourses()
      addStudent({dispatch: student.dispatch, newStudent: {...formState, courses: theSelectCourse}})
  }

  return (
    <Paper style={{top: `50%`, left: `50%`, transform: `translate(-50%, -50%)`}} className={classes.paper}>
        {/* <Typography variant="h6" gutterBottom>
            CREATE STUDENT
      </Typography> */}
      {/* <Button
            variant="contained"
            color="primary"
            style={{margin: ".5rem"}}
            onClick={handleFormSubmit}
            fullWidth
        >
            CREATE STUDENT
        </Button> */}
    <form className={classes2.root} noValidate autoComplete="off">
      <TextField id="outlined-basic1" onChange={handleFormChange} name="fullName" value={formState.fullName} label="Full Name"  variant="outlined" />
      <TextField id="outlined-basic2" onChange={handleFormChange} name="matNo" value={formState.matNo} label="Mat No."  variant="outlined" />
      <TextField id="outlined-basic3" onChange={handleFormChange} name="cardId" value={formState.cardId} label="Card ID" variant="outlined" />
        <TextField id="outlined-basic4" name="imgUrl" label="" accept="image/*" placeholder="select image" variant="outlined" style={{width:"93%"}} type="file"/>
      <TextField id="outlined-basic5" onChange={handleFormChange} name="dept" value={formState.dept} label="Department" variant="outlined" />
      <TextField id="outlined-basic6" onChange={handleFormChange} name="level" value={formState.level} label="Level" variant="outlined" />
      <TextField id="outlined-basic7" onChange={handleFormChange} name="phone" value={formState.phone} label="Phone Number" variant="outlined" />
      <Paper variant="outlined">
        <FormControl required error={error} component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Select Your Courses</FormLabel>
            <FormGroup>
            <FormControlLabel
                control={<Checkbox onChange={handleChange} name="MCT502" />}
                label="MCT502"
            />
            <FormControlLabel
                control={<Checkbox onChange={handleChange} name="MCT516" />}
                label="MCT516"
            />
            <FormControlLabel
                control={<Checkbox onChange={handleChange} name="MCT313" />}
                label="MCT313"
            />
            <FormControlLabel
                control={<Checkbox onChange={handleChange} name="MCT526" />}
                label="MCT526"
            />
            <FormControlLabel
                control={<Checkbox onChange={handleChange} name="MCT314" />}
                label="MCT314"
            />
            </FormGroup>
            {/* <FormHelperText>Must Offer three Courses at least</FormHelperText> */}
            <FormHelperText>Must Select one from each section*</FormHelperText>
        </FormControl>
        <FormControl required error={error} component="fieldset" className={classes.formControl}>
            <FormLabel component="legend"></FormLabel>
            <FormGroup>
            <FormControlLabel
                control={<Checkbox onChange={handleChange} name="MCT304" />}
                label="MCT304"
            />
            <FormControlLabel
                control={<Checkbox onChange={handleChange} name="MCT506" />}
                label="MCT506"
            />
            <FormControlLabel
                control={<Checkbox onChange={handleChange} name="MCT528" />}
                label="MCT528"
            />
            <FormControlLabel
                control={<Checkbox onChange={handleChange} name="MCT512" />}
                label="MCT512"
            />
            <FormControlLabel
                control={<Checkbox onChange={handleChange} name="MCT504" />}
                label="MCT504"
            />
            </FormGroup>
            {/* <FormHelperText>Must Offer a Course here</FormHelperText> */}
        </FormControl>
        <FormControl required error={error} component="fieldset" className={classes.formControl}>
            <FormLabel component="legend"></FormLabel>
            <div></div>
            <FormGroup>
            <FormControlLabel
                control={<Checkbox onChange={handleChange} name="MCT508" />}
                label="MCT508"
            />
            <FormControlLabel
                control={<Checkbox onChange={handleChange} name="MCT510" />}
                label="MCT510"
            />
            <FormControlLabel
                control={<Checkbox onChange={handleChange} name="MCT524" />}
                label="MCT524"
            />
            <FormControlLabel
                control={<Checkbox onChange={handleChange} name="MCT504" />}
                label="MCT504"
            />
            </FormGroup>
            {/* <FormHelperText>Must Offer a Course here</FormHelperText> */}
        </FormControl>
        </Paper>
    </form>
        <Button
            variant="contained"
            color="primary"
            style={{margin: ".5rem"}}
            onClick={handleFormSubmit}
            fullWidth
        >
            CREATE STUDENT
        </Button>
        </Paper>
  );
}