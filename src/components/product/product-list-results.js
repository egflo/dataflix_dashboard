import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {useGetMovies} from "/src/service/service";
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
import Image from 'next/image'
import {NoImage} from "/public/static/images/products/no_image.jpg";
import { formatDistanceToNow, subHours } from 'date-fns';

export const ProductListResults = ({...rest }) => {
  const [selectedOrderIds, setSelectedOrderIds] = useState([]);
  const { data, error } = useGetMovies( rest.path + "?limit=" + rest.limit + "&page=" + rest.page);

  console.log(NoImage)
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

  function formatRating(rating) {

    if(rating == null || rating.length === 0) {
      return 'N/A';
    }
    else {
      return rating;
    }
  }

  function formatRuntime(n) {

    if(n == null || n == "N/A")
    {
      return "Runtime Unavailable";
    }

    const num = n.split(" ")[0]
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return hours + "h " + minutes + " min";
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
                  Title
                </TableCell>
                <TableCell>
                  Year
                </TableCell>
                <TableCell>
                  Rating
                </TableCell>
                <TableCell>
                  Runtime
                </TableCell>
                <TableCell>
                  Price
                </TableCell>
                <TableCell>
                  Updated
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
                      {order.id}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        gap: 2,
                      }}

                    >
                      <div style={
                        {position:'relative',width:'50px',height:'70px',overflow:'hidden', borderRadius:'5px'}
                      }>
                        <Image
                            src={order.poster == null || order.poster.length < 2 ? "/static/images/products/no_image.jpg": order.poster}
                            alt={order.id}
                            layout={'fill'}
                        >
                        </Image>
                      </div>

                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {order.title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {order.year}
                  </TableCell>
                  <TableCell>
                    {formatRating(order.rated)}
                  </TableCell>
                  <TableCell>
                    {formatRuntime(order.runtime)}
                  </TableCell>
                  <TableCell>
                    {formatCurrency(order.price)}
                  </TableCell>
                  <TableCell>
                    {formatDistanceToNow(order.updated)} ago
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


