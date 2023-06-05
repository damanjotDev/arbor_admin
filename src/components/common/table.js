import React,{useState, useEffect} from 'react'
import {TableCell,TableBody, TableContainer, Table, TableHead, TableRow, Box, IconButton, Dialog,AppBar,Grid, Toolbar, DialogTitle, DialogContent,  Menu, MenuItem,Button, Typography} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import  CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { profileSettingStyles } from '../../styles/materialComponent';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Swal from "sweetalert2";
import { deleteCompanyData, setCompany } from '../../actions/company';
import { deleteCompany, deleteHealthRate } from '../../API';
import { deleteArborData, setArbor } from '../../actions/arbor';
import { deleteHealthRateData, setHealthRate } from '../../actions/healthRating';
import { deleteRecommendationData, setRecommendation } from '../../actions/recommendation';
import { deleteSpeciesData, otherSpeciesStatus, setSpecies } from '../../actions/species';

const CommonTable = ({lable, tableCols, tableRows, formik, setActiveStep, component, setEditClick,setEditTreeClick, setShow}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const classes = profileSettingStyles()
  const [selectedItemRow, setSelectedRow] = useState(null)
  const [open,setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  function handleCloses() {
    setAnchorEl(null);
    setSelectedRow(null)
  }
  const handleClose = () => {
    setOpen(false);
  };

  function handleClick(event, row) {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row)
  }
 

  const handleEdit = (row)=>{
    debugger;
  
    switch(lable){
      case "company":
        dispatch(setCompany(row))
        navigate("/editCompany")
        break;
      case "arbor":
        dispatch(setArbor(row))
        navigate("/editArbor")
        break;
     
      case "healthrate":
        dispatch(setHealthRate(row))
        navigate("/editHealthRate")
        break;
      case "recommend":
        dispatch(setRecommendation(row))
        navigate("/editRecommendations")
        break;
      case "species":
        dispatch(setSpecies(row))
        navigate("/editSpecies")
        break;
      case "otherspecies":
          dispatch(otherSpeciesStatus(row._id,{status:true}))
          break;
      case "plans":
           alert("working!")
          break;
      // case "trees":
      //   dispatch(setTree(row))
      //   setEditTreeClick(true)
      //   // setShow(true)
      //   setActiveStep(5)
      //   handleCloses()
      //   break;
      // case "generateReport":
      //   dispatch(setTree(row))
      //   setEditClick(true)
      //   // navigate("/editReport", {state:{data:"/addReport"}})
      //   setActiveStep(4)
      //   handleCloses()
      //   break;
        default:
          return; 
    }
   
  }
  const handleDelete = (id)=>{
    switch(lable){
      case "company":      
           Swal.fire({
            title: 'Are you sure?',
            text: 'It will be permanently deleted',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33', 
            confirmButtonText: 'Yes!'
          }).then((result) => {
            if (result.isConfirmed) {
            dispatch(deleteCompanyData(id))
            Swal.fire('Company deleted successfully', '', 'success');  
            } 
            else{
            Swal.fire('You cancelled the request', '', 'error') }
        })       
        handleCloses()
        break;
      case "arbor":
        Swal.fire({
          title: 'Are you sure?',
          text: 'It will be permanently deleted',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33', 
          confirmButtonText: 'Yes!'
        }).then((result) => {
          if (result.isConfirmed) {
          dispatch(deleteArborData(id))
          Swal.fire('Arbor deleted successfully', '', 'success');  
          } else{
          Swal.fire('You cancelled the request', '', 'error') }
      })      
      handleCloses()
      break;
   
      case "healthrate":
        Swal.fire({
          title: 'Are you sure?',
          text: 'It will be permanently deleted',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33', 
          confirmButtonText: 'Yes!'
        }).then((result) => {
          if (result.isConfirmed) {
          dispatch(deleteHealthRateData(id))
          Swal.fire('HealthRate deleted successfully', '', 'success');  
          } else{
          Swal.fire('You cancelled the request', '', 'error') }
      })      
      handleCloses()
      break;

      case "recommend":
        Swal.fire({
          title: 'Are you sure?',
          text: 'It will be permanently deleted',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33', 
          confirmButtonText: 'Yes!'
        }).then((result) => {
          if (result.isConfirmed) {
          dispatch(deleteRecommendationData(id))
          Swal.fire('Recommendation deleted successfully', '', 'success');  
          } else{
          Swal.fire('You cancelled the request', '', 'error') }
      })      
      handleCloses()
      break;

      case "species":
        Swal.fire({
          title: 'Are you sure?',
          text: 'It will be permanently deleted',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33', 
          confirmButtonText: 'Yes!'
        }).then((result) => {
          if (result.isConfirmed) {
          dispatch(deleteSpeciesData(id))
          Swal.fire('Specie deleted successfully', '', 'success');  
          } else{
          Swal.fire('You cancelled the request', '', 'error') }
      })      
      handleCloses()
      break;

      case "otherspecies":
        Swal.fire({
          title: 'Are you sure?',
          text: 'It will be permanently declined',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33', 
          confirmButtonText: 'Yes!'
        }).then((result) => {
          if (result.isConfirmed) {
          dispatch(otherSpeciesStatus(id,{status:false}))
          Swal.fire('OtherSpecies declined successfully', '', 'success');  
          } else{
          Swal.fire('You cancelled the request', '', 'error') }
      })      
      handleCloses()
      break;
        default:
          return; 
      }
  }
  return (
    <>
      <TableContainer>
        <Table sx = {{minWidth: lable === "clientContact" ? 400 : 650}} className = {lable === "clientContact" && classes.textField1} aria-label="simple table">
        <TableHead >
          <TableRow>
        {
          tableCols?.map((tab, index)=>        
            <TableCell align="left" variant="h4">{tab}</TableCell>
          )
        }
            </TableRow>
            </TableHead>
            <TableBody>
              {
                lable === "company" && 
                tableRows?.length ? tableRows?.map((row)=> 
                <TableRow>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                <Box>
                  <IconButton
                    aria-label="More"
                    aria-owns={open ? "long-menu" : undefined}
                    aria-haspopup="true"
                    onClick={(event)=>handleClick(event, row)}
                    style={{backgroundColor:"gray", color:"white", borderRadius:"4px", padding:7}}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    open={Boolean(anchorEl && selectedItemRow === row)}
                    id="long-menu"
                    anchorEl={anchorEl}
                    onClose={handleCloses}
                  >
                      <MenuItem onClick={handleClose} >
                      <IconButton onClick={()=>handleEdit(row)}>
                      <EditIcon /><Typography style={{marginLeft:5}}>Edit</Typography>
                      </IconButton>
                      </MenuItem>
                      <MenuItem onClick={handleClose} >
                      <IconButton onClick={()=>handleDelete(row._id)}>
                      <DeleteIcon /><Typography style={{marginLeft:5}}>Delete</Typography>
                        </IconButton>
                      </MenuItem>
                     
                  </Menu>
              </Box>
                {/* <IconButton aria-label="Edit" onClick={()=>handleEdit(row)}>
                <EditIcon />
                </IconButton> */}
                </TableCell>
                {/* <TableCell>
                <IconButton aria-label="Delete" onClick={()=>handleDelete(row._id)}> 
                <DeleteIcon />
                  </IconButton>
                </TableCell> */}
            </TableRow>
                ):null
              }
                {
                lable === "arbor" && 
                tableRows?.length ? tableRows?.map((row, index)=> 
                <TableRow>
                <TableCell>{row?.company.name}</TableCell>
                <TableCell>{`${row?.firstName} ${row?.lastName}`}</TableCell>
                <TableCell>{row?.address}</TableCell>
                <TableCell>
                <Box>
                  <IconButton
                    aria-label="More"
                    aria-owns={open ? "long-menu" : undefined}
                    aria-haspopup="true"
                    onClick={(event)=>handleClick(event, row)}
                    style={{backgroundColor:"gray", color:"white", borderRadius:"4px", padding:7}}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    open={Boolean(anchorEl && selectedItemRow === row)}
                    id="long-menu"
                    anchorEl={anchorEl}
                    onClose={handleCloses}
                    >
                      <MenuItem onClick={handleClose} >
                      <IconButton onClick={()=>handleEdit(row)}>
                      <EditIcon /><Typography style={{marginLeft:5}}>Edit</Typography>
                      </IconButton>
                      </MenuItem>
                      <MenuItem onClick={handleClose} >
                      <IconButton onClick={()=>handleDelete(row._id)}>
                      <DeleteIcon /><Typography style={{marginLeft:5}}>Delete</Typography>
                      </IconButton>
                      </MenuItem>                    
                  </Menu>
              </Box>
                {/* <IconButton aria-label="Edit" onClick={()=>handleEdit(row)}>
                <EditIcon />
                </IconButton> */}
                </TableCell>
                {/* <TableCell>
                <IconButton aria-label="Delete" onClick={()=>handleDelete(row._id)}> 
                <DeleteIcon />
                  </IconButton>
                </TableCell> */}
            </TableRow>
                ):null
              }

              {
                lable === "healthrate" && 
                tableRows?.length ? tableRows?.map((row, index)=> 
                <TableRow>
                <TableCell>{index+1}</TableCell>
                <TableCell>{row?.rating}</TableCell>
                <TableCell>
                <Box>
                  <IconButton
                    aria-label="More"
                    aria-owns={open ? "long-menu" : undefined}
                    aria-haspopup="true"
                    onClick={(event)=>handleClick(event, row)}
                    style={{backgroundColor:"gray", color:"white", borderRadius:"4px", padding:7}}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    open={Boolean(anchorEl && selectedItemRow === row)}
                    id="long-menu"
                    anchorEl={anchorEl}
                    onClose={handleCloses}
                    >
                      <MenuItem onClick={handleClose} >
                      <IconButton onClick={()=>handleEdit(row)}>
                      <EditIcon /><Typography style={{marginLeft:5}}>Edit</Typography>
                      </IconButton>
                      </MenuItem>
                      <MenuItem onClick={handleClose} >
                      <IconButton onClick={()=>handleDelete(row._id)}>
                      <DeleteIcon /><Typography style={{marginLeft:5}}>Delete</Typography>
                      </IconButton>
                      </MenuItem>                    
                  </Menu>
              </Box>
                {/* <IconButton aria-label="Edit" onClick={()=>handleEdit(row)}>
                <EditIcon />
                </IconButton> */}
                </TableCell>
                {/* <TableCell>
                <IconButton aria-label="Delete" onClick={()=>handleDelete(row._id)}> 
                <DeleteIcon />
                  </IconButton>
                </TableCell> */}
            </TableRow>
                ):null
              }
              {
                lable === "recommend" && 
                tableRows?.length ? tableRows?.map((row, index)=> 
                <TableRow>
                <TableCell>{row?.recomendation}</TableCell>
                <TableCell>{row?.recomendationType}</TableCell>
                <TableCell>
                <Box>
                  <IconButton
                    aria-label="More"
                    aria-owns={open ? "long-menu" : undefined}
                    aria-haspopup="true"
                    onClick={(event)=>handleClick(event, row)}
                    style={{backgroundColor:"gray", color:"white", borderRadius:"4px", padding:7}}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    open={Boolean(anchorEl && selectedItemRow === row)}
                    id="long-menu"
                    anchorEl={anchorEl}
                    onClose={handleCloses}
                    >
                      <MenuItem onClick={handleClose} >
                      <IconButton onClick={()=>handleEdit(row)}>
                      <EditIcon /><Typography style={{marginLeft:5}}>Edit</Typography>
                      </IconButton>
                      </MenuItem>
                      <MenuItem onClick={handleClose} >
                      <IconButton onClick={()=>handleDelete(row._id)}>
                      <DeleteIcon /><Typography style={{marginLeft:5}}>Delete</Typography>
                      </IconButton>
                      </MenuItem>                    
                  </Menu>
              </Box>
                {/* <IconButton aria-label="Edit" onClick={()=>handleEdit(row)}>
                <EditIcon />
                </IconButton> */}
                </TableCell>
                {/* <TableCell>
                <IconButton aria-label="Delete" onClick={()=>handleDelete(row._id)}> 
                <DeleteIcon />
                  </IconButton>
                </TableCell> */}
            </TableRow>
                ):null
              }
                {
                lable === "species" && 
                tableRows?.length ? tableRows?.map((row, index)=> 
                <TableRow>
                <TableCell>{row?.commonName?row?.commonName:"Common name not exist"}</TableCell>
                <TableCell>{row?.scientificName?row?.scientificName:"Scientific name not exist"}</TableCell>
                <TableCell>
                <Box>
                  <IconButton
                    aria-label="More"
                    aria-owns={open ? "long-menu" : undefined}
                    aria-haspopup="true"
                    onClick={(event)=>handleClick(event, row)}
                    style={{backgroundColor:"gray", color:"white", borderRadius:"4px", padding:7}}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    open={Boolean(anchorEl && selectedItemRow === row)}
                    id="long-menu"
                    anchorEl={anchorEl}
                    onClose={handleCloses}
                    >
                      <MenuItem onClick={handleClose} >
                      <IconButton onClick={()=>handleEdit(row)}>
                      <EditIcon /><Typography style={{marginLeft:5}}>Edit</Typography>
                      </IconButton>
                      </MenuItem>
                      <MenuItem onClick={handleClose} >
                      <IconButton onClick={()=>handleDelete(row._id)}>
                      <DeleteIcon /><Typography style={{marginLeft:5}}>Delete</Typography>
                      </IconButton>
                      </MenuItem>                    
                  </Menu>
              </Box>
                {/* <IconButton aria-label="Edit" onClick={()=>handleEdit(row)}>
                <EditIcon />
                </IconButton> */}
                </TableCell>
                {/* <TableCell>
                <IconButton aria-label="Delete" onClick={()=>handleDelete(row._id)}> 
                <DeleteIcon />
                  </IconButton>
                </TableCell> */}
            </TableRow>
                ):null
              }
               {
                lable === "otherspecies" && 
                tableRows?.length ? tableRows?.map((row, index)=> 
                <TableRow>
                <TableCell>{row?.commonName?row?.commonName:"Common name not exist"}</TableCell>
                <TableCell>{row?.scientificName?row?.scientificName:"Scientific name not exist"}</TableCell>
                <TableCell>
                <Box>
                  <IconButton
                    aria-label="More"
                    aria-owns={open ? "long-menu" : undefined}
                    aria-haspopup="true"
                    onClick={(event)=>handleClick(event, row)}
                    style={{backgroundColor:"gray", color:"white", borderRadius:"4px", padding:7}}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    open={Boolean(anchorEl && selectedItemRow === row)}
                    id="long-menu"
                    anchorEl={anchorEl}
                    onClose={handleCloses}
                    >
                      <MenuItem onClick={handleClose} >
                      <IconButton onClick={()=>handleEdit(row)}>
                      <ThumbUpIcon /><Typography style={{marginLeft:5}}>Approve</Typography>
                      </IconButton>
                      </MenuItem>
                      <MenuItem onClick={handleClose} >
                      <IconButton onClick={()=>handleDelete(row._id)}>
                      <ThumbDownIcon /><Typography style={{marginLeft:5}}>Decline</Typography>
                      </IconButton>
                      </MenuItem>                    
                  </Menu>
              </Box>
                {/* <IconButton aria-label="Edit" onClick={()=>handleEdit(row)}>
                <EditIcon />
                </IconButton> */}
                </TableCell>
                {/* <TableCell>
                <IconButton aria-label="Delete" onClick={()=>handleDelete(row._id)}> 
                <DeleteIcon />
                  </IconButton>
                </TableCell> */}
            </TableRow>
                ):null
              }
              
              {
                lable === "plans" && 
                tableRows?.length ? tableRows?.map((row, index)=> 
                <TableRow>
                <TableCell>{row?.productDetails?.name}</TableCell>
                <TableCell>{`${row?.productDetails?.price?.currency==="usd"?"$":"₹"}${row?.productDetails?.price?.unit_amount/100}.00`}</TableCell>
                <TableCell>
                <Box>
                  <IconButton
                    aria-label="More"
                    aria-owns={open ? "long-menu" : undefined}
                    aria-haspopup="true"
                    onClick={(event)=>handleClick(event, row)}
                    style={{backgroundColor:"gray", color:"white", borderRadius:"4px", padding:7}}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    open={Boolean(anchorEl && selectedItemRow === row)}
                    id="long-menu"
                    anchorEl={anchorEl}
                    onClose={handleCloses}
                    >
                      <MenuItem onClick={handleClose} >
                      <IconButton onClick={()=>handleEdit(row)}>
                      <EditIcon /><Typography style={{marginLeft:5}}>Edit</Typography>
                      </IconButton>
                      </MenuItem>
                      <MenuItem onClick={handleClose} >
                      <IconButton onClick={()=>handleDelete(row._id)}>
                      <DeleteIcon /><Typography style={{marginLeft:5}}>Delete</Typography>
                      </IconButton>
                      </MenuItem>                    
                  </Menu>
              </Box>
                {/* <IconButton aria-label="Edit" onClick={()=>handleEdit(row)}>
                <EditIcon />
                </IconButton> */}
                </TableCell>
                {/* <TableCell>
                <IconButton aria-label="Delete" onClick={()=>handleDelete(row._id)}> 
                <DeleteIcon />
                  </IconButton>
                </TableCell> */}
            </TableRow>
                ):null
              }
                </TableBody>
            </Table>
            </TableContainer>
    </>
  )
}

export default CommonTable