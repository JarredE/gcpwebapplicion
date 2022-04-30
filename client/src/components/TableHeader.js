import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

export default function TableHeader(props) {

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
                    REF #
                  </TableSortLabel>
              </TableCell>

              <TableCell
                  key="referrer"
                  align="center"
                  padding="normal"
                  sortDirection="asc"
                  style={{borderRight:'1px solid rgba(224, 224, 224, 1)'}}
                >
                  <TableSortLabel
                    active={valueToOrderby === "referrer"}
                    direction={valueToOrderby === "referrer" ? orderDirection : 'asc'}
                    onClick={createSortHandler("referrer")}
                  >
                    REFERRER
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
                  key="email"
                  align="center"
                  padding="normal"
                  sortDirection="asc"
                  style={{borderRight:'1px solid rgba(224, 224, 224, 1)'}}
                >
                    EMAIL
              </TableCell>

              <TableCell
                  key="status"
                  align="center"
                  padding="normal"
                  sortDirection="asc"
                  style={{borderRight:'1px solid rgba(224, 224, 224, 1)'}}
                >
                  <TableSortLabel
                    active={valueToOrderby === "status"}
                    direction={valueToOrderby === "status" ? orderDirection : 'asc'}
                    onClick={createSortHandler("status")}
                  >
                    STATUS
                  </TableSortLabel>
              </TableCell>

              <TableCell
                  key="volunteer"
                  align="center"
                  padding="normal"
                  sortDirection="asc"
                  style={{borderRight:'1px solid rgba(224, 224, 224, 1)'}}
                >
                  <TableSortLabel
                    active={valueToOrderby === "volunteer"}
                    direction={valueToOrderby === "volunteer" ? orderDirection : 'asc'}
                    onClick={createSortHandler("volunteer")}
                  >
                    VOLUNTEER
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