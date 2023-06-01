import { ACTION_TYPES } from "../constants/actionTypes";

const initialState = {
    admin:{},
    isLoggedIn: false,
    loader:false
}

export const adminLogin = (state = initialState, action) =>{
    switch(action.type){
        case ACTION_TYPES.ADMIN_LOGIN_REQUEST:
            return {...state,  loader:true}
        case ACTION_TYPES.ADMIN_LOGIN_SUCCESS:
            localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
            return {...state, admin: action.payload, isLoggedIn:true, loader:false}
        case ACTION_TYPES.ADMIN_LOGIN_FAILED:
            return {...state, loader:false}
        
        case ACTION_TYPES.ADMIN_LOGOUT_REQUEST:
            return {...state,  loader:true}
        case ACTION_TYPES.ADMIN_LOGOUT_SUCCESS:
            localStorage.clear()
            return {...state, admin:{}, isLoggedIn:false, loader:false}
        case ACTION_TYPES.ADMIN_LOGOUT_FAILED:
            return {...state, loader:false}

        default:
            return state
    }

}