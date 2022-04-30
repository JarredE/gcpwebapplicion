import "./App.css";
import '@fontsource/montserrat/200.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/900.css';
import Admin from "./pages/Admin";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import Archive from "./pages/Archive";
import AssignedReferrals from "./pages/AssignedReferrals";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Badge from '@mui/material/Badge';
import BeginReferral from "./pages/BeginReferral";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
//import Drawer from '@mui/material/Drawer';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import FolderIcon from '@mui/icons-material/Folder';
import HailIcon from '@mui/icons-material/Hail';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import Home from "./pages/Home";
import IconButton from '@mui/material/IconButton';
import PickupQueue from "./pages/PickupQueue";
import { Redirect } from "react-router";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import MyReferrals from "./pages/MyReferrals";
import NewReferral from "./pages/NewReferral";
import {makeStyles} from '@material-ui/core';
import SettingsIcon from '@mui/icons-material/Settings';
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import AccountManage from "./pages/AccountManage";
import updateInfo from "./pages/updateInfo";
import ReferralDetails from "./pages/ReferralDetails";
//import Reports from "./pages/Reports";
import ManageReferrals from "./pages/ManageReferrals";
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
//import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import ViewReferralDetails from "./pages/ViewReferralDetails";


//css stuff



function App(props) {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    Email: "",
    Firstname: "",
    Lastname: "",
    Agency: "",
    Agency_zipcode: "",
    Phonenumber: "",
    PhoneProvider:"",
    nearest_location: "",
    self_notes:"",
    role:"",
    avatar:"",
    num_assigned:"",
    num_completed: "",
    Notification: "",
    status: false,
  });


//Sidenav drawer stuff
  const theme = useTheme();
  const drawerWidth = 280;
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: '#fff'
  });
  
  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(9)} + 1px)`,
      backgroundColor: '#fff'
    },
  });

  const DrawerHeader = styled('div')(({ theme }) => ({
    alignItems: 'center',
    height: '190px',
    ...theme.mixins.toolbar,
  }));

  const DrawerHeaderIn = styled('div')(({ theme }) => ({
    alignItems: 'center',
    height: '185px',
    ...theme.mixins.toolbar,
  }));
  
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
  }));
  
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );

//CSS for sidenav and Appbar + variable dimensions
  const useStyles = makeStyles(theme => ({
    pageContent: {
        alignItems: 'center',
        display: 'block',
        flexGrow: 1,
        flexDirection: 'column',
        marginLeft: 'auto',
        marginRight: 'auto',
        ...(open && {
          marginLeft: drawerWidth,
        }
        )},
    infoBar: {
        alignItems: 'center',
        alignContent: 'center',
        marginTop: "67px",
        display: 'flex',
        minHeight: '2.5rem',
        paddingLeft: "100px",
        position: 'fixed',
        backgroundColor: '#449342',
        color: "white",
        width: `100%`,
        zIndex: theme.zIndex.drawer + 1,
        ...(open && {
          marginLeft: drawerWidth,
          }
          )},
    appbar: {
      backgroundColor: "#fff !important",
     
     // background: 'no-repeat',
      display: "flex",
      width: "100%",
      color: "white !important",
      ...(open && {
        marginLeft: drawerWidth,
      }
      )},
      toolbar: {
        backgroundColor: "#86bd48 !important",
        display: "flex",
        ...(open && {
          marginLeft: drawerWidth,
        }
        )},
  }))
  const classes = useStyles();

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            Email: response.data.Email,
            Firstname: response.data.Firstname,
            Lastname: response.data.Lastname,
            role: response.data.role,
            avatar: response.data.avatar,
            Agency: response.data.Agency,
            Agency_zipcode: response.data.Agency_zipcode,
            Phonenumber: response.data.Phonenumber,
            PhoneProvider: response.data.PhoneProvider,
            nearest_location: response.data.nearest_location,
            self_notes: response.data.self_notes,
            num_assigned: response.data.num_assigned,
            num_completed: response.data.num_completed,
            Notification: response.data.Notification,
            status: true,
          });
          

        }
      });
  }, []);

const referralStart = localStorage.getItem("referralStart")
const fname = localStorage.getItem("Firstname");
const lname = localStorage.getItem("Lastname");
const role = localStorage.getItem("Role");
const active = localStorage.getItem("Assigned_Referrals");
const done = localStorage.getItem("Completed_Referrals");
//log off and log on covers
const logOffScreen = document.getElementById('logoff');
const logOffYN = localStorage.getItem("logOffScreen");
const username = localStorage.getItem("username");


  const logout = () => {
    if(logOffYN === "true"){
      logOffScreen.classList.add('available');
        
      setTimeout(() => {
        logOffScreen.classList.add('gone');
        
      }, 1000)
    }

   
    
    //remove referral started status if logging out to avoid null errors on return to form
    localStorage.removeItem("referralStart");
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0,  Email: "", Firstname: "",
    Lastname: "", Agency: "", Agency_zipcode: "", Phonenumber: "",
    nearest_location: "", Notification: "", status: false });
    window.location.replace("/login")
     //wait to set loading screen true so it doesn't appear on logout
    setTimeout(() => {
      localStorage.setItem("loadingScreen", true);
      localStorage.setItem("logOffScreen", false);
    }, 3000)
  };

  //get volunteer announcement
  const [volunteerAnnouncementDefault, setVolunteerAnnouncementDefault] = React.useState({});

  const volunteerAnnID = 1;
  useEffect(() => {
    const getVolunteerAnnouncement = () => {
      axios.get(`http://localhost:3001/announcements/announcementinfo/${volunteerAnnID}`).then((response) => {  
        setVolunteerAnnouncementDefault(response.data);
      }).catch(error => console.error('Error:' + error));
    };
    getVolunteerAnnouncement();
  }, []);

  const volunteerAnnouncement = volunteerAnnouncementDefault.announcement;

