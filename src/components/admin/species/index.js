import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Card, Button, Typography, Box, Pagination, Stack} from '@mui/material';
import CommonTable from "../../common/table"

import {useSelector, useDispatch} from "react-redux"
import { styled } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import { getSpecies } from '../../../actions/species';

const healthrate =[
    "Common Name",
    "Scientific Name",
    "Actions"
]
const useStyles = makeStyles(()=>({
  pagination:{
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Species = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {species,loader}=useSelector(({species})=>species)
  const [page, setPage] = useState(1);
  const [show,setShow]=useState([])

  useEffect(()=>{
      dispatch(getSpecies())
  },[])
  
  useEffect(()=>{
   setShow(species.slice((page-1)*8,page*8))
  },[page])
  
  const handleChange = (event, value) => {
    setPage(value);  
  };
  return (   
        <>
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
          {show?.length?<CommonTable lable="species" tableCols={healthrate} tableRows={show}/>:loader?<Box style={{width:"auto",padding:"30px"}}>Processing!</Box>:<Box style={{width:"auto",padding:"30px"}}>No Data Found!</Box>}
          
       </Card>                            
        <div style={{padding:15, display: 'flex', justifyContent: 'space-between', padding:20}}>
        {`Showing ${1+8*(page-1)} to ${page*8} of ${species?.length} entries`}
        <div className ={classes.Pagination} >
          <Stack spacing={2}>
          <Pagination  count={Math.round(species?.length/13)} page={page} onChange={handleChange}  color="secondary" />
          </Stack>
          </div>
        </div>
        </>
  )
}

export default Species