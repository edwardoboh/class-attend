import React, {createContext, useReducer} from 'react'
import assessmentReducer from '../reducers/assessmentReducer'

const initialState = []

export const AssessmentContext = createContext(initialState)

export const AssessmentProvider = ({children}) => {
    const [state, dispatch] = useReducer(assessmentReducer, initialState)
    return(
        <AssessmentContext.Provider value={{state, dispatch}}>
            {children}
        </AssessmentContext.Provider>
    )
}

