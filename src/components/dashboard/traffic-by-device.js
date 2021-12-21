import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import {useGetSales, useGetUsers} from "/src/service/service";

export function TrafficByDevice({...props}) {
  const theme = useTheme();
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

  const {device_sales} = data;

  function calculatePercentage(value) {
    const total = device_sales.browser + device_sales.ios + device_sales.android;
    const percentage = (value / total) * 100;
    return percentage.toFixed(0);
  }

  const dataPie = {
    datasets: [
      {
        data: [device_sales.browser, device_sales.ios, device_sales.android],
        backgroundColor: ['#3F51B5', '#e53935', '#FB8C00'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['Browser', 'iOS', 'Android']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Browser',
      value: calculatePercentage(device_sales.browser),
      icon: LaptopMacIcon,
      color: '#3F51B5'
    },
    {
      title: 'Android',
      value: calculatePercentage(device_sales.android),
      icon: AndroidIcon,
      color: '#E53935'
    },
    {
      title: 'iOS',
      value: calculatePercentage(device_sales.ios),
      icon: AppleIcon,
      color: '#FB8C00'
    }
  ];

  return (
    <Card {...props}>
      <CardHeader title="Traffic by Device" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={dataPie}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
