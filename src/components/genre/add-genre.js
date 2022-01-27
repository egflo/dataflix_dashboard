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
    CircularProgress,
} from '@mui/material';
import {useGetMovies} from '../../service/service';
import { useFormik } from 'formik';
import * as yup from 'yup';
import GenreForm from './genre-form';
import {useGetGenre} from '../../service/service';

export default function AddGenre(props) {
    const ref = useRef(null);
    const [open, setOpen] = useState(false);

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
    
    return (
        <div>
            <Button
                color="primary"
                variant="contained"
                type="button"
                onClick={handleToggle}
            >
                Add Genre
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
                            <GenreForm {...props} open={open} setopen={setOpen}></GenreForm>
                        </CardContent>
                    </Grid>
                </Box>
            </Backdrop>
        </div>
    );
}
