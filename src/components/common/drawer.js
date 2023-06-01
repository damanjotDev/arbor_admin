import React,{useState} from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { headerStyles } from '../../styles/header';
import { HashLink as NavLink} from 'react-router-hash-link';
import {Drawer, Box, List, ListItem, ListItemButton, IconButton, Modal} from "@mui/material";
import AuthModal from '../authentication/authModal';
import { useSelector } from "react-redux";
import { Link , useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
// import { arboristLogout } from "../../actions/arboristLogin"

const DrawerComponent = () => {
    const classes = headerStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoggedIn } = useSelector(({arboristLogin})=>arboristLogin)
    const [openDrawer, setOpenDrawer] = useState(false);
    const [active, setActive] = useState(0);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true)
      setOpenDrawer(false)
    };
    const handleClose = () => setOpen(false);

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      outline:'none',
      borderRadius:2,
      transform: 'translate(-50%, -50%)',
      width: 300,
      bgcolor: 'background.paper',
      // border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      pb:8
    };

    const handleLogout =()=>{
      // dispatch(arboristLogout())
      navigate("/")
    }

  return (
    <div>
        <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box p={2} width="200px">
        { !isLoggedIn ? 
        <List>
          <ListItem onClick={() => setOpenDrawer(false)}>
          <ListItemButton>
          <NavLink smooth to='/#home'  onClick={()=>setActive(1)} style={{color: active===1 ? "rgb(115 74 153)":"#222222"}} className={classes.navlink}>
                  Home
                </NavLink>
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
          <ListItemButton>
          <NavLink smooth to='/#arboristWork' onClick={()=>setActive(2)} style={{color: active===2 ? "rgb(115 74 153)":"#222222"}} className={classes.navlink}>
              What We do
            </NavLink> 
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
          <ListItemButton>
          <NavLink smooth to='/#leader' onClick={()=>setActive(3)} style={{color: active === 3 ? "rgb(115 74 153)":"#222222"}} className={classes.navlink}>
            Our Leader
          </NavLink>
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
          <ListItemButton>
          <NavLink smooth to='/#services' onClick={()=>setActive(4)} style={{color: active === 4 ? "rgb(115 74 153)":"#222222"}} className={classes.navlink}>
            Services      
            </NavLink>
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
          <ListItemButton>
          <NavLink smooth to='/#visit' onClick={()=>setActive(5)} style={{color: active === 5 ? "rgb(115 74 153)":"#222222"}} className={classes.navlink}>
            Schedule a visit
          </NavLink>   
            </ListItemButton>           
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemButton>
            <NavLink smooth to='/#contact'  onClick={()=>setActive(6)} style={{color: active === 6 ? "rgb(115 74 153)":"#222222"}} className={classes.navlink}>
              Contact Us      
              </NavLink> 
           </ListItemButton>           
          </ListItem>
          <ListItem onClick={handleOpen} style={{cursor:"pointer"}}>
          <ListItemButton>
            Login
           </ListItemButton>
          </ListItem>
        </List>:
        <List>
        <ListItem onClick={() => setOpenDrawer(false)}>
        <ListItemButton>
        <Link to='/arbor'  onClick={()=>setActive(1)} style={{color: active===1 ? "rgb(115 74 153)":"#222222"}} className={classes.navlink}>
            Home
        </Link>
          </ListItemButton>
        </ListItem>
        <ListItem onClick={() => setOpenDrawer(false)}>
        <ListItemButton>
        <Link to='/reports' onClick={()=>setActive(2)} style={{color: active===2 ? "rgb(115 74 153)":"#222222"}} className={classes.navlink}>
           Reports
          </Link> 
          </ListItemButton>
        </ListItem>
        <ListItem onClick={() => setOpenDrawer(false)}>
          <ListItemButton>
          <Link  to='/profileSetting' onClick={()=>setActive(3)} style={{color: active === 3 ? "rgb(115 74 153)":"#222222"}} className={classes.navlink}>
            User Settings
          </Link>
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
          <ListItemButton>
          <Link to='/clientManager' onClick={()=>setActive(3)} style={{color: active === 3 ? "rgb(115 74 153)":"#222222"}} className={classes.navlink}>
            Client Manager
          </Link>
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
          <ListItemButton onClick={ handleLogout }>
            Logout
            </ListItemButton>
          </ListItem>
        </List>
        }
        </Box>
      </Drawer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AuthModal handleClose={handleClose} />
        </Box>
      </Modal>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)} >
        <MenuIcon sx={{color:"rgb(116 75 154)", width:80, height:27}}/>
      </IconButton>
    </div>
  )
}

export default DrawerComponent