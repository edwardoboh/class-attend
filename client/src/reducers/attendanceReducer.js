import types from '../actions/types'
import { AccordionActions } from '@material-ui/core'
const attendance = {

}

const attendanceReducer = (state, action) => {
    switch(action.type){
        case types.GET_ALL_ATTENDANCE:
            return action.payload
        case types.GET_ATTENDANCE_BY_COURSE:
            return action.payload
        case types.GET_ATTENDANCE_BY_DATE_AND_COURSE:
            // console.log("Attendance reducer: ",action.payload)
            return action.payload
        default:
            return []
    }
}
export default attendanceReducer