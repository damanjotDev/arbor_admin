import axios from "axios";

const API = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

API.interceptors.request.use((req) => {
  try {
    if (JSON.parse(localStorage.getItem("profile")).token) {
        req.headers.Authorization = `Bearer ${ 
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }
    return req;
  } catch (error) {
    console.error("error",error);
  }
});


API.interceptors.response.use(function (response) {

  return response;
}, function (error) {
  if(error?.response?.data?.statusCode === 401 || error?.response?.data?.statusCode === 403 ){
    localStorage.clear()
    localStorage.removeItem('persist:root');
    window.location = `${window.location.protocol}//${window.location.host}/login`
  }

  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

//------------------------------------------------------------------------------------------------admin Auth
export const adminLogin = (data)=>axios.post(`${process.env.REACT_APP_API_BASE_URL}/admin/login`, data);

//------------------------------------------------------------------------------------------------------Company
export const createCompany =(data)=>API.post("admin/company", data)
export const fetchAllCompanies =()=>API.get("admin/companies")
export const deleteCompany =(companyId)=>API.delete(`admin/company/${companyId}`)
export const editCompany =(companyId, data)=>API.put(`admin/company/${companyId}`, data)
export const fetchCompanyArbors=(companyId)=>API.get(`admin/company/${companyId}/arborists`)

//------------------------------------------------------------------------------------------------------Arbor
export const createArbor =(data)=>API.post("admin/arborist", data)
export const fetchArbors =()=>API.get("admin/arborists")
export const editArbor =(arborId, data)=>API.put(`admin/arborist/${arborId}`, data)
export const deleteArbor =(arborId)=>API.delete(`admin/arborist/${arborId}`)

//---------------------------------------------------------------------------------------------------------HealthRating
export const createHealthRate =(data)=>API.post("admin/healthrate", data)
export const fetchHealthRate =()=>API.get("admin/healthrates")
export const editHealthRate =(healthId, data)=>API.put(`admin/healthrate/${healthId}`, data)
export const deleteHealthRate =(healthId)=>API.delete(`admin/healthrate/${healthId}`)


//---------------------------------------------------------------------------------------------------------Recommendation

export const createRecommendation =(data)=>API.post("admin/recommendation", data)
export const fetchRecommendations =()=>API.get("admin/recommendations")
export const editRecommendation =(recommendId, data)=>API.put(`admin/recommendation/${recommendId}`, data)
export const deleteRecommendation =(recommendId)=>API.delete(`admin/recommendation/${recommendId}`)


//---------------------------------------------------------------------------------------------------------Species
export const createSpecies =(data)=>API.post("admin/species", data)
export const fetchSpecies =()=>API.get("admin/species")
export const editSpecies =(speciesId, data)=>API.put(`admin/species/${speciesId}`, data)
export const deleteSpecies =(healthId)=>API.delete(`admin/species/${healthId}`)

//---------------------------------------------------------------------------------------------------other species
export const fetchOtherSpecies =()=>API.get("admin/otherspecies")
export const approveOtherSpecies =(id,data)=>API.post(`admin/otherspecies/${id}`,data)


