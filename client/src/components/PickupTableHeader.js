import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

export default function LocationsTableHeader(props) {

    const {valueToOrderby, orderDirection, handleRequestSort} = props

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);

    }

    return (
        <TableHead>
            <TableRow style={{maxHeight:'10px'}}>

            <TableCell
                  key="referralID"
                  align="center"
                  padding="normal"
                  sortDirection="asc"
                  style={{borderRight:'1px solid rgba(224, 224, 224, 1)'}}
                >
                  <TableSortLabel
                    active={valueToOrderby === "referralID"}
                    direction={valueToOrderby === "referralID" ? orderDirection : 'asc'}
                    onClick={createSortHandler("referralID")}
                  >
                    #
                  </TableSortLabel>
              </TableCell>

              <TableCell
                  key="student"
                  align="center"
                  padding="normal"
                  sortDirection="asc"
                  style={{borderRight:'1px solid rgba(224, 224, 224, 1)'}}
                >
                  <TableSortLabel
                    active={valueToOrderby === "student"}
                    direction={valueToOrderby === "student" ? orderDirection : 'asc'}
                    onClick={createSortHandler("student")}
                  >
                    STUDENT
                  </TableSortLabel>
              </TableCell>
              <TableCell
                  align="center"
                  padding="normal"
                >
                  CONFIRM PICKUP
              </TableCell>

            </TableRow>
          </TableHead>
    );
}