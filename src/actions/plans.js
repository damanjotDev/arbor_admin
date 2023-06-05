import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { ACTION_TYPES } from '../constants/actionTypes';
import { fetchSubsCriptionPlans } from '../API';


export const getSubsCriptionPlans =()=>async(dispatch)=>{
  try {
      dispatch({type:ACTION_TYPES.FETCH_PLAN_REQUEST})
      const {data} = await fetchSubsCriptionPlans()
      dispatch({type:ACTION_TYPES.FETCH_PLAN_SUCCESS, payload:data.data})
      NotificationManager.success("Available plans.")  
    } catch (error) {
     console.log(error)
     dispatch({type:ACTION_TYPES.FETCH_PLAN_FAILED})
    }
}
