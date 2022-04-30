import React from "react";
import AddLocation from '../components/AddLocation';
import AddVolunteer from "../components/AddVolunteer";
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Controls from '../components/controls/Controls';
import Divider from '@mui/material/Divider';
import EditLocation from '../components/EditLocation';
import FormControl from '@mui/material/FormControl';
import FullReportGen from '../components/FullReportGen';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import ReferrerReportGen from "../components/ReferrerReportGen";
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import StudentReportGen from "../components/StudentReportGen";
import {makeStyles, styled} from '@material-ui/core/styles';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import LocationsTableHeader from '../components/LocationsTableHeader';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import { VictoryBar, VictoryChart } from "victory";
import { VictoryAxis } from "victory";
import { VictoryHistogram } from "victory";
import {VictoryLabel} from 'victory';
import {VictoryLegend} from 'victory';
import { VictoryPie } from 'victory';
import VolunteerReportGen from "../components/VolunteerReportGen";


const useStyles = makeStyles(theme => ({
  adminContent: {
      margin: theme.spacing(8),
      //display: "block"
  },
  searchInput: {
    width: '90%',
    margin: '30px',
    float: 'right'
}
}))

const sharedAxisStyles = {
  tickLabels: {
    fontSize: 10,
    angle: 45
  }
};




const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  paddingTop: theme.spacing(5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Item2 = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  paddingTop: theme.spacing(5),
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),
  color: theme.palette.text.secondary,
}));

//Table sorting
function descendingComparator(a, b, orderBy) {
  if(b[orderBy] < a[orderBy]){
      return -1;
  }
  if(b[orderBy] > a[orderBy]){
      return 1;
  }
  return 0;
};

//Table sorting
function getComparator(order, orderBy) {
  return order === "desc"
  ? (a,b) => descendingComparator(a,b, orderBy)
  : (a,b) => -descendingComparator(a,b, orderBy);
};

//Table sorting
const sortedRowData = (rowArray, comparator) => {
  const stabiliziedRowArray = rowArray.map((el, index) => [el, index]);
  stabiliziedRowArray.sort((a,b) => {
      const order = comparator(a[0], b[0]);
      if(order !==0) 
      return order
      return a[1] - b[1]
  })
  return stabiliziedRowArray.map((el) => el[0])
};




