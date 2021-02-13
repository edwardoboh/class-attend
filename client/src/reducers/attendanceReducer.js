import types from '../actions/types'

const attendanceReducer = (state, action) => {
    switch(action.type){
        case types.GET_ALL_ATTENDANCE:
            return action.payload
        case types.GET_ATTENDANCE_BY_COURSE:
            return action.payload
        case types.GET_ATTENDANCE_BY_DATE_AND_COURSE:
            // console.log("Attendance reducer: ",action.payload)
            return action.payload
        case types.DELETE_ATTENDANCE:
            return [...state.filter(item => (item._id !== action.payload))]
        default:
            return []
    }
}
export default attendanceReducer