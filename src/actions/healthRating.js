
import { createHealthRate, deleteHealthRate, editHealthRate, fetchHealthRate } from "../API";
import { ACTION_TYPES } from "../constants/actionTypes";
import { NotificationManager } from 'react-notifications';


export const getHealthRates =()=>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.FETCH_HEALTHRATE_REQUEST})
        const {data} = await fetchHealthRate()
        dispatch({type: ACTION_TYPES.FETCH_HEALTHRATE_SUCCESS, payload: data.data})
    }
    catch(err){
        dispatch({type:ACTION_TYPES.FETCH_HEALTHRATE_FAILED})
        NotificationManager.error(err.response ? err.response.data.msg : err.message)
    }
}

export const addHealthRate =(res, navigate, location)=>async(dispatch, getState)=>{
    try{
        
        dispatch({type: ACTION_TYPES.ADD_HEALTHRATE_REQUEST})
        const {data} = await createHealthRate(res)
        dispatch({type: ACTION_TYPES.ADD_HEALTHRATE_SUCCESS, payload: data.data})
        NotificationManager.success("HealthRate added successfully")
        location?.state?.data === "/addHealthRate" ? navigate("/addHealthRate", {state:{data:data.data}}): navigate("/healthRate")
        dispatch(getHealthRates())
    }
    catch(err){
        dispatch({type:ACTION_TYPES.ADD_HEALTHRATE_FAILED})
        NotificationManager.error(err?.response?.data?.msg ? err.response.data.msg : "Something went wrong")
    }
}

export const setHealthRate=(res)=>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.SET_HEALTHRATE_REQUEST})

        dispatch({type: ACTION_TYPES.SET_HEALTHRATE_SUCCESS, payload:res})
    }
    catch(err){
        dispatch({type:ACTION_TYPES.SET_HEALTHRATE_FAILED})
        NotificationManager.error(err.message)
    }
}

export const editHealthRateData= (res, navigate) =>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.EDIT_HEALTHRATE_REQUEST})
        const {healthRate} = getState().healthRate
        const { data } = await editHealthRate(healthRate._id, res)
        dispatch({type:ACTION_TYPES.EDIT_HEALTHRATE_SUCCESS})
        NotificationManager.success("HealthRate edit successfully")
        navigate("/HealthRate")
        dispatch(getHealthRates())
    }
    catch(err){
        dispatch({type:ACTION_TYPES.EDIT_HEALTHRATE_FAILED})
        NotificationManager.error(err.message)
    }
}

export const deleteHealthRateData =(id) =>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.DELETE_HEALTHRATE_REQUEST})
        const {data} = await deleteHealthRate(id)
        dispatch({type: ACTION_TYPES.DELETE_HEALTHRATE_SUCCESS})
        NotificationManager.success(data.msg)
        dispatch(getHealthRates())
    }
    catch(err){
        dispatch({type:ACTION_TYPES.DELETE_HEALTHRATE_FAILED})
        NotificationManager.error(err.message)
    }
}