function Admin() {
  const [orderDirection, setOrderDirection] = React.useState('asc');
  const [valueToOrderBy, setValueToOrderBy] = React.useState('referralID');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [janReferrals, setJanReferrals] = useState("");
  const [febReferrals, setFebReferrals] = useState("");
  const [marReferrals, setMarReferrals] = useState("");
  const [aprReferrals, setAprReferrals] = useState("");
  const [mayReferrals, setMayReferrals] = useState("");
  const [junReferrals, setJunReferrals] = useState("");
  const [julReferrals, setJulReferrals] = useState("");
  const [augReferrals, setAugReferrals] = useState("");
  const [sepReferrals, setSepReferrals] = useState("");
  const [octReferrals, setOctReferrals] = useState("");
  const [novReferrals, setNovReferrals] = useState("");
  const [decReferrals, setDecReferrals] = useState("");

  const [numUnassigned, setNumUnassigned,] = useState("");
  const [numOnHold, setNumOnHold] = useState("");
  const [numInProgress, setNumInProgress] = useState("");
  const [numAwaitingPickup, setNumAwaitingPickup] = useState("");
  const [reportType, setReportType] = React.useState('');

  const referralredirect = localStorage.getItem("referralStart");

  if(referralredirect === "true"){
      window.location.replace("/submit-referral");
  }



  const handleSetReport = (event) => {
    setReportType(event.target.value);
  };

    const countData = [
      {x: numUnassigned, y: numUnassigned},
      {x: numInProgress, y: numInProgress},
      {x: numOnHold, y: numOnHold},
      {x: numAwaitingPickup, y: numAwaitingPickup}

    ]

  //get count of january referrals this year
  useEffect(() => {
    countAllJan();
    }, []);

const countAllJan = () => {
  axios.get(`http://localhost:3001/referrals/jan`).then((response) => {  
    setJanReferrals(response.data);
    })
    .catch(error => console.error('Error:' + error));
    };

     //get count of feb referrals this year
  useEffect(() => {
    countAllFeb();
    }, []);

const countAllFeb = () => {
  axios.get(`http://localhost:3001/referrals/feb`).then((response) => {  
    setFebReferrals(response.data);
    })
    .catch(error => console.error('Error:' + error));
    };

     //get count of mar referrals this year
  useEffect(() => {
    countAllMar();
    }, []);

const countAllMar = () => {
  axios.get(`http://localhost:3001/referrals/mar`).then((response) => {  
    setMarReferrals(response.data);
    })
    .catch(error => console.error('Error:' + error));
    };

     //get count of apr referrals this year
  useEffect(() => {
    countAllApr();
    }, []);

const countAllApr = () => {
  axios.get(`http://localhost:3001/referrals/apr`).then((response) => {  
    setAprReferrals(response.data);
    })
    .catch(error => console.error('Error:' + error));
    };

     //get count of may referrals this year
  useEffect(() => {
    countAllMay();
    }, []);

const countAllMay = () => {
  axios.get(`http://localhost:3001/referrals/may`).then((response) => {  
    setMayReferrals(response.data);
    })
    .catch(error => console.error('Error:' + error));
    };

     //get count of jun referrals this year
  useEffect(() => {
    countAllJun();
    }, []);

const countAllJun = () => {
  axios.get(`http://localhost:3001/referrals/jun`).then((response) => {  
    setJunReferrals(response.data);
    })
    .catch(error => console.error('Error:' + error));
    };

     //get count of jul referrals this year
  useEffect(() => {
    countAllJul();
    }, []);

const countAllJul = () => {
  axios.get(`http://localhost:3001/referrals/jul`).then((response) => {  
    setJulReferrals(response.data);
    })
    .catch(error => console.error('Error:' + error));
    };

     //get count of aug referrals this year
  useEffect(() => {
    countAllAug();
    }, []);

const countAllAug = () => {
  axios.get(`http://localhost:3001/referrals/aug`).then((response) => {  
    setAugReferrals(response.data);
    })
    .catch(error => console.error('Error:' + error));
    };

     //get count of sep referrals this year
  useEffect(() => {
    countAllSep();
    }, []);

const countAllSep = () => {
  axios.get(`http://localhost:3001/referrals/sep`).then((response) => {  
    setSepReferrals(response.data);
    })
    .catch(error => console.error('Error:' + error));
    };

     //get count of oct referrals this year
  useEffect(() => {
    countAllOct();
    }, []);

const countAllOct = () => {
  axios.get(`http://localhost:3001/referrals/oct`).then((response) => {  
    setOctReferrals(response.data);
    })
    .catch(error => console.error('Error:' + error));
    };

     //get count of nov referrals this year
  useEffect(() => {
    countAllNov();
    }, []);

const countAllNov = () => {
  axios.get(`http://localhost:3001/referrals/nov`).then((response) => {  
    setNovReferrals(response.data);
    })
    .catch(error => console.error('Error:' + error));
    };

     //get count of dec referrals this year
  useEffect(() => {
    countAllDec();
    }, []);

const countAllDec = () => {
  axios.get(`http://localhost:3001/referrals/dec`).then((response) => {  
    setDecReferrals(response.data);
    })
    .catch(error => console.error('Error:' + error));
    };

    const data = [
      {x: "Jan", y: janReferrals},
      {x: "Feb", y: febReferrals},
      {x: "Mar", y: marReferrals},
      {x: "Apr", y: aprReferrals},
      {x: "May", y: mayReferrals},
      {x: "Jun", y: junReferrals},
      {x: "Jul", y: julReferrals},
      {x: "Aug", y: augReferrals},
      {x: "Sep", y: sepReferrals},
      {x: "Oct", y: octReferrals},
      {x: "Nov", y: novReferrals},
      {x: "Dec", y: decReferrals}
    ]

    const totalThisYear = janReferrals + febReferrals + marReferrals + aprReferrals
    + mayReferrals + junReferrals + julReferrals + augReferrals + sepReferrals + octReferrals
    + novReferrals + decReferrals;
    const currentYear = new Date().getFullYear();
    const barChartTitle = "Fulfilled this year " + currentYear + ". (Total: " + totalThisYear +")";

  //get count of unassigned
  useEffect(() => {
    countAllUnassigned();
    }, []);

const countAllUnassigned = () => {
  axios.get(`http://localhost:3001/referrals/unassignedCount`).then((response) => {  
    setNumUnassigned(response.data);
    })
    .catch(error => console.error('Error:' + error));
    };
  
   


  //get count of on hold
    useEffect(() => {
      countAllOnHold();
      }, []);

  const countAllOnHold = () => {
    axios.get(`http://localhost:3001/referrals/onHoldCount`).then((response) => {  
      setNumOnHold(response.data);
      })
      .catch(error => console.error('Error:' + error));
      };

  

  //get count of in progress
      useEffect(() => {
        countAllInProgress();
        }, []);

    const countAllInProgress = () => {
      axios.get(`http://localhost:3001/referrals/inProgressCount`).then((response) => {  
        setNumInProgress(response.data);
        })
        .catch(error => console.error('Error:' + error));
        };

    //get count of awaiting pickup
        useEffect(() => {
          countAllAwaitingPickup();
          }, []);
  
      const countAllAwaitingPickup = () => {
        axios.get(`http://localhost:3001/referrals/awaitingPickupCount`).then((response) => {  
          setNumAwaitingPickup(response.data);
          })
          .catch(error => console.error('Error:' + error));
          };

  const [volunteerAnnouncement, setVolunteerAnnouncement] = React.useState("");
  

  const handleSetVolunteerAnnouncement = (event) => {
    setVolunteerAnnouncement(event.target.value);
  };

  const [referrerAnnouncement, setReferrerAnnouncement] = React.useState("");

  const handleSetReferrerAnnouncement = (event) => {
    setReferrerAnnouncement(event.target.value);
  };

  //Handle the sorting
  const handleRequestSort = (event, property) => {
    const isAscending = (valueToOrderBy === property && orderDirection === 'asc')
    setValueToOrderBy(property)
    setOrderDirection(isAscending ? 'desc' : 'asc')
};

//Handle the table page change
const handleChangePage = (event, newPage) => {
    setPage(newPage)
};

//Handle table row count change
const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
};

