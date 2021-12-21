import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { OrderListResults } from '../components/order/order-list-results';
import OrderListToolbar from '../components/order/order-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import {useState} from "react";

function Orders() {
    const [limit, setlimit] = useState(5);
    const [page, setpage] = useState(0);
    const [path, setpath] = useState('all');

    return (
        <>
            <Head>
                <title>
                    Orders | Material Kit
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
                    <OrderListToolbar setpath={setpath} path={path} />
                    <Box sx={{ mt: 3 }}>
                        <OrderListResults setpath={setpath} path={path} setpage={setpage} setlimit={setlimit} page={page} limit={limit} />
                    </Box>
                </Container>
            </Box>
        </>
    )
}

Orders.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Orders;
