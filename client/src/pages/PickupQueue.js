import React from 'react';
import axios from "axios";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Paper, makeStyles, TableBody, TableRow, TableCell} from '@material-ui/core';
import { styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import PickupTableHeader from '../components/PickupTableHeader';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import ConfirmPickup from '../components/ConfirmPickup';
 
// CSS for Paper component
const useStyles = makeStyles(theme => ({
    tableContent: {
        margin: theme.spacing(8)
    }
}))

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    paddingTop: theme.spacing(5),
    textAlign: 'center',
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

//Main component function
export default function PickupQueue(){  
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
    const referrer = localStorage.getItem("username");  

    //get all referrals awaiting pickup for the logged in user
      useEffect(() => {
        getAllReferrals();
        }, []);

    const getAllReferrals = () => {
      axios.get(`http://localhost:3001/referrals/awaiting/?referrer=${referrer}`, {
        params: {
          username: referrer
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
                  const referralObj = {"referralID": referral.id,  "status": referral.status,  "student": referral.student_initials,}
                        referrallist.push(referralObj);
                    })
                )
            }
        };
            
        setGlobal();

    const rowData =  referrallist;

    
            
    return(

      <Container className={classes.tableContent} maxWidth="sm">
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
          HAVE YOU PICKED THESE UP?
         </Typography>
         </Item>
         </Grid>
        <Grid item xs={12} md={12}>
          <Item elevation={0}>
 <TableContainer>
<Table
    title="Referrals in Queue"
    options={{
        search:true
    }}
>
    
    <PickupTableHeader
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
                {referral.student}

            </TableCell>
            <TableCell>

            <ConfirmPickup refID={referral.referralID} />
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
       </Item></Grid>
        </Grid>
        </>
        </Container>
    )
};