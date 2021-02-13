import axios from 'axios'
import types from './types'

export const getAssessment = ({course, dispatch}) => {
    axios.get(`/attendance/course/?course=${course}`).then(resp => {
        // console.log(resp)
        dispatch({
            type: types.GET_ASSESSMENT,
            payload: resp.data.data
        })
    }).catch(e => console.log(e))
}