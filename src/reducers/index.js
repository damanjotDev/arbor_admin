import { combineReducers } from "redux";
import { adminLogin } from "./adminAuth";
import {arbor} from "./arbor";
import { company } from "./company";
import { healthRate } from "./healthRating";
import { recommendation } from "./recommendation";
import { species } from "./species";
import {plans} from "./plans"


export default combineReducers({ adminLogin,arbor,company,healthRate,recommendation,species,plans });