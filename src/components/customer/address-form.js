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

const states = [
    {
        value: 'CA',
        label: 'California'
    },
];

const validationSchema = yup.object().shape({
    firstname: yup.string()
        .required("First name is required"),
    lastname: yup.string()
        .required("Last name is required"),
    unit: yup.string(),
    street: yup.string()
        .min(5, "Too Short!")
        .required("Address is required"),
    city: yup.string()
        .min(2, "Too Short!")
        .required("City is required"),
    postcode: yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(5, "Too Short!")
        .required("Postcode is required")
});

export function AddressForm(props) {
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        id: props.address.id || '',
        firstname: props.address.firstname|| '',
        lastname: props.address.lastname || '',
        street: props.address.street || '',
        unit: props.address.unit || '',
        city: props.address.city || '',
        state: props.address.state || '',
        postcode: props.address.postcode || '',
    });

    useEffect(() => {
        // POST request using fetch with error handling
        if(loading) {
            const url = process.env.NEXT_PUBLIC_API_URL + '/address/' + props.address.id;
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
                    props.setalert({
                        open: true,
                        message: 'Address updated successfully',
                        severity: 'success',
                    });
                    setLoading(false);
                })
                .catch(error => {
                    //this.setState({ errorMessage: error.toString() });
                    props.setalert({
                        open: true,
                        message: error.toString(),
                        severity: 'error'
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
            const json = JSON.stringify(values);
            setValues(values);
            setLoading(true)
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
                    title={`Address Information`}
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
                                name="firstname"
                                type="text"
                                value={formik.values.firstname}
                                onChange={formik.handleChange}
                                error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                                helperText={formik.touched.firstname && formik.errors.firstname}
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
                                name="lastname"
                                type="text"
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                                error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                                helperText={formik.touched.lastname && formik.errors.lastname}
                            />
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={6}
                        >
                            <TextField
                                fullWidth
                                helperText="Please specify the unit"
                                label="Unit"
                                name="unit"
                                type="text"
                                value={formik.values.unit}
                                onChange={formik.handleChange}
                                error={formik.touched.unit && Boolean(formik.errors.unit)}
                                helperText={formik.touched.unit && formik.errors.unit}
                            />
                        </Grid>
                        <Grid
                            item
                            md={8}
                            xs={6}
                        >
                            <TextField
                                fullWidth
                                helperText="Please specify the street name"
                                label="Address"
                                name="street"
                                type="text"
                                value={formik.values.street}
                                onChange={formik.handleChange}
                                error={formik.touched.street && Boolean(formik.errors.street)}
                                helperText={formik.touched.street && formik.errors.street}
                            />
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={4}
                        >
                            <TextField
                                fullWidth
                                helperText="Please specify the city"
                                label="City"
                                name="city"
                                type="text"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                error={formik.touched.city && Boolean(formik.errors.city)}
                                helperText={formik.touched.city && formik.errors.city}
                            />
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={4}
                        >
                            <TextField
                                fullWidth
                                label="Select State"
                                name="state"
                                required
                                select
                                SelectProps={{ native: true }}
                                value={formik.values.state}
                                onChange={formik.handleChange}
                                variant="outlined"
                            >
                                {states.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={4}
                        >
                            <TextField
                                fullWidth
                                helperText="Please specify the postal code"
                                label="Postal code"
                                name="postcode"
                                type="text"
                                value={formik.values.postcode}
                                onChange={formik.handleChange}
                                error={formik.touched.postcode && Boolean(formik.errors.postcode)}
                                helperText={formik.touched.postcode && formik.errors.postcode}
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
                    >
                        Save details
                    </Button>
                </Box>
            </Card>
        </form>
    );
};
