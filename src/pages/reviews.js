import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ReviewListResults } from '../components/review/review-list-results';
import ReviewListResultsListToolbar from '../components/review/review-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import {useState} from "react";

function Reviews() {
    const [limit, setlimit] = useState(5);
    const [page, setpage] = useState(0);
    const [sort, setsort] = useState('id');
    const [order, setorder] = useState(0);
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
                    <ReviewListResultsListToolbar setpath={setpath} path={path} setorder={setorder} order={order} sort={sort} setsort={setsort}/>
                    <Box sx={{ mt: 3 }}>
                        <ReviewListResults setpath={setpath} path={path} setpage={setpage} setlimit={setlimit} page={page} limit={limit} setorder={setorder} order={order} sort={sort} setsort={setsort}/>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

Reviews.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Reviews;
