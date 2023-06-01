import { ACTION_TYPES } from "../constants/actionTypes";

const initialState = {
    species:[],
    specie:{},
    loader:false
}

export const species =(state= initialState, action)=>{

    switch(action.type){
        case ACTION_TYPES.ADD_SPECIES_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.ADD_SPECIES_SUCCESS:
            return {...state, specie: {}, loader:false}
        case ACTION_TYPES.ADD_SPECIES_FAILED:
            return {...state, loader:false}
          
        case ACTION_TYPES.FETCH_SPECIES_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.FETCH_SPECIES_SUCCESS:
            return {...state, species: action.payload, loader:false}
        case ACTION_TYPES.FETCH_SPECIES_FAILED:
            return {...state, loader:false}
        
        case ACTION_TYPES.SET_SPECIES_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.SET_SPECIES_SUCCESS:
            return {...state, specie:action.payload, loader:false}
        case ACTION_TYPES.SET_SPECIES_FAILED:
            return {...state, loader:false}

        case ACTION_TYPES.EDIT_SPECIES_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.EDIT_SPECIES_SUCCESS:
            return {...state, loader:false}
        case ACTION_TYPES.EDIT_SPECIES_FAILED:
            return {...state, loader:false}

        case ACTION_TYPES.DELETE_SPECIES_REQUEST:
            return {...state, loader:true}
        case ACTION_TYPES.DELETE_SPECIES_SUCCESS:
            return {...state, loader:false}
        case ACTION_TYPES.DELETE_SPECIES_FAILED:
            return {...state, loader:false}
            
        default:
            return state;       
    }
}