//handle volunteer announcement
const [volunteerAnnouncementDefault, setVolunteerAnnouncementDefault] = React.useState({});

const volunteerAnnID = 1;
useEffect(() => {
  const getVolunteerAnnouncement = () => {
    axios.get(`http://localhost:3001/announcements/announcementinfo/${volunteerAnnID}`).then((response) => {  

    if(response.data == null){
      setVolunteerAnnouncementDefault("No announcement just yet");
    } else {
      setVolunteerAnnouncementDefault(response.data);
    }

    }).catch(error => console.error('Error:' + error));
  };
  getVolunteerAnnouncement();
}, []);

function handleVolunteerUpdate() {
  const id = 1;
  const announcement = {announcement: volunteerAnnouncement}
   axios.put(`http://localhost:3001/announcements/updateAnnouncement/${id}`, announcement
   ).then(async (response) => {
     if(response.status = 200){
       window.location.replace("/admin");
     } else {
       alert(response.data.error);
     }
   });
 }

 //handle referrer announcement
const [referrerAnnouncementDefault, setReferrerAnnouncementDefault] = React.useState({});

const referrerAnnID = 2;
useEffect(() => {
  const getReferrerAnnouncement = () => {
    axios.get(`http://localhost:3001/announcements/announcementinfo/${referrerAnnID}`).then((response) => {  
      
      if(response.data == null){
      setReferrerAnnouncementDefault("No announcement just yet");
    } else {
      setReferrerAnnouncementDefault(response.data);
    }
    }).catch(error => console.error('Error:' + error));
  };
  getReferrerAnnouncement();
}, []);

function handleReferrerUpdate() {
  const id = 2;
  const announcement = {announcement: referrerAnnouncement}
   axios.put(`http://localhost:3001/announcements/updateAnnouncement/${id}`, announcement
   ).then(async (response) => {
     if(response.status = 200){
       window.location.replace("/admin");
     } else {
       alert(response.data.error);
     }
   });
 }

  //get all GCP locations

  const [locationData, setLocationData,] = useState("");

  useEffect(() => {
    getAllLocations();
    }, []);

const getAllLocations = () => {
  axios.get(`http://localhost:3001/locations/all-locations`).then((response) => {  
      setLocationData(response.data);
    })
    .catch(error => console.error('Error:' + error));
    };

var locationlist = [];

function setGlobal(){
    if (locationData.length > 0) {
        return (
            locationData.map((location, index) => { 
              const locationObj = {"LocationID": location.id, "County": location.county, "Name": location.name, "Address": location.address};
                    locationlist.push(locationObj);
                })
            )
        }
    };
        
    setGlobal();

