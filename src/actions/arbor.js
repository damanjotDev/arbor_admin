import { createArbor, deleteArbor, editArbor, fetchArbors } from "../API";
import { ACTION_TYPES } from "../constants/actionTypes";
import { NotificationManager } from 'react-notifications';


export const getArbors =()=>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.FETCH_ARBOR_REQUEST})
        const {data} = await fetchArbors()
        dispatch({type: ACTION_TYPES.FETCH_ARBOR_SUCCESS, payload: data.data})
    }
    catch(err){
        dispatch({type:ACTION_TYPES.FETCH_ARBOR_FAILED})
        NotificationManager.error(err.response ? err.response.data.msg : err.message)
    }
}

export const addArbor =(res, navigate, location)=>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.ADD_ARBOR_REQUEST})
        const {data} = await createArbor(res)
        dispatch({type: ACTION_TYPES.ADD_ARBOR_SUCCESS, payload: data.data})
        NotificationManager.success("Arbor added successfully")
        location?.state?.data === "/addArbor" ? navigate("/addArbor", {state:{data:data.data}}): navigate("/arbor")
        dispatch(getArbors())
    }
    catch(err){
        dispatch({type:ACTION_TYPES.ADD_ARBOR_FAILED})
        NotificationManager.error(err?.response?.data?.msg ? err.response.data.msg : "Something went wrong")
    }
}

export const setArbor=(res)=>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.SET_ARBOR_REQUEST})

        dispatch({type: ACTION_TYPES.SET_ARBOR_SUCCESS, payload:res})
    }
    catch(err){
        dispatch({type:ACTION_TYPES.SET_ARBOR_FAILED})
        NotificationManager.error(err.message)
    }
}

export const editArborData= (res, navigate) =>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.EDIT_ARBOR_REQUEST})
        const {arbor} = getState().arbor
        const { data } = await editArbor(arbor._id, res)
        dispatch({type:ACTION_TYPES.EDIT_ARBOR_SUCCESS})
        NotificationManager.success("Arbor edit successfully")
        navigate("/arbor")
        dispatch(getArbors())
    }
    catch(err){
        dispatch({type:ACTION_TYPES.EDIT_ARBOR_FAILED})
        NotificationManager.error(err.message)
    }
}

export const deleteArborData =(id) =>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.DELETE_ARBOR_REQUEST})
        const {data} = await deleteArbor(id)
        dispatch({type: ACTION_TYPES.DELETE_ARBOR_SUCCESS})
        NotificationManager.success(data.msg)
        dispatch(getArbors())
    }
    catch(err){
        dispatch({type:ACTION_TYPES.DELETE_ARBOR_FAILED})
        NotificationManager.error(err.message)
    }
}