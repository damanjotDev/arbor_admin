import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Card, Button, Typography, Box} from '@mui/material';
import CommonTable from "../../common/table"

import {useSelector, useDispatch} from "react-redux"
import { styled } from '@mui/material/styles';
import {clientStyles} from "../../../styles/materialComponent"
import { getRecommendations } from '../../../actions/recommendation';
import { getSpecies } from '../../../actions/species';

const healthrate =[
    "Common Name",
    "Scientific Name",
    "Actions"
]

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Species = () => {
  const classes = clientStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {species,loader}=useSelector(({species})=>species)

  useEffect(()=>{
      dispatch(getSpecies())
  },[])
  
  return (   
          <Card
          style={{boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)", backgroundColor:"#FCFBFD"}}
          className={classes.clientContainer}
          >
            <div style={{padding:15, display: 'flex', justifyContent: 'space-between', padding:20}}>
            <Typography variant="h5">Species</Typography>
            <Button variant="contained" style={{backgroundColor:"rgb(115 74 153)",textTransform:"none"}} onClick={()=>navigate("/addSpecies")}>
              Add Species
              </Button>
              </div><hr />
          {species?.length?<CommonTable lable="species" tableCols={healthrate} tableRows={species}/>:loader?<Box style={{width:"auto",padding:"30px"}}>Processing!</Box>:<Box style={{width:"auto",padding:"30px"}}>No Data Found!</Box>}
       </Card>                            

  )
}

export default Species