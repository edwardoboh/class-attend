import React, {createContext, useReducer, useContext} from 'react'
import ErrorReducer from '../reducers/errorReducer'

const InitialState = []

export const ErrorContext = createContext()

const ErrorProvider = ({children}) => {
    const [errorState, errorDispatch] = useReducer(ErrorReducer, InitialState)
    return <ErrorContext.Provider value={{errorState, errorDispatch}}>
        {children}
    </ErrorContext.Provider>
}

export default ErrorProvider
