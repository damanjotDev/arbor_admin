import { ACTION_TYPES } from "../constants/actionTypes";

const initialState = {
    plans:[],
    loader:false,
    error:false
}

export const plans =(state= initialState, action)=>{

    switch(action.type){
        case ACTION_TYPES.FETCH_PLAN_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.FETCH_PLAN_SUCCESS:
            return {...state, plans: action.payload, loader:false}
        case ACTION_TYPES.FETCH_PLAN_FAILED:
            return {...state, loader:false}
        default:
            return state;       
    }
}