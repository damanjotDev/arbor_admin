import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Card, Button, Typography, Box} from '@mui/material';
import CommonTable from "../../common/table"

import {useSelector, useDispatch} from "react-redux"
import { styled } from '@mui/material/styles';
import {clientStyles} from "../../../styles/materialComponent"
import { NotificationManager } from 'react-notifications';
import { getAllCompanies } from '../../../actions/company';

const arbor =[
    "Company",
    "Email",
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

const CompanyManager = () => {
  const classes = clientStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {companies,loader}=useSelector(({company})=>company)

  useEffect(()=>{
      dispatch(getAllCompanies())
  },[])
  
  return (   
          <Card
          style={{boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)", backgroundColor:"#FCFBFD"}}
          className={classes.clientContainer}
          >
            <div style={{padding:15, display: 'flex', justifyContent: 'space-between', padding:20}}>
            <Typography variant="h5">Company Manager</Typography>
            <Button variant="contained" style={{backgroundColor:"rgb(115 74 153)",textTransform:"none"}} onClick={()=>navigate("/addCompany")}>
              Add Company 
              </Button>
              </div><hr />
          {companies?.length?<CommonTable lable="company" tableCols={arbor} tableRows={companies}/>:loader?<Box style={{width:"auto",padding:"30px"}}>Processing!</Box>:<Box style={{width:"auto",padding:"30px"}}>No Data Found!</Box>}
       </Card>                            

  )
}

export default CompanyManager