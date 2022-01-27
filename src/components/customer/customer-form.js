import {useEffect, useState} from 'react';
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
} from '@mui/material';
import {useGetMovies} from '../../service/service';
import { useFormik } from 'formik';
import * as yup from 'yup';


const validationSchema = yup.object({
    firstName: yup
        .string('Enter your first name')
        .required('Enter a valid first name'),
    lastName: yup
        .string('Enter your last name')
        .required('Enter a valid last name'),
    email: yup
        .string('Enter your email')
        .required('Enter a valid email'),
    created: yup
        .date('Enter creation date')
        .required('Enter a valid date'),
});

function formatDate(created) {
    const moment = require('moment'); // require
    const d = new Date(created);
    return moment(d).format('YYYY-MM-DD');
}

export function CustomerForm(props) {

    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        id: props.customer ? props.customer.id : null,
        firstName: props.customer ? props.customer.firstName : '',
        lastName:  props.customer ? props.customer.lastName : '',
        email: props.customer ? props.customer.email : '',
        created: props.customer ? formatDate(props.customer.created) : formatDate(new Date()),
    });

    useEffect(() => {
        // POST request using fetch with error handling
        if(loading) {
            const url = 'http://localhost:8080/customer/' + props.customer.id;
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
                body: JSON.stringify(values)
            };
            fetch(url, requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }

                    // return parsed json if response is successful
                    setValues(
                        {
                            id: data.id,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            email: data.email,
                            created: formatDate(data.created),
                        }
                    );
                    props.setalert({
                        open: true,
                        message: 'Customer updated successfully',
                        severity: 'success',
                    });
                    setLoading(false);
                })
                .catch(error => {
                    props.setalert({
                        open: true,
                        message: 'Error updating customer',
                        severity: 'error',
                    });
                    setLoading(false);
                });
        }

// empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [loading]);

    const formik = useFormik({
        initialValues: {
            ...values,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            values.id = props.customer.id;
            setValues(
                {
                    id: values.id,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    created: values.created,
                }
            );
            setLoading(true);
        },
    });

    return (
        <form
            autoComplete="off"
            noValidate
            onSubmit={formik.handleSubmit}
        >
            <Card>
                <CardHeader
                    subheader="The information can be edited"
                    title={`Customer: ${props.customer.id}`}
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
                            <TextField
                                fullWidth
                                helperText="Please specify the first name"
                                label="First name"
                                name="firstName"
                                type="text"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="Please specify the last name"
                                label="Last name"
                                name="lastName"
                                type="text"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="Please specify the email"
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Created"
                                name="created"
                                type="text"
                                disabled
                                value={formik.values.created}
                                onChange={formik.handleChange}
                                error={formik.touched.created && Boolean(formik.errors.created)}
                                helperText={formik.touched.created && formik.errors.created}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2
                    }}
                >
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        disabled={loading}
                    >
                        Save details
                    </Button>
                </Box>
            </Card>
        </form>
    );
};
