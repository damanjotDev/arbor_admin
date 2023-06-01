import { createCompany, deleteCompany, editCompany, fetchAllCompanies, fetchCompanyArbors } from "../API";
import { ACTION_TYPES } from "../constants/actionTypes";
import { NotificationManager } from 'react-notifications';


export const getAllCompanies =()=>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.FETCH_COMPANY_REQUEST})
        const {data} = await fetchAllCompanies()
        dispatch({type: ACTION_TYPES.FETCH_COMPANY_SUCCESS, payload: data.data})
    }
    catch(err){
        dispatch({type:ACTION_TYPES.FETCH_COMPANY_FAILED})
        NotificationManager.error(err.response ? err.response.data.msg : err.message)
    }
}

export const addCompany =(res, navigate, location)=>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.ADD_COMPANY_REQUEST})
        const {data} = await createCompany(res)
        dispatch({type: ACTION_TYPES.ADD_COMPANY_SUCCESS, payload: data.data})
        NotificationManager.success("Company added successfully")
        location?.state?.data === "/addReport" ? navigate("/addCompany", {state:{data:data.data}}): navigate("/company")
        dispatch(getAllCompanies())
    }
    catch(err){
        dispatch({type:ACTION_TYPES.ADD_COMPANY_FAILED})
        NotificationManager.error(err?.response?.data?.msg ? err.response.data.msg : "Something went wrong")
    }
}

export const setCompany=(res)=>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.SET_COMPANY_REQUEST})

        dispatch({type: ACTION_TYPES.SET_COMPANY_SUCCESS, payload:res})
    }
    catch(err){
        dispatch({type:ACTION_TYPES.SET_COMPANY_FAILED})
        NotificationManager.error(err.message)
    }
}

export const editCompanyData= (res, navigate) =>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.EDIT_COMPANY_REQUEST})
        const { company } = getState().company
        const { data } = await editCompany(company._id, res)
        dispatch({type:ACTION_TYPES.EDIT_COMPANY_SUCCESS})
        NotificationManager.success("Company edit successfully")
        navigate("/company")
        dispatch(getAllCompanies())
    }
    catch(err){
        dispatch({type:ACTION_TYPES.EDIT_COMPANY_FAILED})
        NotificationManager.error(err.message)
    }
}

export const deleteCompanyData =(id) =>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.DELETE_COMPANY_REQUEST})
        const {data} = await deleteCompany(id)
        dispatch({type: ACTION_TYPES.DELETE_COMPANY_SUCCESS})
        console.log("working")
        NotificationManager.success(data.msg)
        dispatch(getAllCompanies())
    }
    catch(err){
        dispatch({type:ACTION_TYPES.DELETE_COMPANY_FAILED})
        NotificationManager.error(err.message)
    }
}

export const getCompanyArbors =(id)=>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.FETCH_COMPANY_ARBORS_REQUEST})
        const {data} = await fetchCompanyArbors(id)
        dispatch({type: ACTION_TYPES.FETCH_COMPANY_ARBORS_SUCCESS, payload: data.data})
    }
    catch(err){
        dispatch({type:ACTION_TYPES.FETCH_COMPANY_ARBORS_FAILED})
        NotificationManager.error(err.response ? err.response.data.msg : err.message)
    }
}