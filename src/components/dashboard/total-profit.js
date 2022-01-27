import { Avatar, Card, CardContent, Grid, Typography, Box } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {useGetSales, useGetUsers} from "/src/service/service";
import CircularProgress from '@mui/material/CircularProgress';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export function TotalProfit({...props}) {
    const { data, error } = useGetSales( "metadata/");

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

    function formatMoney(num) {
        var digits = 2;
        const lookup = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "k" },
            { value: 1e6, symbol: "M" },
            { value: 1e9, symbol: "G" },
            { value: 1e12, symbol: "T" },
            { value: 1e15, symbol: "P" },
            { value: 1e18, symbol: "E" }
        ];
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var item = lookup.slice().reverse().find(function(item) {
            return num >= item.value;
        });
        return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";

        //return num.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    
    const {total_sales,total_transactions} = data;

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
                GROSS VOLUME
              </Typography>
              <Typography
                  color="textPrimary"
                  variant="h4"
              >
                {formatMoney(total_sales)}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                  sx={{
                    backgroundColor: 'primary.main',
                    height: 56,
                    width: 56
                  }}
              >
                <AttachMoneyIcon />
              </Avatar>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
  );
}

