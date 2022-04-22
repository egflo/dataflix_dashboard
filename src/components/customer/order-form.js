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
    Typography,
} from '@mui/material';
import {useGetMovies} from '../../service/service';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {format} from 'date-fns';

export function OrderForm(props) {
    const {item, disabled} = props;
    const [loading, setLoading] = useState(false);
    const [qty, setQty] = useState(item.quantity);

    const {data, error} = useGetMovies(item.movieId);

    useEffect(() => {

        if(loading) {
            // POST request using fetch with error handling
            const url = process.env.NEXT_PUBLIC_API_URL + '/order/' + item.id;

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
                body: JSON.stringify({
                    id: item.id,
                    quantity: qty,
                    listPrice: item.listPrice,
                })
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

                    alert(JSON.stringify(data));
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

    function formatCurrency(amount) {
        return amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    }

    const handleChange = (event) => {
        setQty(event.target.value);
        setLoading(true);
    };

    return(
        <Card>
            <Divider />
            <CardContent>
                <Grid
                    container
                    spacing={1}
                >
                    <Grid
                        item
                        md={7}
                    >
                        <Box>
                            <Typography>
                                <b>Product ID: </b> {item.movieId}
                            </Typography>
                            <Typography>
                                <b>Title: </b> {data.title}
                            </Typography>
                            <Typography>
                                <b>Price: </b> {item.listPrice}
                            </Typography>
                            <Typography>
                                <b>Quantity: </b> {item.quantity}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        md={5}
                    >
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Box sx={{ width: 120}}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="qty-select"
                                        value={qty}
                                        label="Quantity"
                                        onChange={handleChange}
                                        disabled={disabled}
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Button
                                color="primary"
                                variant="contained"
                                style={{marginLeft: '1rem'}}
                                disabled={disabled}
                            >
                                Update
                            </Button>
                            <Button
                                color="secondary"
                                variant="contained"
                                style={{marginLeft: '1rem'}}
                                disabled={disabled}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

