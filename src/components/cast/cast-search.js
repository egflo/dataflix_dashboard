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

export function CastSearch({...props}) {
    const ref = useRef(null);

    function handleChange(event) {
        const value = event.target.value;
        if (value.length > 0) {
            props.setpath("search/" + value);
        } else {
            props.setpath("all");
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
                    Cast Search
                </Typography>
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
                                        placeholder="Search Cast"
                                        variant="outlined"
                                    />

                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}
