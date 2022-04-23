import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import CustomerListToolbar from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import {useState} from "react";
import { SettingsPassword } from '../components/settings/settings-password';

function Customers(...props) {
    const [limit, setlimit] = useState(5);
    const [page, setpage] = useState(0);
    const [sort, setsort] = useState('created');
    const [order, setorder] = useState(0);
    const [path, setpath] = useState('all');

    return (
        <>
            <Head>
                <title>
                    Customers | Material Kit
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth={false}>
                    <CustomerListToolbar setpath={setpath} path={path} setorder={setorder} order={order} sort={sort} setsort={setsort} />
                    <Box sx={{ mt: 3 }}>
                        <CustomerListResults setpath={setpath} path={path} setpage={setpage} setlimit={setlimit} page={page} limit={limit} setorder={setorder} order={order} sort={sort} setsort={setsort}  />
                    </Box>
                </Container>
            </Box>
        </>
    )
}

Customers.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Customers;
