import React, { useEffect , useState} from 'react';
import { makeStyles } from '@mui/styles';
import {Link,Button,Switch,Box,Grid,Container,CardContent,CardHeader,Card,Typography} from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getSubsCriptionPlans } from '../../../actions/plans';
import CommonTable from '../../common/table';

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundImage: 'url("nereus-assets/img/bg/pattern1.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  cardHeader: {
    paddingTop: theme.spacing(3),
  },
}));


const healthrate =[
  "Plan Name",
  "Plan Price",
  "Actions"
]

export const Plans=()=> {
  const classes = useStyles();
  const{loader, plans}=useSelector(({plans})=>plans)
  console.log("plans", plans)
  const [plansSorted, setPlansSorted] = useState(null)
  const dispatch = useDispatch();




  useEffect(()=>{
  console.log(">>ls2");
    dispatch(getSubsCriptionPlans())
  },[])

  useEffect(()=>{
    debugger;
   plans?.length &&  setPlansSorted(plans?.sort((a,b)=>a.productDetails?.price?.unit_amount-b.productDetails?.price?.unit_amount))
  },[plans])

  
  return (
    <Card
    style={{boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)", backgroundColor:"#FCFBFD"}}
    className={classes.clientContainer}
    >
      <div style={{padding:15, display: 'flex', justifyContent: 'space-between', padding:20}}>
      <Typography variant="h5">Other Species</Typography>
        </div><hr />
    {plans?.length?<CommonTable lable="plans" tableCols={healthrate} tableRows={plans}/>:loader?<Box style={{width:"auto",padding:"30px"}}>Processing!</Box>:<Box style={{width:"auto",padding:"30px"}}>No Data Found!</Box>}
 </Card>  
  );
}