//get referrer announcement
  const [referrerAnnouncementDefault, setReferrerAnnouncementDefault] = React.useState({});

  const referrerAnnID = 2;
  useEffect(() => {
    const getReferrerAnnouncement = () => {
      axios.get(`http://localhost:3001/announcements/announcementinfo/${referrerAnnID}`).then((response) => {  
        setReferrerAnnouncementDefault(response.data);
      }).catch(error => console.error('Error:' + error));
    };
    getReferrerAnnouncement();
  }, []);

  const referrerAnnouncement = referrerAnnouncementDefault.announcement;

  //Get unassigned count for menu alert
  const [numUnassigned, setNumUnassigned,] = useState("");
   useEffect(() => {
    countAllUnassigned();
    }, []);

const countAllUnassigned = () => {
  axios.get(`http://localhost:3001/referrals/unassignedCount`).then((response) => {  
    setNumUnassigned(response.data);
    })
    .catch(error => console.error('Error:' + error));
    };

//Get awaiting pickup count for menu alert
const [numAwaitingPickup, setNumAwaitingPickup,] = useState("");
useEffect(() => {
  countAllAwaitingPickup();
  }, []);

const countAllAwaitingPickup = () => {
axios.get(`http://localhost:3001/referrals/submittedAwaitingPickup/?referrer=${username}`, {
  params: {
    username: username
  }

}).then((response) => {  
  setNumAwaitingPickup(response.data);
  })
  .catch(error => console.error('Error:' + error));
  };
