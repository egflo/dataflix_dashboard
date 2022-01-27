import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import {useGetUsers} from "../../service/service";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export function TotalCustomers({...props}) {
    const { data, error } = useGetUsers("metadata");

    if (!data || error) return(
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

    const {total, previous, change} = data;

    return (
      <Card {...props}>
        <CardContent>
          <Grid
            container
            spacing={3}
            sx={{ justifyContent: 'space-between' }}
          >
            <Grid item>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="overline"
              >
                TOTAL CUSTOMERS
              </Typography>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                {total}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: 'success.main',
                  height: 56,
                  width: 56
                }}
              >
                <PeopleIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              pt: 2
            }}
          >
          {change > 0 ? (
              <ArrowUpwardIcon
                  sx={{
                      color: 'success.main',
                      fontSize: 20
                  }}
              />
          ) : (
              <ArrowDownwardIcon
                  sx={{
                      color: 'error.main',
                      fontSize: 20
                  }}
              />
              )}
            <Typography
              variant="body2"
              sx={{
                mr: 1
              }}
            >
                {change}%
            </Typography>
            <Typography
              color="textSecondary"
              variant="caption"
            >
              Since last month
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
}

//export default TotalCustomers;
