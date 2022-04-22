import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { products } from '../../__mocks__/products';
import { ProductListToolbar } from '../../components/product/product-list-toolbar';
import { ProductForm } from '../../components/product/product-form';
import { DashboardLayout } from '../../components/dashboard-layout';
import { useRouter } from 'next/router'
import {useGetMovies} from '../../service/service';

function Product(props) {
    const router = useRouter();
    const { productId } = router.query;

    const { data, error } = useGetMovies(productId);

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
                        <ProductForm product={data} alert={props.alert} setalert={props.setalert}/>
                    </Box>
                </Container>
            </Box>
        </>
    );
}


// this function only runs on the server by Next.js
export const getServerSideProps = async ({params}) => {
    const productId = params.productId;
    return {
        props: { productId }
    }
}

Product.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Product;
