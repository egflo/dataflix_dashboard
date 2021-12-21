import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme, Menu, MenuItem, Fade, ListItem, ListItemText, List } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {useGetSales, useGetUsers} from "/src/service/service";
import {useState} from 'react';

const show = [
  {
    label: 'Last 7 days',
    value: 7
  },
  {
    label: 'Last 14 days',
    value: 14
  },
  {
    label: 'Last 30 days',
    value: 30
  }
];

export function Sales(...props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [days, setDays] = useState(show[selectedIndex].value);
  const theme = useTheme();
  const { data, error } = useGetSales( "metadata/?days=" + days );

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

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setDays(show[index].value);
    setAnchorEl(null);
  };

  const {last_year,this_year, dates, total_transactions,total_sales} = data;

  const values = {
    datasets: [
      {
        backgroundColor: '#3F51B5',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        //data: [18, 5, 19, 27, 29, 19, 20],
        data: this_year,
        label: 'This year',
        maxBarThickness: 10
      },
      {
        backgroundColor: '#EEEEEE',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: last_year,
        label: 'Last year',
        maxBarThickness: 10
      }
    ],
    labels: dates
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider
        }
      }
    ],
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

  return (
    <Card {...props}>
      <CardHeader
        action={(
          <Button
            endIcon={<ArrowDropDownIcon fontSize="small" />}
            size="small"
            onClick={handleClick}
          >
            {show[selectedIndex].label}
          </Button>
        )}
        title="Latest Sales"
      />
      <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
          MenuListProps={{
            'aria-labelledby': 'lock-button',
            role: 'listbox',
          }}
      >
        {show.map((option, index) => (
            <MenuItem
                key={option.value}
                disabled={index === selectedIndex}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option.label}
            </MenuItem>
        ))}
      </Menu>
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={values}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
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
          href="/orders"
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};
