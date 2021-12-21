import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import {useGetSales, useGetUsers} from "/src/service/service";

export function Budget({...props}) {
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

  const {total_sales,total_transactions} = data;

  return (
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
                TOTAL TRANSACTIONS
              </Typography>
              <Typography
                  color="textPrimary"
                  variant="h4"
              >
                {total_transactions}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                  sx={{
                    backgroundColor: 'error.main',
                    height: 56,
                    width: 56
                  }}
              >
                <MoneyIcon />
              </Avatar>
            </Grid>
          </Grid>

        </CardContent>
      </Card>

  );

}

