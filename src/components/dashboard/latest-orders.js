import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../severity-pill';
import {useGetSales, useGetUsers} from "/src/service/service";
import CircularProgress from '@mui/material/CircularProgress';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export function LatestOrders({...props}) {
  const { data, error } = useGetSales( "all?limit=9");

  if (!data || error)
      return(
        <Card sx={{ height:'100%'}} {...props}>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100%"
            >
                {!data ? <CircularProgress /> : <ErrorOutlineIcon style={{color:'gray', fontSize:'50px'}}/>}
            </Box>
        </Card>
    );

  return (
      <Card {...props}>
        <CardHeader title="Latest Orders" />
        <PerfectScrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Order Ref
                  </TableCell>
                  <TableCell>
                    Customer
                  </TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip
                        enterDelay={300}
                        title="Sort"
                    >
                      <TableSortLabel
                          active
                          direction="desc"
                      >
                        Date
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.content.map((order) => (
                    <TableRow
                        hover
                        key={order.id}
                    >
                      <TableCell>
                        {`FLX${order.id}`}
                      </TableCell>
                      <TableCell>
                        {`${order.shipping.lastName}, ${order.shipping.firstName}`}
                      </TableCell>
                      <TableCell>
                        {format(order.saleDate, 'dd/MM/yyyy')}
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
        <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2
            }}
        >
          <Button
              color="primary"
              endIcon={<ArrowRightIcon fontSize="small" />}
              size="small"
              variant="text"
              href="/orders"
          >
            View all
          </Button>
        </Box>
      </Card>
  );
}
