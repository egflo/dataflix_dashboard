import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from '../components/account/account-profile';
import { AccountProfileDetails } from '../components/account/account-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';
import { SettingsPassword } from '../components/settings/settings-password';
import {useGetUser} from '../service/service';

function Account(props) {
    const { data, error } = useGetUser();

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


    return (
        <>
            <Head>
                <title>
                    Account | Material Kit
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        sx={{ mb: 3 }}
                        variant="h4"
                    >
                        Account
                    </Typography>
                    <Grid
                        container
                        spacing={3}
                    >

                      <Grid
                        item
                        lg={8}
                        md={6}
                        xs={12}
                      >
                        <SettingsPassword customer={data} alert={props.alert} setalert={props.setalert} />
                      </Grid>
                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            <AccountProfileDetails user={data} alert={props.alert} setalert={props.setalert} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}


Account.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Account;
