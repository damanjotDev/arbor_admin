import { ACTION_TYPES } from "../constants/actionTypes";

const initialState = {
    arbors:[],
    arbor:{},
    loader:false
}

export const arbor =(state= initialState, action)=>{

    switch(action.type){
        case ACTION_TYPES.ADD_ARBOR_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.ADD_ARBOR_SUCCESS:
            return {...state, arbor: {}, loader:false}
        case ACTION_TYPES.ADD_ARBOR_FAILED:
            return {...state, loader:false}
          
        case ACTION_TYPES.FETCH_ARBOR_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.FETCH_ARBOR_SUCCESS:
            return {...state, arbors: action.payload, loader:false}
        case ACTION_TYPES.FETCH_ARBOR_FAILED:
            return {...state, loader:false}
        
        case ACTION_TYPES.SET_ARBOR_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.SET_ARBOR_SUCCESS:
            return {...state, arbor:action.payload, loader:false}
        case ACTION_TYPES.SET_ARBOR_FAILED:
            return {...state, loader:false}

        case ACTION_TYPES.EDIT_ARBOR_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.EDIT_ARBOR_SUCCESS:
            return {...state, loader:false}
        case ACTION_TYPES.EDIT_ARBOR_FAILED:
            return {...state, loader:false}

        case ACTION_TYPES.DELETE_ARBOR_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.DELETE_ARBOR_SUCCESS:
            return {...state, loader:false}
        case ACTION_TYPES.DELETE_ARBOR_FAILED:
            return {...state, loader:false}
            
        default:
            return state;       
    }
}