//change links based on role
  var linkViews = (<></>);


  if(role === "Referrer") {
    linkViews = (<>
      <Link className="navTwo" to="/referral-agreement"><HistoryEduIcon
      fontSize="medium" /></Link>
      <Link className="navTwo" to="/my-referrals"><FolderIcon
      fontSize="medium" /></Link>
      <Link className="navTwo" to="/awaiting-pickup"><Badge color="error" max={99} badgeContent={numAwaitingPickup}><HailIcon
   fontSize="medium" /></Badge></Link>
      </>);
  }if(role === "Admin") {
    linkViews = (<>
   <Link className="navTwo" to="/referral-agreement"><HistoryEduIcon
   fontSize="medium" /></Link>
   <Link className="navTwo" to="/assigned-referrals"><AssignmentIndIcon
   fontSize="medium" /></Link>
   <Link className="navTwo" to="/my-referrals"><FolderIcon
   fontSize="medium" /></Link>
   <Link className="navTwo" to="/awaiting-pickup"><Badge color="error" max={99} badgeContent={numAwaitingPickup}><HailIcon
   fontSize="medium" /></Badge></Link>
   <Link className="navTwo" to="/managereferrals"><Badge color="error" max={99} badgeContent={numUnassigned}><AllInboxIcon
   fontSize="medium" /></Badge></Link>
   <Link className="navTwo" to="/completed-referrals"><FactCheckIcon
   fontSize="medium" /></Link>
   {/* <Link className="navTwo" to="/reports"><PrintIcon
   fontSize="medium" /></Link> */}
      </>);
  }
  if(role === "Volunteer") {
    linkViews = (<>
   <Link className="navTwo" to="/referral-agreement"><HistoryEduIcon
   fontSize="medium" /></Link>
   <Link className="navTwo" to="/assigned-referrals"><AssignmentIndIcon
   fontSize="medium" /></Link>
   <Link className="navTwo" to="/my-referrals"><FolderIcon
   fontSize="medium" /></Link>
   <Link className="navTwo" to="/awaiting-pickup"><Badge color="error" max={99} badgeContent={numAwaitingPickup}><HailIcon
   fontSize="medium" /></Badge></Link>
   <Link className="navTwo" to="/managereferrals"><Badge color="error" max={99} badgeContent={numUnassigned}><AllInboxIcon
   fontSize="medium" /></Badge></Link>
   <Link className="navTwo" to="/completed-referrals"><FactCheckIcon
   fontSize="medium" /></Link>
   {/* <Link className="navTwo" to="/reports"><PrintIcon
   fontSize="medium" /></Link> */}
      </>);
  }



  var linkViewsOpen = (<></>);


  if(role === "Referrer") {
    linkViewsOpen = (<>
    <Link className="navOne" to="/referral-agreement"><Badge color="error" max={99} badgeContent={null}><HistoryEduIcon
    fontSize="small" /></Badge> <span className="navLinkText">START A REFERRAL</span></Link>
    <Link className="navOne" to="/my-referrals"><Badge color="error" max={99} badgeContent={null}><FolderIcon
    fontSize="small" /></Badge> <span className="navLinkText">MY REFERRALS</span></Link>
    <Link className="navOne" to="/awaiting-pickup"><Badge color="error" max={99} badgeContent={numAwaitingPickup}><HailIcon
    fontSize="small" /></Badge> <span className="navLinkText">READY PACKAGES</span></Link>
    </>); }
    if(role === "Admin") {
    linkViewsOpen = (<>
    <Link className="navOne" to="/referral-agreement"><Badge color="error" max={99} badgeContent={null}><HistoryEduIcon
    fontSize="small" /></Badge> <span className="navLinkText">START A REFERRAL</span></Link>
    <Link className="navOne" to="/assigned-referrals"><Badge color="error" max={99} badgeContent={null}><AssignmentIndIcon
    fontSize="small" /></Badge> <span className="navLinkText">ASSIGNED REFERRALS</span></Link>
    <Link className="navOne" to="/my-referrals"><Badge color="error" max={99} badgeContent={null}><FolderIcon
    fontSize="small" /></Badge> <span className="navLinkText">MY REFERRALS</span></Link>
    <Link className="navOne" to="/awaiting-pickup"><Badge color="error" max={99} badgeContent={numAwaitingPickup}><HailIcon
    fontSize="small" /></Badge> <span className="navLinkText">READY PACKAGES</span></Link>
    <Link className="navOne" to="/managereferrals"><Badge color="error" max={99} badgeContent={numUnassigned}><AllInboxIcon
    fontSize="small" /></Badge><span className="navLinkText">REFERRAL INBOX</span></Link>
    <Link className="navOne" to="/completed-referrals"><Badge color="error" max={99} badgeContent={null}><FactCheckIcon
    fontSize="small" /></Badge> <span className="navLinkText">FULFILLED REFERRALS</span></Link>
    {/* <Link className="navOne" to="/reports"><PrintIcon
    fontSize="small" /> <span className="navLinkText"> PRINT REPORTS</span></Link> */}
    </>);
  }
  if(role === "Volunteer") {
    linkViewsOpen = (<>
    <Link className="navOne" to="/referral-agreement"><Badge color="error" max={99} badgeContent={null}><HistoryEduIcon
    fontSize="small" /></Badge> <span className="navLinkText">START A REFERRAL</span></Link>
    <Link className="navOne" to="/assigned-referrals"><Badge color="error" max={99} badgeContent={null}><AssignmentIndIcon
    fontSize="small" /></Badge> <span className="navLinkText">ASSIGNED REFERRALS</span></Link>
    <Link className="navOne" to="/my-referrals"><Badge color="error" max={99} badgeContent={null}><FolderIcon
    fontSize="small" /></Badge> <span className="navLinkText">MY REFERRALS</span></Link>
    <Link className="navOne" to="/awaiting-pickup"><Badge color="error" max={99} badgeContent={numAwaitingPickup}><HailIcon
    fontSize="small" /></Badge> <span className="navLinkText">READY PACKAGES</span></Link>
    <Link className="navOne" to="/managereferrals"><Badge color="error" max={99} badgeContent={numUnassigned}><AllInboxIcon
    fontSize="small" /></Badge><span className="navLinkText">REFERRAL INBOX</span></Link>
    <Link className="navOne" to="/completed-referrals"><Badge color="error" max={99} badgeContent={null}><FactCheckIcon
    fontSize="small" /></Badge> <span className="navLinkText">FULFILLED REFERRALS</span></Link>
    {/* <Link className="navOne" to="/reports"><PrintIcon
    fontSize="small" /> <span className="navLinkText"> PRINT REPORTS</span></Link> */}
    </>);
  }

  return (
      <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        
      {(() => {
   if(!authState.status){
    return <>
      
</>;
 } if (referralStart) {
   <Switch>
     <Route path="/submit-referral" exact component={NewReferral} />
   </Switch>
 }  else {
   return <><AppBar className={classes.appbar} position="fixed"
   >
       <Toolbar className={classes.toolbar}>

       {(() => {
  if(!open){
   return <IconButton
   size="large"
   edge="start"
   color="inherit"
   aria-label="open menu"
   onClick={handleDrawerOpen}
  //  edge="start"
 >
   <MenuIcon />
 </IconButton>;
} else {
  return <IconButton
  size="large"
  edge="start"
  color="inherit"
  aria-label="open menu"
  onClick={handleDrawerClose}
  // edge="start"
>
  <MenuIcon />
</IconButton>;
} 
})()}

         <Typography
           variant="h6"
           noWrap
           component="div"
           sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
         >
           <div className="logo">DASHBOARD</div>
         </Typography>

         {(() => {
  if(role === "Admin"){
   return <Link to="/admin">
   <IconButton >
     <AdminPanelSettingsIcon />
   </IconButton>
   </Link>;
} 
})()}
         
         <IconButton aria-label="logout" onClick={logout}>
       <ExitToAppIcon />
     </IconButton>
       </Toolbar>
       
     </AppBar>
     <div className={classes.infoBar}>
       <Typography
       fontWeight={600}
       fontSize={12}
        >
          ANNOUNCEMENTS: 
        </Typography><Typography 
        fontSize={12} sx={{paddingLeft:1}}
        > {(() => {
          if(role === "Referrer"){
           return <>{referrerAnnouncement}</>;
        } else {
           return <>{volunteerAnnouncement}</>;
        }
        })()}
        </Typography>
         </div>
     
     



         <Drawer variant="permanent" open={open}>
       
         
       {(() => {
  if(!open){
   return <DrawerHeaderIn><table className="drawerHeaderIn">
     <tbody>
   <tr>
   <td><Link  to="/accountmanage" style={{ textDecoration: 'none', color: '#eb6d4a'}}>
      <SettingsIcon 
      fontSize="large" sx={{padding: 2.1}}/></Link></td>
   </tr>
   </tbody>
 </table>
 
         </DrawerHeaderIn>;
} else {
  return <DrawerHeader><table className="drawerHeaderOut">
    <tbody>
  <tr>
    <td className="volunteerBox" colSpan={3}>
    
      <Typography
           fontSize="large"
           fontWeight={800}
         >
           {fname} {lname}
         </Typography>
         <Typography
         fontSize="small"
         fontWeight={300}
         >
           {role}
         </Typography></td>
        
         <td><div className="drawerHeaderProfile"><Link  to="/accountmanage" style={{ textDecoration: 'none', color: 'grey'}}>
      <SettingsIcon
      sx={{marginTop: 3.5}} 
      fontSize="large"/></Link></div></td>
  </tr>
  </tbody></table>
        </DrawerHeader>;
} 
})()}

       <Divider />
       {(() => {
  if(!open){
   return <>{linkViews}</>;
} else {
  return <>{linkViewsOpen}</>;
} 
})()}
       {/* <List>
           <ListItem>
           {!authState.status && (
               <>
                 <Link to="/login"> Login</Link>
                 <Link to="/registration"> Registration</Link>
               </>
             )}
           </ListItem>
       </List> */}
     </Drawer></>;
 } 
})()}

      <Box className={classes.pageContent} component="main" sx={{p: 10 }}>



          <Switch>
            <Route exact path="/" component={Login}>
              <Redirect to ="/login" />
            </Route>
            <Route path="/" exact component={Home} />
            <Route path="/home" exact component={Home} />
            <Route path="/admin" exact component={Admin} />
            <Route path="/accountmanage" exact component={AccountManage} />
            <Route path="/registration" exact component={Registration} />
            <Route path="/login" exact component={Login} />
            <Route path="/updateInfo" exact component={updateInfo} />
            <Route path="/referral-agreement" exact component={BeginReferral} />
            <Route path="/submit-referral" exact component={NewReferral} />
            <Route path="/managereferrals" exact component={ManageReferrals} />
            <Route path="/my-referrals" exact component={MyReferrals} />
            <Route path="/awaiting-pickup" exact component={PickupQueue} />
            {/* <Route path="/reports" exact component={Reports} /> */}
            <Route path="/completed-referrals" exact component={Archive} />
            <Route path="/assigned-referrals" exact component={AssignedReferrals} />
            <Route path="/referral-details/:id" exact component={ReferralDetails} />
            <Route path="/my-referral-details/:id" exact component={ViewReferralDetails} />
          </Switch>


          </Box>



        </Router>
      </AuthContext.Provider>
  );
}

export default App;
