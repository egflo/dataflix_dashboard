import Head from 'next/head';
import { Box, Container, Grid, Pagination, Card, CardHeader, Alert, Snackbar, Stack, Divider } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { useRouter } from 'next/router'
import {useGetReviews} from '../../../service/service';
import {useState} from "react";
import {ReviewForm} from "../../../components/review/review-form";
import { SeverityPill } from '../../../components/severity-pill';

function Review(props) {
    const router = useRouter();
    const { id } = router.query;
    const { data, error} = useGetReviews(id);


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
                        <Card>
                            <CardHeader
                                title = {`Review #${data.id}`}
                                subheader = {'Infomation below can be edited'}
                            />
                            <ReviewForm review={data} alert={props.alert} setalert={props.setalert}/>
                        </Card>
                        <Divider />
                        <Card>
                            <CardHeader
                                title = {'Movie Information'}
                                subheader = {'Infomation cannot be edited'}
                            />
                            <Box sx={{ p: 4}}>
                                <Grid container spacing={1}>
                                    <Grid>
                                        <Box
                                            component="img"
                                            sx={{
                                                width: '120px',
                                                height: 'auto',
                                                maxWidth: '100%',
                                                borderRadius: '5px'
                                            }}
                                            alt={data.movie.title}
                                            src={data.movie.poster}
                                        >
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Stack spacing={1}>
                                            <Box>
                                                <b>ID:</b> {data.movie.id}
                                            </Box>
                                            <Box>
                                                <b>Title:</b> {data.movie.title}
                                            </Box>
                                            <Box>
                                                <b>Year:</b> {data.movie.year}
                                            </Box>
                                            <Box>
                                                <b>Rated:</b> {data.movie.rated}
                                            </Box>
                                            <Box>
                                                <b>Runtime:</b> {data.movie.runtime}
                                            </Box>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Card>
                        <Divider />
                        <Card>
                            <CardHeader
                                title = {`Customer Information`}
                                subheader = {'Infomation below cannot be edited'}
                            />
                            <Box sx={{ p: 4}}>
                                <Grid item xs={12} sm={6}>
                                    <Stack spacing={1}>
                                        <Box>
                                            <b>ID:</b> {data.customer.id}
                                        </Box>
                                        <Box>
                                            <b>First Name:</b> {data.customer.firstname}
                                        </Box>
                                        <Box>
                                            <b>Last Name:</b> {data.customer.lastname}
                                        </Box>
                                        <Box>
                                            <b>Email:</b> {data.customer.email}
                                        </Box>
                                    </Stack>
                                </Grid>
                            </Box>
                        </Card>
                    </Box>
                </Container>
            </Box>

        </>
    );
}

export const getServerSideProps = async ({params}) => {
    const id = params.id;
    return {
        props: { id }
    }
}


Review.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Review;
