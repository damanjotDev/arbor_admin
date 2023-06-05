import React, {useState} from 'react'
import {Routes, Router, Route, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Login from '../components/authentication/authModal';
import CompanyManager from '../components/admin/company';
import AddCompany from '../components/admin/company/addCompany';
import EditCompany from '../components/admin/company/editCompany';
import ArborManager from '../components/admin/arbor';
import AddArbor from '../components/admin/arbor/addArbor';
import EditArbor from '../components/admin/arbor/editArbor';
import HealthRate from '../components/admin/healthRating';
import EditHealth from '../components/admin/healthRating/editHealth';
import AddHealth from '../components/admin/healthRating/addHealth';
import Recommendation from '../components/admin/recommendation';
import AddRecommendation from '../components/admin/recommendation/addRecommendation';
import EditRecommendation from '../components/admin/recommendation/editRecommendation';
import Species from '../components/admin/species';
import AddSpecies from '../components/admin/species/addSpecies';
import EditSpecies from '../components/admin/species/editSpecies';
import OtherSpecies from '../components/admin/otherSpecies';
import { Plans } from '../components/admin/plans';
const AppRoute = () => {

  const { isLoggedIn } = useSelector(({adminLogin})=>adminLogin)
  console.log("islog", isLoggedIn)
  return (
    <div style={{height:"100%"}}>
    <Routes >
      {
        isLoggedIn ?
        <>
        {/* <Route path = "/company" element = {<Arbor /> } />
        <Route path = "/reports" element={<Reports />}/>
        <Route path="*" element={<Navigate to="/arbor" />}/>
        <Route path="/profile" element={<PersonalInformation />}/>
        <Route path="/updatePassword" element={<UpdatePassword />}/>
        <Route path="/clientManager" element={<ClientManager />}/>
        <Route path="/addClient" element={<AddClient />}/>
        <Route path ="/editClient" element={<EditClient />}/>
        <Route path ="properties"  element={<Property />}/>
        <Route path="addProperty" element={<AddProperties />} />
        <Route path ="editProperty" element={<EditProperty/>}/>
        <Route path ="/addReport" element={<AddReport />}/>
        <Route path ="/editReport" element={<EditReport />}/>
        <Route path ="/newReport" element={<NewReports />}/>
        <Route path ="/addNewReport" element={<AddNewReport/>}/> */}
        <Route path ="/company" element={<CompanyManager/>}/>
        <Route path ="/addCompany" element={<AddCompany/>}/>
        <Route path ="/editCompany" element={<EditCompany/>}/>
        <Route path ="/arbor" element={<ArborManager/>}/>
        <Route path ="/addArbor" element={<AddArbor/>}/>
        <Route path ="/editArbor" element={<EditArbor/>}/>
        <Route path ="/healthRate" element={<HealthRate/>}/>
        <Route path ="/addHealthRate" element={<AddHealth/>}/>
        <Route path ="/editHealthRate" element={<EditHealth/>}/>
        <Route path ="/recommendations" element={<Recommendation/>}/>
        <Route path ="/addRecommendations" element={<AddRecommendation/>}/>
        <Route path ="/editRecommendations" element={<EditRecommendation/>}/>
        <Route path ="/species" element={<Species/>}/>
        <Route path ="/addSpecies" element={<AddSpecies/>}/>
        <Route path ="/editSpecies" element={<EditSpecies/>}/>
        <Route path ="/otherspecies" element={<OtherSpecies/>}/>
        <Route path ="/plans" element={<Plans/>}/>
        </>:
        <>
         <Route path = "/" element={<Login/>}/>
         <Route path="*" element={<Navigate to="/" />}/>

        </>       
      }      
    </Routes>
    </div>
  )
}

export default AppRoute