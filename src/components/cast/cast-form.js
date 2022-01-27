import { useState,useRef } from 'react';
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
    Portal,
} from '@mui/material';
import {useGetMovies} from '../../service/service';

export function CastForm(props) {
    const container = useRef(null);

    const [values, setValues] = useState({
        category: '',
        character: '',
    });
    
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            starId: props.cast.starId,
            category: values.category,
            characters:values.character,
            name: props.cast.name,
            photo: props.cast.photo,
        };
        
        const index = props.casts.find(item => item.starId === props.cast.starId);
        props.setcasts([...props.casts, data]);

        props.open(false);
    };

    return (

        <Card>
            <CardHeader
                subheader="The information can be edited"
                title={props.cast.name + ' (' + props.cast.birthYear + ')'}
            />
            <Divider />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                        <TextField
                            fullWidth
                            id="category"
                            name="category"
                            label="Category"
                            value={values.category}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <TextField
                            fullWidth
                            id="character"
                            name="character"
                            label="Character"
                            value={values.character}
                            onChange={handleChange}
                            variant="outlined"
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
                    type="button"
                    onClick={handleSubmit}
                >
                    Save details
                </Button>
            </Box>
        </Card>
    );
};
