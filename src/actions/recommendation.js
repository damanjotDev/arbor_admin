
import { createRecommendation, deleteRecommendation, editRecommendation, fetchRecommendations } from "../API";
import { ACTION_TYPES } from "../constants/actionTypes";
import { NotificationManager } from 'react-notifications';


export const getRecommendations =()=>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.FETCH_RECOMMENDATION_REQUEST})
        const {data} = await fetchRecommendations()
        dispatch({type: ACTION_TYPES.FETCH_RECOMMENDATION_SUCCESS, payload: data.data})
    }
    catch(err){
        dispatch({type:ACTION_TYPES.FETCH_RECOMMENDATION_FAILED})
        NotificationManager.error(err.response ? err.response.data.msg : err.message)
    }
}

export const addRecommendation =(res, navigate, location)=>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.ADD_RECOMMENDATION_REQUEST})
        const {data} = await createRecommendation(res)
        dispatch({type: ACTION_TYPES.ADD_RECOMMENDATION_SUCCESS, payload: data.data})
        NotificationManager.success("Recommendations added successfully")
        location?.state?.data === "/addRecommendations" ? navigate("/addRecommendations", {state:{data:data.data}}): navigate("/recommendations")
        dispatch(getRecommendations())
    }
    catch(err){
        dispatch({type:ACTION_TYPES.ADD_RECOMMENDATION_FAILED})
        NotificationManager.error(err?.response?.data?.msg ? err.response.data.msg : "Something went wrong")
    }
}

export const setRecommendation=(res)=>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.SET_RECOMMENDATION_REQUEST})

        dispatch({type: ACTION_TYPES.SET_RECOMMENDATION_SUCCESS, payload:res})
    }
    catch(err){
        dispatch({type:ACTION_TYPES.SET_RECOMMENDATION_FAILED})
        NotificationManager.error(err.message)
    }
}

export const editRecommendationData= (res, navigate) =>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.EDIT_RECOMMENDATION_REQUEST})
        const {recommenDation} = getState().recommendation
        const { data } = await editRecommendation(recommenDation._id, res)
        dispatch({type:ACTION_TYPES.EDIT_RECOMMENDATION_SUCCESS})
        NotificationManager.success("Recommendation edit successfully")
        navigate("/recommendations")
        dispatch(getRecommendations())
    }
    catch(err){
        dispatch({type:ACTION_TYPES.EDIT_RECOMMENDATION_FAILED})
        NotificationManager.error(err.message)
    }
}

export const deleteRecommendationData =(id) =>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.DELETE_RECOMMENDATION_REQUEST})
        const {data} = await deleteRecommendation(id)
        dispatch({type: ACTION_TYPES.DELETE_RECOMMENDATION_SUCCESS})
        NotificationManager.success(data.msg)
        dispatch(getRecommendations())
    }
    catch(err){
        dispatch({type:ACTION_TYPES.DELETE_RECOMMENDATION_FAILED})
        NotificationManager.error(err.message)
    }
}