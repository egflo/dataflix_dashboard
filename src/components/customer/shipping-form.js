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
    firstName: yup.string()
        .required("First name is required"),
    lastName: yup.string()
        .required("Last name is required"),
    unit: yup.string(),
    street: yup.string()
        .min(5, "Too Short!")
        .required("Street is required"),
    city: yup.string()
        .min(2, "Too Short!")
        .required("City is required"),
    postcode: yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(5, "Too Short!")
        .required("Postcode is required")
});

export function ShippingForm(props) {
    const {data, disabled} = props;
    const {shipping, status} = data;

    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        firstname: shipping.firstname,
        lastname: shipping.lastname,
        unit: shipping.unit,
        street: shipping.street,
        city: shipping.city,
        state: shipping.state,
        postcode: shipping.postcode,
    });

    const formik = useFormik({
        initialValues: {
            ...values,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            values.id = shipping.id;
            setValues(values);
            //alert(JSON.stringify(values, null, 2));
            setLoading(true);
        },
    });

    useEffect(() => {

        if(loading) {
            // POST request using fetch with error handling
            const url = process.env.NEXT_PUBLIC_API_URL + '/shipping/' + shipping.id;

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
                    //alert(JSON.stringify(data, null, 2));
                    setValues({
                        firstname: data.firstname,
                        lastname: data.lastname,
                        unit: data.unit,
                        street: data.street,
                        city: data.city,
                        state: data.state,
                        postcode: data.postcode,
                    });
                    setLoading(false);

                })
                .catch(error => {
                    //this.setState({ errorMessage: error.toString() });
                    console.error('There was an error!', error);
                    setLoading(false);
                });
        }

// empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [loading]);

    return (
        <form
            autoComplete="off"
            noValidate
            onSubmit={formik.handleSubmit}
            {...props}
        >
            <Card>
                <CardHeader
                    subheader={disabled ? 'The information cannot be edited' : 'The information can be edited'}
                    title={`Shipping Information`}
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
                                disabled={disabled}
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
                                disabled={disabled}
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
                                disabled={disabled}
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
                                helperText="Please specify the address"
                                label="Street address"
                                name="street"
                                type="text"
                                disabled={disabled}
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
                                disabled={disabled}
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
                                disabled={disabled}
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
                                disabled={disabled}
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
                        disabled={disabled}
                    >
                        Save details
                    </Button>
                </Box>
            </Card>
        </form>
    );
};
