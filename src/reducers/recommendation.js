import { ACTION_TYPES } from "../constants/actionTypes";

const initialState = {
    recommenDations:[],
    recommenDation:{},
    loader:false
}

export const recommendation =(state= initialState, action)=>{

    switch(action.type){
        case ACTION_TYPES.ADD_RECOMMENDATION_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.ADD_RECOMMENDATION_SUCCESS:
            return {...state, recommenDation: {}, loader:false}
        case ACTION_TYPES.ADD_RECOMMENDATION_FAILED:
            return {...state, loader:false}
          
        case ACTION_TYPES.FETCH_RECOMMENDATION_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.FETCH_RECOMMENDATION_SUCCESS:
            return {...state, recommenDations: action.payload, loader:false}
        case ACTION_TYPES.FETCH_RECOMMENDATION_FAILED:
            return {...state, loader:false}
        
        case ACTION_TYPES.SET_RECOMMENDATION_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.SET_RECOMMENDATION_SUCCESS:
            return {...state, recommenDation:action.payload, loader:false}
        case ACTION_TYPES.SET_RECOMMENDATION_FAILED:
            return {...state, loader:false}

        case ACTION_TYPES.EDIT_RECOMMENDATION_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.EDIT_RECOMMENDATION_SUCCESS:
            return {...state, loader:false}
        case ACTION_TYPES.EDIT_RECOMMENDATION_FAILED:
            return {...state, loader:false}

        case ACTION_TYPES.DELETE_RECOMMENDATION_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.DELETE_RECOMMENDATION_SUCCESS:
            return {...state, loader:false}
        case ACTION_TYPES.DELETE_RECOMMENDATION_FAILED:
            return {...state, loader:false}
            
        default:
            return state;       
    }
}