import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  ListItemButton,
  Avatar,
  ListItemIcon,
  ListItemText,
  ListItem,
  Collapse,
  useMediaQuery
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
// import Arbor from "./listItems"
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { DashboardOutlined, ExpandLess, ExpandMore, ManageAccountsOutlined } from "@mui/icons-material";
import GroupIcon from "@mui/icons-material/Group";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch } from "react-redux";
import { sideNavStyles } from "../../styles/materialComponent";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import AppRoute from '../../routes';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { adminLogout } from "../../actions/adminAuth";

// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';


const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent() {
  const classes = sideNavStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {admin}  = useSelector(({ adminLogin }) => adminLogin)
  const [open, setOpen] = React.useState(true);
  const [openCollapse, setOpenCollapse] = React.useState(false);
  const isMdUp = useMediaQuery(mdTheme.breakpoints.up("md"));
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleLogout = () => {
    Swal.fire({
      // title: 'Are you sure want to Logout?',
      text: "Are you sure want to Logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(adminLogout());
        navigate("/");
      }
    });
  };

  function handleOpenSettings() {
    setOpenCollapse(!openCollapse);
  }
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex"}} className ={classes.mainBox}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          className={classes.headerView}
        >
          <Toolbar
            className={classes.toolbar}

            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                color: "rgb(115 74 153)",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
              
            >
              {!open && (
                <img
                  src="assets/images/logo.png"
                  alt=""
                  style={{paddingTop:7, display: !isMdUp && "none", height:95}}
                />
              )}
            </Typography>
            <IconButton
              sx={{               
                color: "#f2eef7",
                borderRadius: "50%",
                marginLeft:20,
                backgroundColor: "rgb(115 74 153)",
                "&:hover": { backgroundColor: "rgb(115 74 153)" },
              }}
              onClick={handleLogout}
            >
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer 
          variant="permanent" 
          open={open}
          PaperProps={{
            sx: {
              backgroundColor: "#FCFBFD",
            }
          }}
          >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              height:100,
              px: [1],
            }}
          >
            <Typography >
              <img
                src="assets/images/logo.png"
                alt=""
                style={{paddingTop:7, height:95}}
              />
              
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <Box className={classes.avatarView}>
                  <Avatar
                    sx={{ width: open ? 100 : 50, height: open ? 100 : 50, my: 4 }}
                    src={ "assets/images/avatar.jpg"}
                  />
                  <Typography
                    variant="body2"
                    sx={{ opacity: open ? 1 : 0 }}
                    style={{ marginTop: -10 }}
                  >
                   {admin?.name}
                  </Typography>
                </Box>
              </ListItemButton>
            </ListItem>
          </List>
           <List>
           <ListItem
             disablePadding
             sx={{ display: "block" }}
             onClick={() => navigate("/company")}
           >
             <ListItemButton
               sx={{
                 minHeight: 48,
                 justifyContent: open ? "initial" : "center",
                 px: 2.5,
               }}
             >
               <ListItemIcon
                 sx={{
                   minWidth: 0,
                   mr: open ? 3 : "auto",
                   justifyContent: "center",
                 }}
               >
                 <PersonIcon />
               </ListItemIcon>
               <ListItemText
                 primary="Company Manager"
                 sx={{ opacity: open ? 1 : 0 }}
               />
             </ListItemButton>
           </ListItem>
         </List>

          <List>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate("/arbor")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Arbor Manager"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          <List>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate("/healthRate")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <ApartmentIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Health Rate"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          <List>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate("/recommendations")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <ApartmentIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Recommendations"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          <List>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate("/species")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <ApartmentIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Species"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: "#f2eef7",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth={"lg"} sx={{ mt: 10, mb: 4, maxWidth:"95%"}}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12}>
                {/* <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                > */}
                  <AppRoute />
                {/* </Paper> */}
              </Grid>                                            
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
