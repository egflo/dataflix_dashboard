import { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    Item,
    FormControl,
    FormLabel,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Stack,
    Avatar,
    Typography,
} from '@mui/material';
import {useGetMovies} from '../../service/service';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {format} from 'date-fns';

export function PaymentForm(props) {
    const {payment, sale} = props;

    function formatCurrency(amount) {
        return amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    }


    return(
        <Card>
            <CardHeader
                subheader="The information cannot be edited"
                title={`Payment Information`}
            />
            <Divider />
            <CardContent>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <Box>
                            <Typography>
                                <b>Transaction ID: </b> {sale.id}
                            </Typography>
                            <Typography>
                                <b>Transaction Date: </b> {format(new Date(sale.saleDate), 'MM/dd/yyyy')}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <Typography>
                            <b>Payment Method: </b> {payment.network.toLocaleString().toUpperCase()}
                        </Typography>
                        <Typography>
                            <b>Last 4: </b> x{payment.last4}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <Box>
                            <Typography>
                                <b>Subtotal: </b> {formatCurrency(sale.subTotal)}
                            </Typography>
                            <Typography>
                                <b>Taxes: </b> {formatCurrency(sale.salesTax)}
                            </Typography>
                            <Typography>
                                <b>Total: </b> {formatCurrency(sale.total)}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

