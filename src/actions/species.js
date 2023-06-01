import { createSpecies, deleteSpecies, editSpecies, fetchSpecies } from "../API";
import { ACTION_TYPES } from "../constants/actionTypes";
import { NotificationManager } from 'react-notifications';


export const getSpecies =()=>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.FETCH_SPECIES_REQUEST})
        const {data} = await fetchSpecies()
        dispatch({type: ACTION_TYPES.FETCH_SPECIES_SUCCESS, payload: data.data})
    }
    catch(err){
        dispatch({type:ACTION_TYPES.FETCH_SPECIES_FAILED})
        NotificationManager.error(err.response ? err.response.data.msg : err.message)
    }
}

export const addSpecies =(res, navigate, location)=>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.ADD_SPECIES_REQUEST})
        const {data} = await createSpecies(res)
        dispatch({type: ACTION_TYPES.ADD_SPECIES_SUCCESS, payload: data.data})
        NotificationManager.success("Species added successfully")
        location?.state?.data === "/addSpecies" ? navigate("/addSpecies", {state:{data:data.data}}): navigate("/species")
        dispatch(getSpecies())
    }
    catch(err){
        dispatch({type:ACTION_TYPES.ADD_SPECIES_FAILED})
        NotificationManager.error(err?.response?.data?.msg ? err.response.data.msg : "Something went wrong")
    }
}

export const setSpecies=(res)=>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.SET_SPECIES_REQUEST})

        dispatch({type: ACTION_TYPES.SET_SPECIES_SUCCESS, payload:res})
    }
    catch(err){
        dispatch({type:ACTION_TYPES.SET_SPECIES_FAILED})
        NotificationManager.error(err.message)
    }
}

export const editSpeciesData= (res, navigate) =>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.EDIT_SPECIES_REQUEST})
        const {specie} = getState().species
        const { data } = await editSpecies(specie._id, res)
        dispatch({type:ACTION_TYPES.EDIT_SPECIES_SUCCESS})
        NotificationManager.success("Species edit successfully")
        navigate("/species")
        dispatch(getSpecies())
    }
    catch(err){
        dispatch({type:ACTION_TYPES.EDIT_SPECIES_FAILED})
        NotificationManager.error(err.message)
    }
}

export const deleteSpeciesData =(id) =>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.DELETE_SPECIES_REQUEST})
        const {data} = await deleteSpecies(id)
        dispatch({type: ACTION_TYPES.DELETE_SPECIES_SUCCESS})
        NotificationManager.success(data.msg)
        dispatch(getSpecies())
    }
    catch(err){
        dispatch({type:ACTION_TYPES.DELETE_SPECIES_FAILED})
        NotificationManager.error(err.message)
    }
}