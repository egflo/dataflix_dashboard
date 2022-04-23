import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import * as React from "react";

const clientSideEmotionCache = createEmotionCache();


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { vertical, horizontal } = { vertical: 'top', horizontal: 'center' };


  const [alert, setAlert] = React.useState({
    open: false,
    message: '',
    severity: 'info'
    });

  const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert({
            open: false,
            message: '',
            severity: 'info'
        });
  };

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          Material Kit Pro
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} alert={alert} setalert={setAlert}/>)}
          <Snackbar
              open={alert.open}
              autoHideDuration={6000}
              onClose={handleClose}
              key={vertical + horizontal}
              anchorOrigin={{ vertical, horizontal }}
          >
            <Alert onClose={handleClose} severity={alert.severity}>
                {alert.message}
            </Alert>
          </Snackbar>
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
