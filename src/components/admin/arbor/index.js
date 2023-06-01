import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Container, Grid,  Card, Button, Typography, Menu, MenuItem, IconButton , Box} from '@mui/material';
import CommonTable from "../../common/table"
import {useSelector, useDispatch} from "react-redux"
import { styled } from '@mui/material/styles';
import {CssTextField, clientStyles} from "../../../styles/materialComponent"
import { getArbors } from '../../../actions/arbor';
const Arbor =[
    "Company",
    "Arbor",
    "Address",
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

const ArborManager = () => {
  const classes = clientStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {arbors,loader}=useSelector(({arbor})=>arbor)

  
  useEffect(()=>{
    dispatch(getArbors())
  },[])


  return (   
          <Card
          style={{boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)", backgroundColor:"#FCFBFD"}}
          className={classes.clientContainer}
          >
            <div style={{padding:15, display: 'flex', justifyContent: 'space-between', padding:20}}>
            <Typography variant="h5">Arbor Manager</Typography>

            <Button variant="contained" style={{backgroundColor:"rgb(115 74 153)",textTransform:"none"}} onClick={()=>navigate("/addArbor")}>
              Add Arbor
              </Button>
              </div><hr />
              {/* <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleAddClient}><IconButton><AddCircleOutlineOutlinedIcon /></IconButton>Add Client</MenuItem>
              <MenuItem onClick={handleAddProperties}><IconButton><AddCircleOutlineOutlinedIcon /></IconButton>Add Propery</MenuItem>
              <MenuItem onClick={handleViewClient}><IconButton><VisibilityOutlinedIcon /></IconButton>View Clients</MenuItem>
              <MenuItem onClick={handleViewProperty}><IconButton><VisibilityOutlinedIcon /></IconButton>View Properties</MenuItem>
           </Menu>            */}
          {arbors?.length?<CommonTable lable="arbor" tableCols={Arbor} tableRows={arbors}/>:loader?<Box style={{width:"auto",padding:"30px"}}>Processing!</Box>:<Box style={{width:"auto",padding:"30px"}}>No Data Found!</Box>}
       </Card>                            

  )
}

export default ArborManager