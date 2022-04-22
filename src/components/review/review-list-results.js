import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {useGetReviews} from "/src/service/service";
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
import { SeverityPill } from '../severity-pill';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useRouter } from 'next/router'

export const ReviewListResults = (props) => {
  const router = useRouter();
  
  const {path, setpath, order, setorder, sort, setsort, page, setpage, limit, setlimit, ...rest} = props;

  const [selectedIds, setSelectedIds] = useState([]);
  const query = path + "?limit=" + limit + "&page=" + page + "&sortBy=" + sort + "&orderBy=" + order

  const { data, error } = useGetReviews(query);

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

  function formatAddress(order) {
     const shipping = order.shipping;
    return `${shipping.city}, ${shipping.state}, ${shipping.postcode}`;
  }

  function formatDate(review) {
    const moment = require('moment'); // require
    const d = new Date(review.created) ;
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

  function formatCurrency(amount) {
    return amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
  }

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
                  Customer
                </TableCell>
                <TableCell>
                  Product
                </TableCell>
                <TableCell>
                  Title
                </TableCell>
                <TableCell>
                  Content
                </TableCell>
                <TableCell>
                  Rating
                </TableCell>
                <TableCell>
                  Created
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {content.map((review) => (
                <TableRow
                  hover
                  key={review.id}
                  selected={selectedIds.indexOf(review.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedIds.indexOf(review.id) !== -1}
                      onChange={(event) => handleSelectOne(event, review.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                      {review.id}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {review.customerId}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                    >
                      <Typography
                          color="textPrimary"
                          variant="body1"
                      >
                        {review.movieId}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {review.title}
                  </TableCell>
                  <TableCell
                      style={{
                        whiteSpace: "",
                        textOverflow: "ellipsis",
                        height: "80px",
                        display: "block",
                        overflow: "hidden"
                      }}
                      className="overflow-test"
                      component="th"
                      scope="row"
                  >
                    {review.text}
                  </TableCell>
                  <TableCell>
                    {review.rating}
                  </TableCell>
                  <TableCell>
                    {formatDate(review)}
                  </TableCell>

                  <TableCell>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => router.push(`/customer/review/${review.id}`)}
                    >
                      Details
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


