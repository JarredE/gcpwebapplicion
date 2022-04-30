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
                  key="County"
                  align="center"
                  padding="normal"
                  sortDirection="asc"
                  style={{borderRight:'1px solid rgba(224, 224, 224, 1)'}}
                >
                  <TableSortLabel
                    active={valueToOrderby === "County"}
                    direction={valueToOrderby === "County" ? orderDirection : 'asc'}
                    onClick={createSortHandler("County")}
                  >
                    COUNTY
                  </TableSortLabel>
              </TableCell>

              <TableCell
                  key="Name"
                  align="center"
                  padding="normal"
                  sortDirection="asc"
                  style={{borderRight:'1px solid rgba(224, 224, 224, 1)'}}
                >
                  <TableSortLabel
                    active={valueToOrderby === "Name"}
                    direction={valueToOrderby === "Name" ? orderDirection : 'asc'}
                    onClick={createSortHandler("Name")}
                  >
                    NAME
                  </TableSortLabel>
              </TableCell>
              <TableCell
                  key="Address"
                  align="center"
                  padding="normal"
                  sortDirection="asc"
                  style={{borderRight:'1px solid rgba(224, 224, 224, 1)'}}
                >
                  <TableSortLabel
                    active={valueToOrderby === "Address"}
                    direction={valueToOrderby === "Address" ? orderDirection : 'asc'}
                    onClick={createSortHandler("Address")}
                  >
                    ADDRESS
                  </TableSortLabel>
              </TableCell>
              <TableCell
                  align="center"
                  padding="normal"
                >
                  
              </TableCell>

            </TableRow>
          </TableHead>
    );
}