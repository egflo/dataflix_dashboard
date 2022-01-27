import Head from 'next/head';
import { Box, Container, Grid, Pagination, Card, CardHeader, Alert, Snackbar, Stack } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { useRouter } from 'next/router'
import {useGetSales} from '../../../service/service';
import {useState} from "react";
import {ShippingForm} from "../../../components/customer/shipping-form";
import {PaymentForm} from "../../../components/customer/payment-form";
import {OrderForm} from "../../../components/customer/order-form";
import { SeverityPill } from '../../../components/severity-pill';


function Order() {
    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const router = useRouter();
    const { id } = router.query;
    const { data, error} = useGetSales(id);

    if(!router.isReady) return(
        <>
            <h1>Loading...</h1>
        </>
    );

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

    function disabled() {
        if(data.sale.status === 'pending') {
            return false;
        }
        return true;
    }

    const { vertical, horizontal, open } = state;

    const handleClick = (newState) => {
        console.log(newState);
        setState({ open: true, ...newState });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setState({ ...state, open: false });

    };

    function title() {
        return (
            <Box>
                <h2>Order #{data.sale.id}</h2>
            </Box>
        );
    }

    function subheader() {
        return (
            <Box>
                <SeverityPill
                    color={(data.sale.status === 'shipped' && 'success')
                        || (data.sale.status === 'refunded' && 'error')
                        || 'warning'}
                >
                    {data.sale.status}
                </SeverityPill>
            </Box>
        );
    }

    return (
        <>
            <Head>
                <title>
                    Customer | Material Kit
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
                    <Box sx={{ pt: 3}}>
                        <Card>
                            <CardHeader
                                title = {title()}
                                subheader = {subheader()}
                            />
                        </Card>
                        <PaymentForm payment={data.card} sale={data.sale}/>
                        <ShippingForm data={data.sale} disabled={disabled()}/>
                        <Card>
                            <CardHeader
                                title={"Product(s) Information"}
                                subheader={disabled()? "The information cannot be edited":"The information can be edited"}
                            />
                        </Card>
                        {data.sale.orders.map((item, index) => (
                            <OrderForm key={index} item={item} disabled={disabled()}/>
                        ))}
                    </Box>
                </Container>
            </Box>

        </>
    );
}


Order.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Order;
