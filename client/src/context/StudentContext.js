import {createContext, useReducer} from 'react'
import studentReducer from '../reducers/studentReducer'

const initialstate = []

export const StudentContext = createContext(initialstate)

export const StudentProvider = ({children}) => {
    const [state, dispatch] = useReducer(studentReducer, initialstate)
    return (
        <StudentContext.Provider value = {{state, dispatch}}>
            {children}
        </StudentContext.Provider>
    )
}