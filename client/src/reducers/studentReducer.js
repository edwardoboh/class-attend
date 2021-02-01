import types from '../actions/types'

const studentReducer = (state, action) => {
    switch(action.type){
        case types.ADD_STUDENT:
            return [
                action.payload,
                ...state
            ]
        case types.DELETE_STUDENT:
            return [...state.filter(item => (item._id !== action.payload))]
        case types.GET_STUDENTS:
            return action.payload
        default:
            return []
    }
}

export default studentReducer