import types from '../actions/types'

const lecturerReducer = (state, action) => {
    switch(action.type){
        case types.SIGNIN:
            localStorage.setItem("isAuthenticated", `${action.payload.isAuthenticated}`)
            localStorage.setItem("user", `${JSON.stringify(action.payload.user)}`)
            return action.payload
        case types.SIGNUP:
            localStorage.setItem("isAuthenticated", `${action.payload.isAuthenticated}`)
            localStorage.setItem("user", `${JSON.stringify(action.payload.user)}`)
            return action.payload
        case types.SIGNOUT:
            localStorage.clear()
            return {isAuthenticated: false, user: {}}
        default:
            return {isAuthenticated: false, user: {}}
    }
}

export default lecturerReducer