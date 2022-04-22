import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {useGetInventory} from "/src/service/service";
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
    Divider
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import {DashboardLayout} from "../dashboard-layout";
import { SeverityPill } from '../severity-pill';
import Image from 'next/image'
import {NoImage} from "/public/static/images/products/no_image.jpg";
import { formatDistanceToNow, subHours } from 'date-fns';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useRouter } from 'next/router'


export const ProductListResults = (props) => {
  const {path, setpath, order, setorder, sort, setsort, page, setpage, limit, setlimit, status, setstatus, ...rest} = props;

  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState([]);

  const query = path + "?limit=" + limit + "&page=" + page + "&sortBy=" + sort + "&orderBy=" + order
  if(status !== 'all'){
    query += "&status=" + status
  }

  const { data, error } = useGetInventory( query);
  
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
      newSelectedIds = content.map((item) => item.productId);
    } else {
      newSelectedIds = [];
    }

    selectedIds(newSelectedIds);
  };

  function formatDate(order) {
    const moment = require('moment'); // require
    const d = new Date(order.saleDate);
    return moment(d).format('YYYY-MM-DD');
  }

  function formatRating(item) {
    const rating = item.rated;
    if(rating == null || rating.length === 0) {
      return 'N/A';
    }
    else {
      return rating;
    }
  }

  function formatRuntime(item) {
    const runtime = item.runtime;
    if(runtime == null || runtime == "N/A")
    {
      return "Runtime Unavailable";
    }

    const num = n.split(" ")[0]
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return hours + "h " + minutes + " min";
  }

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedIds.indexOf(id);
    let newSelectedIds = [];

    if (selectedIndex === -1) {
      newSelectedIds = newSelectedIds.concat(selectedIds, id);
    } else if (selectedIndex === 0) {
      newSelectedIds = newSelectedIds.concat(selectedIds.slice(1));
    } else if (selectedIndex === newSelectedIds.length - 1) {
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
                  Title
                </TableCell>
                <TableCell>
                  Year
                </TableCell>
                <TableCell>
                  Inventory
                </TableCell>
                <TableCell>
                  Details
                </TableCell>
                <TableCell>
                  Price
                </TableCell>
                <TableCell>
                  Updated
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {content.map((item) => (
                <TableRow
                  hover
                  key={item.productId}
                  selected={selectedIds.indexOf(item.productId) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedIds.indexOf(item.productId) !== -1}
                      onChange={(event) => handleSelectOne(event, item.productId)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                      {item.productId}
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
                            src={item.movie.poster == null || item.movie.poster.length < 5 ? "/static/images/products/no_image.jpg": item.movie.poster}
                            alt={item.productId}
                            layout={'fill'}
                        >
                        </Image>
                      </div>

                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {item.movie.title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {item.movie.year}
                  </TableCell>
                  <TableCell>
                    <SeverityPill
                        color={(item.status === 'in stock' && 'success')
                            || (item.status === 'out of stock' && 'error')
                            || 'warning'}
                    >
                      {item.status}
                    </SeverityPill>
                  </TableCell>
                  <TableCell>
                    {item.quantity} in stock
                  </TableCell>
                  <TableCell>
                    {formatCurrency(item.movie.price)}
                  </TableCell>
                  <TableCell>
                    {formatDistanceToNow(item.movie.updated)} ago
                  </TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => router.push(`/product/${item.productId}`)}
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


