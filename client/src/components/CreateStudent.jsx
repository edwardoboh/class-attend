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
import Input from '@material-ui/core/Input'
import Typography from '@material-ui/core/Typography'
import { useState } from 'react';

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
  const courses = ["MECH", "CPE", "CVE", "PRE", "MTH", "ENG", "GST", "PHY", "CHE", "CHM", "EEE", "GEO"]
  const [state, setState] = useState({
      MECH: true,
      CPE: false,
      CVE: false,
      PRE: false,
      MTH: true,
      ENG: true,
      GST: false,
      PHY: false,
      CHE: false,
      CHM: true,
      EEE: false,
      GEO: true
  })

  const [formState, setFormState] = useState({
      cardId: null,
      fullName: null,
      matNo: null,
      departmant: null,
      level: null,
      phone: null,
      imgUrl: null
  })

  const {MECH, CPE, CVE, PRE, MTH, ENG, GST, PHY, CHE, CHM, EEE, GEO} = state
  const error = [MECH, CPE, CVE, PRE, MTH, ENG, GST, PHY, CHE, CHM, EEE, GEO].filter(one => one).length < 3

  const getCourses = () => {
      return courses.filter(course => state[course])
  }

  const handleChange = (event) => {
      setState({...state, [event.target.name]: event.target.checked})
  }

  const handleFormChange = (e) => {
      setFormState({...formState, [e.target.name]: e.target.value})
  }


  return (
    <Paper style={{top: `50%`, left: `50%`, transform: `translate(-50%, -50%)`}} className={classes.paper}>
        <Typography variant="h6" gutterBottom>
            CREATE STUDENT
      </Typography>
    <form className={classes2.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" onChange={handleFormChange} name="fullName" value={formState.fullName} label="Full Name"  variant="outlined" />
      <TextField id="outlined-basic" onChange={handleFormChange} name="matNo" value={formState.matNo} label="Mat No."  variant="outlined" />
      <TextField id="outlined-basic" onChange={handleFormChange} name="cardId" value={formState.cardId} label="Card ID" variant="outlined" />
        <TextField id="outlined-basic" name="imgUrl" label="" accept="image/*" placeholder="select image" variant="outlined" style={{width:"93%"}} type="file"/>
      <TextField id="outlined-basic" onChange={handleFormChange} name="department" value={formState.departmant} label="Department" variant="outlined" />
      <TextField id="outlined-basic" onChange={handleFormChange} name="level" value={formState.level} label="Level" variant="outlined" />
      <TextField id="outlined-basic" onChange={handleFormChange} name="phone" value={formState.phone} label="Phone Number" variant="outlined" />
      <Paper variant="outlined">
        <FormControl required error={error} component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Select 3 Courses at Least</FormLabel>
            <FormGroup>
            <FormControlLabel
                control={<Checkbox checked={MECH} onChange={handleChange} name="MECH" />}
                label="MECH"
            />
            <FormControlLabel
                control={<Checkbox checked={CPE} onChange={handleChange} name="CPE" />}
                label="CPE"
            />
            <FormControlLabel
                control={<Checkbox checked={CVE} onChange={handleChange} name="CVE" />}
                label="CVE"
            />
            <FormControlLabel
                control={<Checkbox checked={PRE} onChange={handleChange} name="PRE" />}
                label="PRE"
            />
            </FormGroup>
            {/* <FormHelperText>Must Offer three Courses at least</FormHelperText> */}
            <FormHelperText>Must Select one from each section*</FormHelperText>
        </FormControl>
        <FormControl required error={error} component="fieldset" className={classes.formControl}>
            <FormLabel component="legend"></FormLabel>
            <FormGroup>
            <FormControlLabel
                control={<Checkbox checked={MTH} onChange={handleChange} name="MTH" />}
                label="MTH"
            />
            <FormControlLabel
                control={<Checkbox checked={CHE} onChange={handleChange} name="CHE" />}
                label="CHE"
            />
            <FormControlLabel
                control={<Checkbox checked={ENG} onChange={handleChange} name="ENG" />}
                label="ENG"
            />
            <FormControlLabel
                control={<Checkbox checked={GST} onChange={handleChange} name="GST" />}
                label="GST"
            />
            </FormGroup>
            {/* <FormHelperText>Must Offer a Course here</FormHelperText> */}
        </FormControl>
        <FormControl required error={error} component="fieldset" className={classes.formControl}>
            <FormLabel component="legend"></FormLabel>
            <div></div>
            <FormGroup>
            <FormControlLabel
                control={<Checkbox checked={PHY} onChange={handleChange} name="PHY" />}
                label="PHY"
            />
            <FormControlLabel
                control={<Checkbox checked={CHM} onChange={handleChange} name="CHM" />}
                label="CHM"
            />
            <FormControlLabel
                control={<Checkbox checked={EEE} onChange={handleChange} name="EEE" />}
                label="EEE"
            />
            <FormControlLabel
                control={<Checkbox checked={GEO} onChange={handleChange} name="GEO" />}
                label="GEO"
            />
            </FormGroup>
            {/* <FormHelperText>Must Offer a Course here</FormHelperText> */}
        </FormControl>
        </Paper>
    </form>
        <Button
            variant="contained"
            color="primary"
            style={{width: 200, marginTop: "1rem"}}
        >
            ADD
        </Button>
        </Paper>
  );
}