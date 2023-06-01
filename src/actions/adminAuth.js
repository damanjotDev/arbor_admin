import { adminLogin } from "../API";
import { ACTION_TYPES } from "../constants/actionTypes";

import { NotificationManager } from 'react-notifications';

export const adminAuth = (res, navigate)=> async(dispatch, getState)=>{
    try{
        dispatch({type:ACTION_TYPES.ADMIN_LOGIN_REQUEST})
        const {data} = await adminLogin(res)
        dispatch({type:ACTION_TYPES.ADMIN_LOGIN_SUCCESS, payload: data.data})
        NotificationManager.success("Login Success")
        navigate("/company")
    }
    catch(err){
        dispatch({type:ACTION_TYPES.ADMIN_LOGIN_FAILED})
        NotificationManager.error(err.response ? err.response.data.msg : err.message)
    }
}

export const adminLogout =()=>async(dispatch, getState)=>{
    try{
        dispatch({type: ACTION_TYPES.ADMIN_LOGOUT_REQUEST})
        dispatch({type:ACTION_TYPES.ADMIN_LOGOUT_SUCCESS, payload: {}})
    }
    catch(err){
        console.log(err.message);
        dispatch({type:ACTION_TYPES.ADMIN_LOGOUT_FAILED})
        NotificationManager.error(err.response ? err.response.data.msg : err.message)
    }

}

