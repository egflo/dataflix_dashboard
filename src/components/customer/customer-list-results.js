import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {useGetUsers} from "/src/service/service";
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
    Button,
    Grid,
    Divider,
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import {DashboardLayout} from "../dashboard-layout";
import CircularProgress from '@mui/material/CircularProgress';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useRouter } from 'next/router'


export const CustomerListResults = (props) => {
  const {path, setpath, order, setorder, sort, setsort, page, setpage, limit, setlimit, ...rest} = props;

  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState([]);
  const { data, error } = useGetUsers(path + "?limit=" + limit + "&page=" + page + "&sortBy=" + sort + "&orderBy=" + order);

  if (!data || error) return(
      <Card sx={{ height:'100%'}}{...rest}>
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100%"
            height="400px"
        >
          {!data ? <CircularProgress /> : <ErrorOutlineIcon style={{color:'gray', fontSize:'50px'}}/>}
        </Box>
      </Card>
  );

  const {content, size, empty, totalPages, totalElements, last} = data;

  const handleSelectAll = (event) => {
    let newSelectedIds;

    if (event.target.checked) {
      newSelectedIds = content.map((content) => content.id);
    } else {
      newSelectedIds = [];
    }
    setSelectedIds(newSelectedIds);
  };

  function formatAddress(customer) {
    if(customer.addresses.length > 0) {
      const address = customer.addresses.find(address => address.id === customer.primaryAddressId);
      if(address === undefined) {
        address = customer.addresses[0];
        return `${address.city}, ${address.state}, ${address.postcode}`;
      }

      return `${address.city}, ${address.state}, ${address.postcode}`;
    }
    else {
      return 'No Address Available';
    }
  }
  function formatDate(customer) {
    const moment = require('moment'); // require
    const d = new Date(customer.created);
    return moment(d).format('YYYY-MM-DD');
  }

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedIds.indexOf(id);
    let newSelectedIds = [];

    if (selectedIndex === -1) {
      newSelectedIds = newSelectedIds.concat(selectedIds, id);
    } else if (selectedIndex === 0) {
      newSelectedIds = newSelectedIds.concat(selectedIds.slice(1));
    } else if (selectedIndex === selectedIds.length - 1) {
      newSelectedIds = newSelectedIds.concat(selectedIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedIds = newSelectedIds.concat(
        selectedIds.slice(0, selectedIndex),
          selectedIds.slice(selectedIndex + 1)
      );
    }

    setSelectedIds(newSelectedIds);
  };

  const handleLimitChange = (event) => {
    setlimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setpage(newPage);
  };

  const handleDelete = () => {
    console.log(selectedIds);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedIds.length === content.length}
                    color="primary"
                    indeterminate={
                        selectedIds.length > 0
                      && selectedIds.length < content.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Ref
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Registration date
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {content.map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedIds.indexOf(customer.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {customer.id}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={'/static/images/avatars/no_avatar.svg'}
                        sx={{ mr: 2 , border: '1px solid black' }}
                      >
                        {getInitials(customer.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.firstname + ' ' + customer.lastname}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.email}
                  </TableCell>
                  <TableCell>
                    {formatAddress(customer)}
                  </TableCell>
                  <TableCell>
                    {formatDate(customer)}
                  </TableCell>
                  <TableCell>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => router.push(`/customer/${customer.id}`)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Divider />
      <Grid
        container
        spacing={0}
        sx={{
          justifyContent: 'flex-end',
          mt: 0
        }}

      >
        <Grid
            item
            md={3}
            xs={3}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              padding: '5px',
            }}
        >
            <Button
                color="secondary"
                variant="contained"
                onClick={handleDelete}
            >
              Delete Selected
            </Button>
        </Grid>

        <Grid
            item
            md={9}
            xs={6}
            >

          <TablePagination
              component="div"
              count={totalElements}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

//CustomerListResults.propTypes = {
//  customers: PropTypes.array.isRequired
//};
