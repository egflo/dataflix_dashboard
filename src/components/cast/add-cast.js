import { useState, useEffect, useRef } from 'react';
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
    Backdrop,
    Autocomplete,
    Portal,
} from '@mui/material';
import {useGetMovies} from '../../service/service';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {CastSearch} from './cast-search';
import {CastForm} from './cast-form';
import {useGetCast} from '../../service/service';

export default function AddCast(props) {
    const ref = useRef(null);
    const container = useRef(null);
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [value, setValue] = useState(null);

    const {data, error} = useGetCast("name/"+input);

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target) && open) {
                setOpen(!open);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, open]);

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    function formatData(data) {
        return data.map(item => ({
            id: item.starId,
            label: item.name,
            content: item
        }));
    }

    return (
        <div>
            <Button
                color="primary"
                variant="contained"
                type="button"
                onClick={handleToggle}
            >
                Add Cast
            </Button>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                //onClick={handleClose}
            >
                <Box
                    ref={ref}
                    sx={{
                        position: 'absolute',
                       // top: 0,
                       // left: 0,
                        //right: 0,
                        //bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 1.0)',
                        width: '600px',
                        maxHeight: '550px',
                        minHeight: '150px',
                        borderRadius: '5px',
                    }}
                >
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        spacing={1}
                    >
                        <CardContent>
                            <Autocomplete
                                disablePortal
                                id="cast-search"
                                isOptionEqualToValue={(option, value) => option.starId === value.starId}
                                options={!data ? [] : formatData(data)}
                                onInputChange={(event, newInputValue) => {
                                    setInput(newInputValue);
                                }}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                sx={{ width: 500, paddingTop: '10px' }}
                                renderInput={(params) => <TextField {...params} label="Search Cast" />}
                            />
                        </CardContent>
                        <CardContent>
                            {value != null ? (
                                 <CastForm  cast={value.content} casts={props.cast} setcasts={props.setcast} open={setOpen}/>
                            ) :  <h1 style={{color:'gray'}}>No Cast Selected.</h1>}
                        </CardContent>
                    </Grid>
                </Box>
            </Backdrop>
        </div>
    );
}
