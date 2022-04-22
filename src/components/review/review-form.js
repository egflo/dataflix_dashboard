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
        value: 1,
        label: 1,
    },
    {
        value: 2,
        label: 2,
    },
    {
        value: 3,
        label: 3,
    },
    {
        value: 4,
        label: 4,
    },
    {
        value: 5,
        label: 5,
    },
    {
        value: 6,
        label: 6,
    },
    {
        value: 7,
        label: 7,
    },
    {
        value: 8,
        label: 8,
    },
    {
        value: 9,
        label: 9,
    },
    {
        value: 10,
        label: 10,
    },

];


const validationSchema = yup.object().shape({
    title: yup.string()
        .required('Title is required')
        .min(3, 'Title must be at least 3 characters long'),
    text: yup.string()
        .required('Text is required')
        .min(3, 'Text must be at least 3 characters long'),
    rating: yup.number()
        .required('Rating is required')
        .min(0, 'Rating must be at least 0')
        .max(10, 'Rating must be at most 10'),
    sentiment: yup.string()
        .required('Sentiment is required'),
});

export function ReviewForm(props) {
    const {review, ...rest} = props;

    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        id: review.id || '',
        title: review.title || '',
        text: review.text || '',
        rating: review.rating || 1,
        sentiment: review.sentiment || '',
    });

    const formik = useFormik({
        initialValues: {
            ...values,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setValues(values);
           // alert(JSON.stringify(values, null, 2));
            setLoading(true);
        },
    });

    useEffect(() => {

        if(loading) {
            // POST request using fetch with error handling
            const url = process.env.NEXT_PUBLIC_API_URL + '/review/' + review.id;

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
                    setValues({
                        id: data.id,
                        title: data.title,
                        text: data.text,
                        sentiment: data.sentiment,
                    });
                    props.setalert({
                        open: true,
                        message: 'Review updated successfully',
                        severity: 'success',
                    });
                    setLoading(false);

                })
                .catch(error => {
                    //this.setState({ errorMessage: error.toString() });
                    props.setalert({
                        open: true,
                        message: error.toString(),
                        severity: 'error',
                    });
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
        >
            <Card>
                <CardHeader
                    subheader={disabled ? 'The information cannot be edited' : 'The information can be edited'}
                    title={`Review Information`}
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
                            xs={6}
                        >
                            <TextField
                                fullWidth
                                helperText="Please specify the title"
                                label="Title"
                                name="title"
                                type="text"
                                disabled={disabled}
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title && formik.errors.title}
                            />
                        </Grid>
                        <Grid
                            item
                            md={3}
                            xs={6}
                        >
                            <TextField
                                fullWidth
                                label="Sentiment"
                                name="sentiment"
                                type="text"
                                disabled={true}
                                value={formik.values.sentiment}
                                onChange={formik.handleChange}
                                error={formik.touched.sentiment && Boolean(formik.errors.sentiment)}
                                helperText={formik.touched.sentiment && formik.errors.sentiment}
                            />
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <TextField
                                fullWidth
                                label="Rating"
                                name="rating"
                                onChange={formik.handleChange}
                                required
                                select
                                SelectProps={{ native: true }}
                                value={formik.values.rating}
                                onChange={formik.handleChange}
                                error={formik.touched.rating && Boolean(formik.errors.rating)}
                                helperText={formik.touched.rating && formik.errors.rating}
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
                            md={12}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="Please specify the content"
                                label="Text"
                                name="text"
                                type="text"
                                multiline
                                maxRows={5}
                                disabled={disabled}
                                value={formik.values.text}
                                onChange={formik.handleChange}
                                error={formik.touched.text && Boolean(formik.errors.text)}
                                helperText={formik.touched.text && formik.errors.text}
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
