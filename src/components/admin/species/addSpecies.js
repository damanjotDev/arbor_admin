import React, {useState, useEffect, useRef} from 'react'
import {  Grid, Button, Box, Typography, Card, CardContent, TextField } from "@mui/material" ;
import { profileSettingStyles } from '../../../styles/materialComponent';
import { CssTextField} from '../../../styles/materialComponent';
import {useSelector, useDispatch} from "react-redux"
import { useNavigate, useLocation } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import 'react-phone-input-2/lib/style.css'
import { addSpecies } from '../../../actions/species';



const AddSpecies = () => {
  const dispatch = useDispatch()
   const navigate = useNavigate()
   const location = useLocation()
    const classes = profileSettingStyles()
    const [speciesData, setSpeciesData] = useState({
      commonName:"",
      scientificName:""
    })

   
    const handleChange =(e)=>{
      const {name, value} = e.target 
      setSpeciesData({...speciesData, [name]:value})
    }

    const handleSubmit =(e)=>{
      e.preventDefault()
      if(!speciesData.commonName ||!speciesData.scientificName){
        NotificationManager.error("All fields are required")
      }else{
        dispatch(addSpecies(speciesData, navigate, location))
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
        <Typography variant="h4" fontFamily="CormorantBoldItalic" style={{marginTop:50}}>Add species</Typography>
      </Box>
        <Grid container spacing={3} style={{paddingTop:40, paddingBottom:80}}>
      
       <Grid item xs={12} sm={12} md={12} lg={12} className={classes.grid}>
        <CssTextField
          className={classes.textField1}
          required
          variant="outlined"
          label="Common Name"
          name="commonName"
          value={speciesData.commonName}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.grid}>
        <CssTextField
          type='text'
          className={classes.textField1}
          required
          variant="outlined"
          label="Scientific Name"
          name="scientificName"
          value={speciesData.scientificName}
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

export default AddSpecies