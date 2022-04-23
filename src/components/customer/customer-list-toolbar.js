import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
    Typography,
    Grid,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    FormControlLabel,
    Checkbox,

} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';
import {useRef, useState} from 'react';
import Customers from "../../pages/customers";

export default function CustomerListToolbar(props) {
    const {path, setpath, order, setorder, sort, setsort, ...rest} = props;
    const ref = useRef(null);
    const [select, setSelect] = useState(0);

    function handleChange(event) {
        const value = event.target.value;
        if (value.length > 0) {
            setpath("search/" + value);
        } else {
            setpath("all");
        }
    }

    function handleChangeSort(event) {
        const value = event.target.value;
        setSelect(value);
        if(value === 0) {
            setsort('created');
            setorder(0);
        }
        else if(value === 1) {
            setsort('created');
            setorder(1);
        }
        else if(value === 2) {
            setsort('firstName');
            setorder(0);
        }
        else if(value === 3) {
            setsort('firstName');
            setorder(1);
        }
        else if(value === 4) {
            setsort('lastName');
            setorder(0);
        }
        else if(value === 5) {
            setsort('lastName');
            setorder(1);
        }
        else {
            setsort('id');
            setorder(0);
        }
    }

    return (
        <Box {...rest}>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    m: -1
                }}
            >
                <Typography
                    sx={{ m: 1 }}
                    variant="h4"
                >
                    Customers
                </Typography>
                <Box sx={{ m: 1 }}>
                    <Button
                        startIcon={(<UploadIcon fontSize="small" />)}
                        sx={{ mr: 1 }}
                    >
                        Import
                    </Button>
                    <Button
                        startIcon={(<DownloadIcon fontSize="small" />)}
                        sx={{ mr: 1 }}
                    >
                        Export
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        href="/customer/add"
                    >
                        Add Customer
                    </Button>
                </Box>
            </Box>
            <Box sx={{ mt: 3}}>
                <Card>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={5}>
                                <Box sx={{ maxWidth: 500}}>
                                    <TextField
                                        ref={ref}
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SvgIcon
                                                        color="action"
                                                        fontSize="small"
                                                    >
                                                        <SearchIcon />
                                                    </SvgIcon>
                                                </InputAdornment>
                                            )
                                        }}
                                        onChange={handleChange}
                                        placeholder="Search Users"
                                        variant="outlined"
                                    />

                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="select-label">Sort</InputLabel>
                                        <Select
                                            id="sort-select"
                                            value={select}
                                            label="Sort"
                                            onChange={handleChangeSort}
                                        >
                                            <MenuItem value={0}>Created Date (oldest first)</MenuItem>
                                            <MenuItem value={1}>Created Date (newest first)</MenuItem>
                                            <MenuItem value={2}>First Name (A-Z)</MenuItem>
                                            <MenuItem value={3}>Last Name (Z-A)</MenuItem>
                                            <MenuItem value={4}>First Name (A-Z)</MenuItem>
                                            <MenuItem value={5}>Last Name (Z-A)</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

