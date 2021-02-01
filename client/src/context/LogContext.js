import React, {createContext, useReducer} from 'react'
import logReducer from '../reducers/logReducer'

const initialState = []

export const LogContext = createContext(initialState)

const LogProvider = ({children}) => {
    const [state, dispatch] = useReducer(logReducer, initialState)
    return(
        <LogContext.Provider value={{state, dispatch}}>
            {children}
        </LogContext.Provider>
    )
}

export default LogProvider