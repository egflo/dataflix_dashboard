import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { products } from '../../__mocks__/products';
import { ProductListToolbar } from '../../components/product/product-list-toolbar';
import { CustomerForm } from '../../components/customer/customer-form';
import { DashboardLayout } from '../../components/dashboard-layout';
import { useRouter } from 'next/router'
import {useGetCustomer} from '../../service/service';
import {useState} from "react";
import { OrderListResults } from '../../components/order/order-list-results';
import {AddressListResults} from "../../components/customer/address-list-results";
import { SettingsPassword } from '../../components/settings/settings-password';

function Customer(props) {
    const router = useRouter();
    const { customerId } = router.query;

    const [limit, setlimit] = useState(5);
    const [page, setpage] = useState(0);
    const [sort, setsort] = useState('saleDate');
    const [order, setorder] = useState(0);
    const [path, setpath] = useState('search/'+customerId);
    const [status, setstatus] = useState('all');
    
    const { data, error } = useGetCustomer(customerId);

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
                        <CustomerForm customer={data} alert={props.alert} setalert={props.setalert} />
                        <SettingsPassword customer={data}  alert={props.alert} setalert={props.setalert} />
                        <AddressListResults addresses={data.addresses}  />
                        <OrderListResults setpath={setpath} path={path} setpage={setpage} setlimit={setlimit} page={page} limit={limit} setorder={setorder} order={order} sort={sort} setsort={setsort} status={status} setstatus={setstatus} />
                    </Box>
                </Container>
            </Box>
        </>
    );
}


// this function only runs on the server by Next.js
export const getServerSideProps = async ({params}) => {
    const customerId = params.customerId;
    return {
        props: { customerId }
    }
}


Customer.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Customer;
