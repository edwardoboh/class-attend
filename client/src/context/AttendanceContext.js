import {createContext, useReducer} from 'react'
import attendanceReducer from '../reducers/attendanceReducer'

const initialState = []

export const AttendanceContext = createContext(initialState)

export const AttendanceProvider = ({children}) => {
    const [state, dispatch] = useReducer(attendanceReducer, initialState)
    return(
        <AttendanceContext.Provider value={{state, dispatch}}>
            {children}
        </AttendanceContext.Provider>
    )
}