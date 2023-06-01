import { ACTION_TYPES } from "../constants/actionTypes"


const initialState = {
    companies:[],
    companyArbors:[],
    company:{},
    loader:false
}

export const company =(state= initialState, action)=>{

    switch(action.type){
        case ACTION_TYPES.ADD_COMPANY_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.ADD_COMPANY_SUCCESS:
            return {...state, company: {}, loader:false}
        case ACTION_TYPES.ADD_COMPANY_FAILED:
            return {...state, loader:false}
          
        case ACTION_TYPES.FETCH_COMPANY_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.FETCH_COMPANY_SUCCESS:
            return {...state, companies: action.payload, loader:false}
        case ACTION_TYPES.FETCH_COMPANY_FAILED:
            return {...state, loader:false}
        
        case ACTION_TYPES.SET_COMPANY_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.SET_COMPANY_SUCCESS:
            return {...state, company:action.payload, loader:false}
        case ACTION_TYPES.SET_COMPANY_FAILED:
            return {...state, loader:false}

        case ACTION_TYPES.EDIT_COMPANY_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.EDIT_COMPANY_SUCCESS:
            return {...state, loader:false}
        case ACTION_TYPES.EDIT_COMPANY_FAILED:
            return {...state, loader:false}

        case ACTION_TYPES.DELETE_COMPANY_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.DELETE_COMPANY_SUCCESS:
            return {...state, loader:false}
        case ACTION_TYPES.DELETE_COMPANY_FAILED:
            return {...state, loader:false}
            
        case ACTION_TYPES.FETCH_COMPANY_ARBORS_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.FETCH_COMPANY_ARBORS_SUCCESS:
            return {...state,companyArbors:action.payload ,loader:false}
        case ACTION_TYPES.FETCH_COMPANY_ARBORS_FAILED:
            return {...state, loader:false}
        default:
            return state;       
    }
}