import React, {useState, useEffect, useRef} from 'react'
import {  Grid, Button, Box, Typography, Card, CardContent, TextField,MenuItem } from "@mui/material" ;
import { profileSettingStyles } from '../../../styles/materialComponent';
import { CssTextField} from '../../../styles/materialComponent';
import {useSelector, useDispatch} from "react-redux"
import { useNavigate, useLocation } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import 'react-phone-input-2/lib/style.css'
import { editRecommendationData} from '../../../actions/recommendation';

const types = ["recomendationOnly", "additionalText", "additionalImage", "additionalTextImage"];

const EditRecommendation = () => {
  const dispatch = useDispatch()
   const navigate = useNavigate()
   const location = useLocation()
    const classes = profileSettingStyles()
    const {recommenDation,loader}=useSelector(({recommendation})=>recommendation)
    const [recommendData, setrecommendData] = useState({
        recomendation:recommenDation?.recomendation?recommenDation?.recomendation:"",
        recomendationType:recommenDation?.recomendationType?recommenDation?.recomendationType:"",
        recommendationDesc:recommenDation?.recommendationDesc?recommenDation?.recommendationDesc:""
    })

   
    const handleChange =(e)=>{
      const {name, value} = e.target
      setrecommendData({...recommendData, [name]:value})
    }

    const handleSubmit =(e)=>{
      e.preventDefault()
      if(!recommendData.recomendation || !recommendData.recomendationType){
        NotificationManager.error("All fields are required")
      }else{
        dispatch(editRecommendationData(recommendData, navigate, location))
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
        <Typography variant="h4" fontFamily="CormorantBoldItalic" style={{marginTop:50}}>Add recommend Rate</Typography>
      </Box>
        <Grid container spacing={3} style={{paddingTop:40, paddingBottom:80}}>

       <Grid item xs={12} sm={12} md={12} lg={12} className={classes.grid}>
        <CssTextField
          className={classes.textField1}
          required
          variant="outlined"
          label="Recomendation"
          name="recomendation"
          value={recommendData.recomendation}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.grid}>
        <CssTextField
          className={classes.textField1}
          required
          variant="outlined"
          label="Description"
          name="recommendationDesc"
          value={recommendData?.recommendationDesc}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.grid}>
        <CssTextField
          required
          select
          className={classes.textField1}
          variant="outlined"
          label="Select Type"
          name="recomendationType"
          value={recommendData.recomendationType}
          onChange={(e)=>setrecommendData({...recommendData,recomendationType:e.target.value})}
        >
          <MenuItem disabled value="">
            <em>None</em>
          </MenuItem>
          {types.length>0 && types.map((op)=>
          <MenuItem value={op}>{op}</MenuItem>
          )}
      </CssTextField>
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

export default EditRecommendation



