import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { products } from '../../__mocks__/products';
import { ProductListToolbar } from '../../components/product/product-list-toolbar';
import { ProductForm } from '../../components/product/add-product-form';
import { DashboardLayout } from '../../components/dashboard-layout';
import { useRouter } from 'next/router'
import {useGetMovies} from '../../service/service';

function Product(props) {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>
                    Product | Material Kit
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
                    <Box sx={{ pt: 3 }}>
                        <ProductForm alert={props.alert} setalert={props.setalert}/>
                    </Box>
                </Container>
            </Box>
        </>
    );
}


Product.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Product;
