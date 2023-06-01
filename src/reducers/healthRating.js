import { ACTION_TYPES } from "../constants/actionTypes";

const initialState = {
    healthRatings:[],
    healthRate:{},
    loader:false
}

export const healthRate =(state= initialState, action)=>{

    switch(action.type){
        case ACTION_TYPES.ADD_HEALTHRATE_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.ADD_HEALTHRATE_SUCCESS:
            return {...state, healthRate: {}, loader:false}
        case ACTION_TYPES.ADD_HEALTHRATE_FAILED:
            return {...state, loader:false}
          
        case ACTION_TYPES.FETCH_HEALTHRATE_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.FETCH_HEALTHRATE_SUCCESS:
            return {...state, healthRatings: action.payload, loader:false}
        case ACTION_TYPES.FETCH_HEALTHRATE_FAILED:
            return {...state, loader:false}
        
        case ACTION_TYPES.SET_HEALTHRATE_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.SET_HEALTHRATE_SUCCESS:
            return {...state, healthRate:action.payload, loader:false}
        case ACTION_TYPES.SET_HEALTHRATE_FAILED:
            return {...state, loader:false}

        case ACTION_TYPES.EDIT_HEALTHRATE_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.EDIT_HEALTHRATE_SUCCESS:
            return {...state, loader:false}
        case ACTION_TYPES.EDIT_HEALTHRATE_FAILED:
            return {...state, loader:false}

        case ACTION_TYPES.DELETE_HEALTHRATE_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.DELETE_HEALTHRATE_SUCCESS:
            return {...state, loader:false}
        case ACTION_TYPES.DELETE_HEALTHRATE_FAILED:
            return {...state, loader:false}
            
        default:
            return state;       
    }
}