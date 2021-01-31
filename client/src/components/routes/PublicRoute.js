import React, {useState, useEffect, useContext} from 'react'
import { Route, Redirect } from 'react-router-dom'
import {LecturerContext} from '../../context/LecturerContext'

const PublicRoute = (props) => {
    const {children, ...rest} = props
    const isAuth = localStorage.getItem("isAuthenticated")
    // const [isAuthenticated, setIsAuthenticated] = useState(null)
    // useEffect(() => {
    //     const authState = localStorage.getItem("isAuthenticated")
    //     setIsAuthenticated(authState)
    // }, [])

    const {state, dispatch} = useContext(LecturerContext)

    return(
        <Route
            {...rest}
            render = { () => {
                return state.isAuthenticated || isAuth === "true" ? <Redirect to="/dashboard" /> : children
            }}
         />
    )
}

export default PublicRoute