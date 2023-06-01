import React, {useState, useEffect, useRef} from 'react'
import {  Grid, Button, Box, Typography, Card, MenuItem,
          Table, TableCell, TableContainer, TableRow, Menu,
          TableBody, TableHead,IconButton, Stack,Accordion,
          AccordionSummary, AccordionDetails, CardContent, TextField } from "@mui/material" ;
import { profileSettingStyles } from '../../../styles/materialComponent';
import { CssTextField} from '../../../styles/materialComponent';
import {useSelector, useDispatch} from "react-redux"
import { useNavigate, useLocation } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import Phone from '../../../components/common/phone'
import 'react-phone-input-2/lib/style.css'
import DatePicker from "../../common/datePicker";
import { addArbor, editArborData } from '../../../actions/arbor';

const EditArbor = () => {
  const dispatch = useDispatch()
   const navigate = useNavigate()
   const location = useLocation()
    const classes = profileSettingStyles()
    const {companies}=useSelector(({company})=>company)
    const {arbor}=useSelector(({arbor})=>arbor)
    const [arborData, setArborData] = useState({
      firstName:arbor?.firstName?arbor?.firstName:"",
      lastName:arbor?.lastName?arbor?.lastName:"",
      email:arbor?.email?arbor?.email:"",
      address:arbor?.address?arbor?.address:"",
      countryCode:arbor?.countryCode?arbor?.countryCode:"",
      phoneNumber:arbor?.phoneNumber?arbor?.phoneNumber:"",
      experience:arbor?.experience?arbor?.experience:"",
      projectsCompleted:arbor?.projectsCompleted?arbor?.projectsCompleted:"",
      isaNumber:arbor?.isaNumber?arbor?.isaNumber:"",
      company:arbor?.company?arbor?.company?._id:""
    })
    const [error,setError] = useState(null);
    const [expYear, setExpYear]= useState("");

    useEffect(()=>{
        const data = new Date(arbor?.experience)
        countExperience(data)
      },[])

    function isValidEmail(email) {
      return /\S+@\S+\.\S+/.test(email);
    }

    const countExperience =(v)=>{
        const today = new Date();
        const getCurrentMonth = today.getMonth()+1
        const getCurrentYear = today.getFullYear()
        const getExperience = new Date(v)
        const getExperienceMonth = getExperience.getMonth()+1
        const getExperienceYear = getExperience.getFullYear()
        let exp;
        let months;
        if(getCurrentYear > getExperienceYear){
          exp = getCurrentYear-getExperienceYear
        }else{
          exp = 0
        }
        
        if(getCurrentMonth >= getExperienceMonth && getCurrentYear >= getExperienceYear){
          months = getCurrentMonth-getExperienceMonth
        }
        else if(getCurrentMonth <= getExperienceMonth && getCurrentYear>getExperienceYear){
          months =12 + getCurrentMonth-getExperienceMonth
        }else{
          months = 0
        }
        setArborData({...arborData, experience: `${exp} year ${months} months`})
        setExpYear(`${exp} year ${months} months`)
      }
  
    const handleDatePicker =(v)=>{
      if(new Date().toISOString().substring(0,10) < v.toISOString().substring(0,10)){
        setError("please select valid date")
      }else{
        setError("")
      }
      countExperience(v)
      // const exp = expYear && expMonth ? `${expYear} Year ${expMonth} Month` : expMonth ? `${expMonth} Month` : expYear ? `${expYear} Year` : null
      setArborData({...arborData, experience: v.getTime()})
    }

    const handlePhoneInput = (v, code) => {
      setArborData({...arborData, phoneNumber:v, countryCode:`+${code}`})
    };
   
    const handleChange =(e)=>{
      const {name, value} = e.target
      if(name === "email"){
        if(!isValidEmail(e.target.value)){
          setError("email is not valid")
        }else{
          setError("")
        }
      }   
      setArborData({...arborData, [name]:value})
    }

    const handleSubmit =(e)=>{
      e.preventDefault()
      if(error==="email is not valid"){
        NotificationManager.error("email is not valid")
      }
      else if(!arborData.firstName ||!arborData.lastName || !arborData.address ||!arborData.countryCode || !arborData.phoneNumber||!arborData.experience || !arborData.email || !arborData.projectsCompleted || !arborData.isaNumber || !arborData.company){
        NotificationManager.error("All fields are required")
      }else{
        console.log(arborData)
        dispatch(editArborData(arborData, navigate, location))
      }
    }

    const handleCancel=()=>{
      navigate(-1)
    }
 
  return (
      <Grid container justifyContent="center">
      <Grid item xs={12} sm={12} md={8} lg={8}>
      <Card
        style={{boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)", borderRadius:8, backgroundColor:"#FCFBFD"}}
      >
      <CardContent>
      <Box className={classes.profileText}>
        <Typography variant="h4" fontFamily="CormorantBoldItalic" style={{marginTop:50}}>Add Arbor</Typography>
      </Box>
        <Grid container spacing={3} style={{paddingTop:40, paddingBottom:80}}>

        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.grid}>
        <CssTextField
          required
          select
          className={classes.textField1}
          variant="outlined"
          label="Select Company"
          name="company"
          value={arborData.company}
          onChange={(e)=>setArborData({...arborData,company:e.target.value})}
        >
          <MenuItem disabled value="">
            <em>None</em>
          </MenuItem>
          {companies.length>0 && companies.map((op)=>
          <MenuItem value={op._id}>{op.name}</MenuItem>
          )}
      </CssTextField>
      </Grid>
      
       <Grid item xs={12} sm={12} md={12} lg={12} className={classes.grid}>
        <CssTextField
          className={classes.textField1}
          required
          variant="outlined"
          label="First Name"
          name="firstName"
          value={arborData.firstName}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.grid}>
        <CssTextField
          className={classes.textField1}
          required
          variant="outlined"
          label="last Name"
          name="lastName"
          value={arborData.lastName}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.grid}>
        <CssTextField
          type='email'
          className={classes.textField1}
          required
          variant="outlined"
          label="Email"
          name="email"
          value={arborData.email}
          onChange={handleChange}
        />
      </Grid>
      {error ?<div style={{color:"red",width:"53%",margin:"auto"}}>{error}</div>: null}

      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.grid}>
        <CssTextField
          type='text'
          className={classes.textField1}
          required
          variant="outlined"
          label="Address"
          name="address"
          value={arborData.address}
          onChange={handleChange}
        />
      </Grid>
     

      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.grid}>
       <Phone
          required
          variant="outlined"
          label="Phone No"
          name="phone"
          value={JSON.stringify(arborData.phoneNumber)}
          onChange={(v, code) => handlePhoneInput(v, code)}
          // // onChange={(e)=>handleContactChange(e, index, "phone")}
          />
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.grid} >
        <DatePicker
          name="experience"         
          label="experience"
          variant="outlined"
          onChange={(e)=> handleDatePicker(e)}
          value={arborData.experience}       
        />
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.grid}>
        <CssTextField
          type='number'
          className={classes.textField1}
          required
          variant="outlined"
          label="projectsCompleted"
          name="projectsCompleted"
          value={arborData.projectsCompleted}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.grid}>
        <CssTextField
          type='text'
          className={classes.textField1}
          required
          variant="outlined"
          label="Isa Number"
          name="isaNumber"
          value={arborData.isaNumber}
          onChange={handleChange}
        />
      </Grid>

       <Grid item xs={12} sm={12} md={6} lg={6} className={classes.grid} style={{margin:"auto"}}>
      <Button
        className={classes.submitButton1}
        style={{backgroundColor:"rgb(115 74 153)"}}
        size="large"
        variant="contained"
        onClick={handleSubmit}
      >
        Add
      </Button>
      <Button
      // type="reset"
        sx={{ml:2}}
        className={classes.cancelButton1}
        style={{backgroundColor:"lightgray", color:"black"}}
        size="large"
        variant="contained"
        onClick={handleCancel}
      >
        Cancel
      </Button>
      </Grid>
      </Grid>
      </CardContent>
    </Card>
    </Grid>
    </Grid>

  )
}

export default EditArbor