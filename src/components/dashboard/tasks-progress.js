import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';
import {useGetSales, useGetUsers} from "/src/service/service";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export function TasksProgress({...props}) {
  const { data, error } = useGetSales( "metadata/");
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
  const {monthly_transactions, monthly_change} = data;

  return(
      <Card
          sx={{ height: '100%' }}
          {...props}
      >
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
                MONTHLY SALES
              </Typography>
              <Typography
                  color="textPrimary"
                  variant="h4"
              >
                {monthly_transactions}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                  sx={{
                    backgroundColor: 'warning.main',
                    height: 56,
                    width: 56
                  }}
              >
                <InsertChartIcon />
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
            {monthly_change > 0 ? (
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
              {monthly_change}%
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

