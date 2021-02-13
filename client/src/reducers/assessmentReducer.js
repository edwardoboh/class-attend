import types from '../actions/types'

const assessmentReducer = (state, action) => {
    switch(action.type){
        case types.GET_ASSESSMENT:
            return action.payload
        default:
            return []
    }
}

export default assessmentReducer