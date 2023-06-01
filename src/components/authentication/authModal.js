import React, {useState} from 'react';
import Box from '@mui/material/Box';
import { TextField, Typography, Button, InputAdornment, IconButton , styled, Modal, Container, Card} from '@mui/material';
import {Link} from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { authModalStyles } from '../../styles/header';
import { useNavigate } from "react-router-dom"
import { useDispatch , useSelector} from 'react-redux';
import { CssTextField } from '../../styles/materialComponent';
import Loader from '../common/loader';
import { adminAuth } from '../../actions/adminAuth';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  outline:'none',
  borderRadius:2,
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 5,
  pb:8
};

export default function Login() {
  const classes = authModalStyles()

  const dispatch = useDispatch()
  const navigate =  useNavigate()

  const [showPassword, setShowPassword]= useState(false)
  const [showCode, setShowCode] = useState(false)
  const [forgotPassword, setForgotPassword]= useState(false)
  const [codeSent, setCodeSent]= useState(false)
  const {loader} = useSelector(({adminLogin})=>adminLogin)

  const [data, setData] = useState({
      email:"",
      password:""
  })


  // const [forgotData, setForgotData] = useState({
  //   email: forgotPasswordEmail?.email ? forgotPasswordEmail?.email : "",
  //   code:"",
  //   password:""
  // })
  
  const handleChange =(e)=>{
    console.log(e.target.value)
    const {name, value} = e.target
    // console.log(data)
    setData({...data, [name]:value})
  }

  // const handleValueChange =(e)=>{
  //   console.log(e.target.value)
  //   const {name, value} = e.target
  //   // console.log(data)
  //   setState({...state, [name]:value})
  // }
  const handleSubmit =(e)=>{
    e.preventDefault()
    dispatch(adminAuth(data, navigate))
  }

  const toggle=()=>{
    setShowPassword(!showPassword)
  }

  // const toggleCode =()=>{
  //   setShowCode(!showCode)
  // }

  // const handlePasswordCode = (e)=>{
  //   e.preventDefault()
  //   // dispatch(generateCode(state))
  //   setCodeSent(true)
  // }
  
  // const handleForgotChange =(e)=>{
  //   console.log(e.target.value)
  //   const {name, value} = e.target
  //   // console.log(data)
  //   setForgotData({...forgotData, [name]:value})
  // }

  // const handleResetPassword =(e)=>{
  //   e.preventDefault()
  //   // dispatch(forgotPass(forgotData))
  // }

  return (
    
    <Container sx={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"100%"}}>
      <Card sx={{width:"40%"}}>
      <Box p={3} className ={classes.loginModal}>
      <Typography  fontFamily="CormorantBoldItalic" className={classes.loginText}>Login</Typography>
      <CssTextField
        variant="outlined"
        id="custom-css-outlined-input"
        label="Email"
        name="email"
        value = {data.email}
        onChange={handleChange}
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused,
          },
        }}
        fullWidth
      />
      <CssTextField
        variant="outlined"
        id="custom-css-outlined-input"
        fullWidth
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        value={data.password}  
        onChange={handleChange}  
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused,
          },
        }}   
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
               <IconButton
                 onClick={toggle}
                 edge="end"
               >
                 {showPassword ? <VisibilityIcon />  : <VisibilityOffIcon /> }
               </IconButton>
             </InputAdornment>
          ) 
        }}
      />   
                  
      <Button 
        variant="contained"
        size="large"     
        style={{backgroundColor:"rgb(115 74 153)"}}   
        onClick={handleSubmit}
      >
         {loader ? <Loader size={25}/> : "Login"}
      </Button>
      <Typography className={classes.forgotStyle} onClick={()=>setForgotPassword(true)}>Forgot Password??</Typography>
    </Box>
      </Card>
    </Container>

  );
}