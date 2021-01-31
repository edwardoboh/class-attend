import React, {createContext, useReducer} from 'react'
import LecturerReducer from '../reducers/lecturerReducer'

const initialState = {}
export const LecturerContext = createContext(initialState)

export const LecturerProvider = ({children}) => {
    const [state, dispatch] = useReducer(LecturerReducer, initialState)
    return (
        <LecturerContext.Provider value={{state, dispatch}}>
            {children}
        </LecturerContext.Provider>
    )
}