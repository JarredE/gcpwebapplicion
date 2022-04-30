import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import axios from "axios";
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Controls from '../components/controls/Controls';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import ErrorIcon from '@mui/icons-material/Error';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import SearchIcon from '@mui/icons-material/Search';
import { styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import AssignedTableHeader from '../components/AssignedTableHeader';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import { useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
 
// CSS for Paper component
const useStyles = makeStyles(theme => ({
    tableContent: {
        margin: theme.spacing(8)
    },
    searchInput: {
        width: '100%',
        margin: '30px',
        float: 'right'
    }
}))

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    paddingTop: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
const Item1 = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
const Item2 = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(5),
    textAlign: 'center',
    color: "#c96567",
  }));
const Item3 = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(5),
    textAlign: 'center',
    color: "#5da2d5",
  }));
const Item4 = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(5),
    textAlign: 'center',
    color: "#57ba98",
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

//Main component function
export default function AssignedReferrals(){  
    let history = useHistory();
    const [orderDirection, setOrderDirection] = React.useState('asc');
    const [valueToOrderBy, setValueToOrderBy] = React.useState('referralID');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const classes = useStyles();

    const referralredirect = localStorage.getItem("referralStart");

    if(referralredirect === "true"){
        window.location.replace("/submit-referral");
    }
  

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

//Query referrals from database, break data into individual arrays, declare index variables    
    const [referralData, setReferralData,] = useState("");
    const volunteer_user = localStorage.getItem("username"); 
    const [numOnHold, setNumOnHold,] = useState("");
    const [numInProgress, setNumInProgress,] = useState("");
    const [numAwaitingPickup, setNumAwaitingPickup,] = useState("");

    //get count of on hold
      useEffect(() => {
        countAllOnHold();
        }, []);

    const countAllOnHold = () => {
      axios.get(`http://localhost:3001/referrals/assignedOnHoldCount/?volunteer_user=${volunteer_user}`, {
        params: {
          username: volunteer_user
        }

      }).then((response) => {  
        setNumOnHold(response.data);
        })
        .catch(error => console.error('Error:' + error));
        };

    //get count of in progress
        useEffect(() => {
          countAllInProgress();
          }, []);
  
      const countAllInProgress = () => {
        axios.get(`http://localhost:3001/referrals/assignedInProgressCount/?volunteer_user=${volunteer_user}`, {
          params: {
            username: volunteer_user
          }
  
        }).then((response) => {  
          setNumInProgress(response.data);
          })
          .catch(error => console.error('Error:' + error));
          };

      //get count of awaiting pickup
          useEffect(() => {
            countAllAwaitingPickup();
            }, []);
    
        const countAllAwaitingPickup = () => {
          axios.get(`http://localhost:3001/referrals/assignedAwaitingPickupCount/?volunteer_user=${volunteer_user}`, {
            params: {
              username: volunteer_user
            }
    
          }).then((response) => {  
            setNumAwaitingPickup(response.data);
            })
            .catch(error => console.error('Error:' + error));
            };

      //get all assigned referrals
      useEffect(() => {
        getAllReferrals();
        }, []);

    const getAllReferrals = () => {
      axios.get(`http://localhost:3001/referrals/assigned/?volunteer_user=${volunteer_user}`, {
        params: {
          username: volunteer_user
        }

      } ).then((response) => {  
          setReferralData(response.data);
        })
        .catch(error => console.error('Error:' + error));
        };
        
    var referrallist = [];

    function setGlobal(){
        if (referralData.length > 0) {
            return (
                referralData.map((referral, index) => { 
                  const referralObj = {"referralID": referral.id, "referrerUser": referral.referrer, "status": referral.status, "statusNote": referral.status_note,
                         "volunteer": referral.volunteer, "Firstname": referral.referrer_fname, "Lastname": referral.referrer_lname, 
                         "Email": referral.referrer_email, "student": referral.student_initials};
                        referrallist.push(referralObj);
                    })
                )
            }
        };
            
        setGlobal();

    const rowData =  referrallist;


//Table searching 
const [search, setSearch] = React.useState('');
   
  const handleSearch = (event) => {
    const {value,target}=event.target;

    
    let url=""
    if(value){
      url=`http://localhost:3001/referrals/assigned/search/${volunteer_user}/${value}`
    }
    else{
      url=`http://localhost:3001/referrals/assigned/?volunteer_user=${volunteer_user}`
    }
    console.log(url);
    axios.get(url).then((response) => {  
      setReferralData(response.data);
      setSearch(event.target.value);
    })
    .catch(error => console.error('Error:' + error));
    };

    
            
    return(

      <Container className={classes.tableContent} maxWidth="xl">
        <>
        <Grid container spacing={2}>
        <Grid item xs={12} md={12}><Item elevation={0}>
      <Typography
           className="refNum"
           variant="h5"
           id="tableTitle"
           component="div"
           fontWeight={600}
           sx={{paddingBottom: 4}}
         >
           ASSIGNED REFERRALS
         </Typography>
         </Item>
         </Grid>
        <Grid item xs={12} md={4}>
          <Item2  elevation={0}><Typography
           className="countNum"
           sx={{ flex: '1 1 100%' }}
           variant="h2"
           id="tableTitle"
           component="div"
           fontWeight={600}
         >
           {numOnHold}
         </Typography><br></br>
         <Typography
           sx={{ flex: '1 1 100%' }}
           variant="h6"
           id="tableTitle"
           component="div"
           fontWeight={600}
         >
           ON HOLD
         </Typography></Item2>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item3 elevation={0}><Typography
           className="countNum"
           sx={{ flex: '1 1 100%' }}
           variant="h2"
           id="tableTitle"
           component="div"
           fontWeight={600}
         >
           {numInProgress}
         </Typography><br></br>
         <Typography
           sx={{ flex: '1 1 100%' }}
           variant="h6"
           id="tableTitle"
           component="div"
           fontWeight={600}
         >
           IN PROGRESS
         </Typography></Item3>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item4 elevation={0}><Typography
           className="countNum"
           sx={{ flex: '1 1 100%' }}
           variant="h2"
           id="tableTitle"
           component="div"
           fontWeight={600}
         >
           {numAwaitingPickup}
         </Typography><br></br>
         <Typography
           sx={{ flex: '1 1 100%' }}
           variant="h6"
           id="tableTitle"
           component="div"
           fontWeight={600}
         >
           READY FOR PICKUP
         </Typography></Item4>
        </Grid>
        <Grid item xs={12} md={12}>
          <Item elevation={0}>
        <Toolbar>
        
                    <Controls.Input
                        label="Search Referrals"
                        className={classes.searchInput}
                        placeholder="Search using REF#, email, or status"
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                </Toolbar>

        <TableContainer>
            <Table
                title="Referrals in Queue"
                options={{
                    search:true
                }}
            >
                
                <AssignedTableHeader
                    valueToOrderBy={valueToOrderBy}
                    orderDirection={orderDirection}
                    handleRequestSort={handleRequestSort}

                /><TableBody>
                {
                    sortedRowData(rowData, getComparator(orderDirection, valueToOrderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                   .map((referral, index) => (
                    <TableRow key={index}>
                        <TableCell style={{width: 100}} align='center'>
                            {referral.referralID}

                        </TableCell>
                        <TableCell align="center">
                            {referral.Firstname} &nbsp;
                            {referral.Lastname}
                        </TableCell>
                        <TableCell align="center">
                            {referral.student}

                        </TableCell>
                        <TableCell align="center">
                            {referral.Email}

                        </TableCell>
                        <TableCell align="center">
                        {(() => {
   if(referral.status === 'UNASSIGNED'){
    return <Chip 
       icon={<PersonOffIcon />} 
       size="medium" 
       label="UNASSIGNED" 
        variant="outlined" />;
 } else if(referral.status === 'IN PROGRESS'){
   return <Chip 
      icon={<AccessTimeIcon />} 
      color="info" 
      size="medium" 
      label="IN PROGRESS" 
       variant="outlined" />;
 } else if(referral.status === 'AWAITING PICKUP'){
  return <Chip 
     icon={<AccessTimeIcon />} 
     color="success" 
     size="medium" 
     label="AWAITING PICKUP" 
      variant="outlined" />;
} else if(referral.status === 'ON HOLD'){
   return <Chip 
      icon={<ErrorIcon />} 
      color="error" 
      size="medium" 
      label="ON HOLD" 
       variant="outlined" />;
 } else if(referral.status === 'FULFILLED'){
   return <Chip 
      icon={<DoneAllOutlinedIcon />} 
      color="success"
      size="medium" 
      label="FULFILLED" />;
 } 
})()}


                        </TableCell>
                        <TableCell>
                        
                        <IconButton aria-label="View Referral"
                      onClick={() => {
              history.push(`/referral-details/${referral.referralID}`);
            }}
          >
            {" "}
            <VisibilityIcon/>
          </IconButton>
         
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
                /></Item></Grid>
        </Grid>
        </>
        </Container>
    )
};