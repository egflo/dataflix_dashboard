import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {useGetSales} from "/src/service/service";
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
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import {DashboardLayout} from "../dashboard-layout";
import { SeverityPill } from '../severity-pill';

export const OrderListResults = ({...rest }) => {
  const [selectedOrderIds, setSelectedOrderIds] = useState([]);
  const { data, error } = useGetSales( rest.path + "?limit=" + rest.limit + "&page=" + rest.page);

  if (error) return(
      <>
          <h1>Something went wrong</h1>
      </>
  );

  if (!data) return(
      <>
          <h1>Loading...</h1>
      </>
  );

  const {content, size, empty, totalPages, totalElements, last} = data;
  const orders = content;

  const handleSelectAll = (event) => {
    let newSelectedOrderIds;

    if (event.target.checked) {
      newSelectedCustomerIds = orders.map((order) => order.id);
    } else {
      newSelectedOrderIds = [];
    }

    selectedOrderIds(newSelectedOrderIds);
  };

  function formatAddress(order) {
     const shipping = order.shipping;
    return `${shipping.city}, ${shipping.state}, ${shipping.postcode}`;
  }

  function formatDate(order) {
    const moment = require('moment'); // require
    const d = new Date(order.saleDate);
    return moment(d).format('YYYY-MM-DD');
  }

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedOrderIds.indexOf(id);
    let newSelectedOrderIds = [];

    if (selectedIndex === -1) {
      newSelectedOrderIds = newSelectedOrderIds.concat(selectedOrderIds, id);
    } else if (selectedIndex === 0) {
      newSelectedOrderIds = newSelectedOrderIds.concat(selectedOrderIds.slice(1));
    } else if (selectedIndex === newSelectedOrderIds.length - 1) {
      newSelectedOrderIds = newSelectedOrderIds.concat(selectedOrderIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedOrderIds = newSelectedOrderIds.concat(
        selectedOrderIds.slice(0, selectedIndex),
        selectedOrderIds.slice(selectedIndex + 1)
      );
    }

    selectedOrderIds(newSelectedOrderIds);
  };

  const handleLimitChange = (event) => {
    rest.setlimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    rest.setpage(newPage);
  };

  function formatCurrency(amount) {
    return amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
  }

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedOrderIds.length === orders.length}
                    color="primary"
                    indeterminate={
                      selectedOrderIds.length > 0
                      && selectedOrderIds.length < orders.length
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
                  Total
                </TableCell>
                <TableCell>
                  Shipping
                </TableCell>
                <TableCell>
                  Order date
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  hover
                  key={order.id}
                  selected={selectedOrderIds.indexOf(order.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedOrderIds.indexOf(order.id) !== -1}
                      onChange={(event) => handleSelectOne(event, order.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                      FLX{order.id}
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
                        {getInitials(order.shipping.firstName + ' ' + order.shipping.lastName)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {order.shipping.firstName + ' ' + order.shipping.lastName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {formatCurrency(order.total)}
                  </TableCell>
                  <TableCell>
                    {formatAddress(order)}
                  </TableCell>
                  <TableCell>
                    {formatDate(order)}
                  </TableCell>
                  <TableCell>
                    <SeverityPill
                        color={(order.status === 'shipped' && 'success')
                            || (order.status === 'refunded' && 'error')
                            || 'warning'}
                    >
                      {order.status}
                    </SeverityPill>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={totalElements}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={rest.page}
        rowsPerPage={rest.limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};


