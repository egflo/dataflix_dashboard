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
import { Download as DownloadIcon } from '../../icons/download';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import {useRef, useState} from "react";

export default function ReviewListToolbar(props) {
    const {path, setpath, order, setorder, sort, setsort, status, setstatus, ...rest} = props;

    const ref = useRef(null);
    const [select, setSelect] = useState(0);

    function handleChange(event) {
        const value = event.target.value;
        if (value.length > 0) {
            setpath("search/" + value);
        } else {
            ("all");
        }
        //setpage(0);
    }

    function handleChangeStatus(event) {
        setstatus(event.target.value);
       // props.setpath("status/" + event.target.value);
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
            setsort('rating');
            setorder(0);
        }
        else if(value === 3) {
            setsort('rating');
            setorder(1);
        }
        else {
            setsort('id');
            setorder(0);
        }
    }

    return (
        <Box {...props}>
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
                    Reviews
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
                        disabled
                    >
                        Add Review
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
                                        placeholder="Search Reviews"
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
                                            <MenuItem value={2}>Rating (lowest first)</MenuItem>
                                            <MenuItem value={3}>Rating (highest first)</MenuItem>
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

