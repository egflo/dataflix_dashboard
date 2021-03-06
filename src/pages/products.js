import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { products } from '../__mocks__/products';
import { ProductListToolbar } from '../components/product/product-list-toolbar';
import { ProductListResults } from '../components/product/product-list-results';
import { ProductCard } from '../components/product/product-card';
import { DashboardLayout } from '../components/dashboard-layout';
import {useState} from "react";

function Products() {
    const [limit, setlimit] = useState(5);
    const [page, setpage] = useState(0);
    const [sort, setsort] = useState('movie.id');
    const [order, setorder] = useState(0);
    const [path, setpath] = useState('all');
    const [status, setstatus] = useState('all');

    return (
        <>
            <Head>
                <title>
                    Products | Material Kit
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
                    <ProductListToolbar setpath={setpath} path={path} setorder={setorder} order={order} sort={sort} setsort={setsort} status={status} setstatus={setstatus}/>
                    <Box sx={{ mt: 3 }}>
                        <ProductListResults setpath={setpath} path={path} setpage={setpage} setlimit={setlimit} page={page} limit={limit} setorder={setorder} order={order} sort={sort} setsort={setsort} status={status} setstatus={setstatus}/>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

Products.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Products;