const rowData =  locationlist;
  const classes = useStyles();

//Table searching 
const [search, setSearch] = React.useState('');
   
  const handleSearch = (event) => {
    const {value,target}=event.target;

    let url=""
    if(value){
      url=`http://localhost:3001/locations/search/${value}`
    }
    else{
      url=`http://localhost:3001/locations/all-locations`
    }
    console.log(url);
    axios.get(url).then((response) => {  
      setLocationData(response.data);
      setSearch(event.target.value);
    })
    .catch(error => console.error('Error:' + error));
    };
            


  return (
    <Container className={classes.adminContent} maxWidth="xl">
        <Grid container spacing={2}>
         <Grid item xs={12}  md={4}>
           <Item2 elevation={0} sx={{minHeight: "337px"}}>
         <Typography> 
              <Box style={{ paddingBottom: 5, fontWeight: "600"}}>
                  Quick Report
                  </Box>
                  <Box style={{paddingBottom: 30, fontWeight: "200"}}>
                    Download all items in the database for your selected report in plain text CSV format</Box>
              </Typography>
            <Stack direction='column' spacing={0} >
          <FormControl  sx={{ width: '100%' }}>
        <InputLabel id="report-type-label">Report Type</InputLabel>
        <Select
          labelId="report-type-label"
          id="report-type"
          value={reportType}
          label="Report Type"
          fullWidth
          onChange={handleSetReport}
          MenuProps={{ disableScrollLock: true }}
        >
          <MenuItem value='student'>Student Report</MenuItem>
          <MenuItem value='full'>Full Report</MenuItem>
        </Select>
      </FormControl>

      {(() => {
  if(reportType === "full"){
    return  <FullReportGen/>
} if(reportType === "student"){
  return  <StudentReportGen/>
} else {
   return <FullReportGen/>
 } 
})()}
      </Stack>
           </Item2></Grid>

         <Grid item xs={12}  md={4}><Item elevation={0} sx={{minHeight: "337px"}}>
           <Typography>Referrals by status</Typography>
         <Stack spacing={0} direction="column">

 <Grid item xs={12} md={12}>
           <VictoryPie
           width={700}
           //padding="none"
           padAngle={({ datum }) => datum.y}
            colorScale={["#CBDDF0", "#00AAE7", "#FF6D7B", "#3AD3AD" ]}
            data={countData}
            labelRadius={({ innerRadius }) => innerRadius + 5 }
            innerRadius={40}
           style={{ labels: { display: "none"} 
          }}
           />
           </Grid>
           <Grid item xs={12} md={12}>
           <Typography>
           <Stack direction='row'>
             <Stack direction='row' style={{border: "1px solid #eee",padding: 3}}>
             <Box sx={{color: "#B8C9DA", fontSize:"9pt", paddingLeft: 2}}>
               {numUnassigned}
             </Box>
             <Box sx={{ fontSize:"9pt", paddingLeft: 1, paddingRight: 2, }}>
               Unassigned
             </Box>
             <Box sx={{color: "#00AAE7", fontSize:"9pt"}}>
               {numInProgress}
             </Box>
             <Box sx={{ fontSize:"9pt", paddingLeft: 1, paddingRight: 2}}>
               Working
             </Box>
             <Box sx={{color: "#FF6D7B", fontSize:"9pt"}}>
               {numOnHold}
             </Box>
             <Box sx={{ fontSize:"9pt", paddingLeft: 1, paddingRight: 2}}>
               Held
             </Box>
             <Box sx={{color: "#3AD3AD", fontSize:"9pt"}}>
               {numAwaitingPickup}
             </Box>
             <Box sx={{ fontSize:"9pt", paddingLeft: 1, paddingRight: 2}}>
               Ready
             </Box>
             </Stack>
             </Stack>
           </Typography>
           </Grid>
         </Stack>
                </Item>
           </Grid>
           <Grid item xs={12}  md={4} ><Item elevation={0} sx={{minHeight: "337px"}}>

    <VictoryChart domainPadding={30} style={{ parent: { paddingLeft: 8, paddingBottom: 8 } }}>
      <VictoryLabel
        x={225}
        y={10}
        textAnchor="middle"
        text={barChartTitle}
      />

      <VictoryBar
        style={{
          data: {
            fill: "hsl(355, 88%, 67%)"
          }
        }}
        categories={{
          x: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        }}
        cornerRadius={5}
        data={data}
      />

      <VictoryAxis
        tickCount={12}
       // tickFormat={date => date.toLocaleString("default", { month: "short" })}
        style={sharedAxisStyles}
      />

      <VictoryAxis
        dependentAxis
        style={{ tickLabels: { fontSize: 10} 
          }}
      />
    </VictoryChart>

                </Item>
           </Grid>

           <Grid item xs={12} md={6}><Item elevation={0} sx={{minHeight: "225px"}}>
        <Typography
         sx={{paddingBottom: 3}}
           fontWeight={500}
         >
           VOLUNTEER ANNOUNCEMENT
         </Typography>
         <textarea
         className='refItemInputs2'
                label="Announcement"
                variant="outlined"
                rows={4}
                value={volunteerAnnouncement ? volunteerAnnouncement: volunteerAnnouncementDefault.announcement}
                onChange={handleSetVolunteerAnnouncement}
                style={{width: "90%", paddingBottom: "30px"}}
                maxLength="120"
                />
                <Button fullWidth color="info" variant="contained" onClick={handleVolunteerUpdate}>Post</Button>
                </Item>
           </Grid>
           <Grid item xs={12} md={6}><Item elevation={0} sx={{minHeight: "225px"}}>
        <Typography
         sx={{paddingBottom: 3}}
           fontWeight={500}
         >
           REFERRER ANNOUNCEMENT
         </Typography>

         {(() => {
   if(referrerAnnouncement === "No announcement just yet"){
    return <></>;
 } else {
   return <><textarea
   className='refItemInputs2'
          label="Announcement"
          variant="outlined"
          rows={4}
          value={referrerAnnouncement ? referrerAnnouncement: referrerAnnouncementDefault.announcement}
          onChange={handleSetReferrerAnnouncement}
          style={{width: "90%", paddingBottom: "30px"}}
          maxLength="120"
          />
          <Button fullWidth color="info" variant="contained" onClick={handleReferrerUpdate}>Post</Button></>;
 } 
})()}
                </Item>
           </Grid>

  
        <Grid item xs={12} md={12}>
          <Item elevation={0} sx={{padding: 4}}>
          <Typography
         sx={{color: "black"}}
           variant="h6"
           fontWeight={500}
         >
           ADD VOLUNTEER
         </Typography>
<AddVolunteer/>
          </Item>
         </Grid>

          <Grid item xs={12} md={8}>
        </Grid>

        <Grid item xs={12} md={12}>


          <Item elevation={0} sx={{padding: 4}}>

          <Stack
        direction={{ sm: 'column', md: 'row' }}
        spacing={0}
      >
          <Grid item xs={12} md={4}>
         <Typography
         sx={{color: "black"}}
           variant="h6"
           fontWeight={500}
         >
           LOCATIONS
         </Typography>
         <AddLocation />
         </Grid>

          <Grid item xs={12} md={8}>
        <Controls.Input
            label="Search Locations"
            className={classes.searchInput}
            InputProps={{
                startAdornment: (<InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>)
            }}
            onChange={handleSearch}
        />
        </Grid>
</Stack>

    <Divider />

         <TableContainer>
            <Table>
                
                <LocationsTableHeader 
                    valueToOrderBy={valueToOrderBy}
                    orderDirection={orderDirection}
                    handleRequestSort={handleRequestSort}

                /><TableBody >
                  
                {
                    sortedRowData(rowData, getComparator(orderDirection, valueToOrderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                   .map((location, index) => (
                    <TableRow key={index} >
                        {/* <TableCell style={{width: 100}} align='center'>
                            {location.locationID}

                        </TableCell> */}
                        <TableCell align="center">
                            {location.County}
                        </TableCell>
                        <TableCell align="center">
                            {location.Name}

                        </TableCell>
                        <TableCell align="center">
                            {location.Address}

                        </TableCell>
                        
                        <TableCell>
                        
                        <EditLocation 
                        locationID={location.LocationID}
                        prevCounty={location.County}
                        prevName={location.Name}
                        prevAddress={location.Address}
                          />
         
                        </TableCell>
                    </TableRow>
                   ))
                }
                </TableBody>

            </Table>
        </TableContainer>
        <TablePagination
                rowsPerPageOptions={[5,10,20,50,100]}
                component="div"
                count={rowData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
         </Item>
        </Grid>
    </Grid>
    </Container>
  );
}

export default Admin;
