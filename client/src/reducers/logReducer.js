import types from '../actions/types'

export default function logReducer(state, action){
    switch(action.type){
        case types.GET_LOG:
            return action.payload
        case types.CLEAR_LOG:
            return action.payload
        default:
            return []
    }
}