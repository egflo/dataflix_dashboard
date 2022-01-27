import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { useRouter } from 'next/router'
import {useGetAddress} from '../../../service/service';
import {useState} from "react";
import {AddressForm} from "../../../components/customer/address-form";



function Customer() {
    const router = useRouter();
    const { id } = router.query;

    const { data, error } = useGetAddress(id);

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
                        <AddressForm address={data}/>
                    </Box>
                </Container>
            </Box>
        </>
    );
}


Customer.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Customer;
