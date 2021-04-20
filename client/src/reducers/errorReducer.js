import types from '../actions/types'

const ErrorReducer = (state, action) => {
    switch(action.type){
        case types.GET_ERRORS:
            return [...state, action.payload]
        case types.CLEAR_ERRORS:
            return []
        default:
            return []
    }
}

export default ErrorReducer