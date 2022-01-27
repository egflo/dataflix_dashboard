import { useState } from 'react';
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



const validationSchema = yup.object({
    id: yup
        .string('Enter a valid id')
        .required('Id is required'),
    name: yup
        .number('Enter a valid name')
        .required('Name is required'),
    birthYear: yup
        .number('Enter a valid birth year')
        .required('Birth year is required'),
    bio: yup
        .string('Enter a valid bio'),
    birthName: yup
        .string('Enter a valid birth name'),
    birthDetails: yup
        .string('Enter a valid birth details'),
    dob: yup
        .string('Enter a valid dob'),
    place_of_birth: yup
        .string('Enter a valid place of birth'),
    dod: yup
        .string('Enter a valid dod'),
});


export function CastForm({props, cast}) {
    const [cast, setCast] = useState(product.cast);

    const formik = useFormik({
        initialValues: {
            id: cast.starId,
            name: cast.name,
            birthYear: cast.birthYear,
            bio: cast.bio,
            birthName: cast.birthName,
            birthDetails: cast.birthDetails,
            dob: cast.dob,
            place_of_birth: cast.place_of_birth,
            dod: cast.dod,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const json = JSON.stringify(values);
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <form
            autoComplete="off"
            noValidate
            onSubmit={formik.handleSubmit}
            {...props}
        >
            <Card>
                <CardHeader
                    subheader="The information can be edited"
                    title={product.title + ' (' + product.year + ')'}
                />
                <Divider />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={6}>
                            <TextField
                                fullWidth
                                id="title"
                                name="title"
                                label="Title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title && formik.errors.title}
                            />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <TextField
                                fullWidth
                                id="year"
                                name="year"
                                label="year"
                                value={formik.values.year}
                                onChange={formik.handleChange}
                                error={formik.touched.year && Boolean(formik.errors.year)}
                                helperText={formik.touched.year && formik.errors.year}
                            />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <FormControl fullWidth>
                                <InputLabel id="select">Rated</InputLabel>
                                <Select
                                    labelId="rated"
                                    id="rated"
                                    value={formik.values.rated}
                                    label="rated"
                                    type="select"
                                    onChange={formik.handleChange}
                                    error={formik.touched.rated && Boolean(formik.errors.rated)}
                                    helperText={formik.touched.rated && formik.errors.rated}
                                >
                                    <MenuItem value={"G"}>G</MenuItem>
                                    <MenuItem value={"PG-13"}>PG-13</MenuItem>
                                    <MenuItem value={"R"}>R</MenuItem>
                                    <MenuItem value={"N/A"}>N/A</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={8} md={8}>
                            <TextField
                                fullWidth
                                id="plot"
                                label="Plot"
                                multiline
                                maxRows={4}
                                value={formik.values.plot}
                                onChange={formik.handleChange}
                                error={formik.touched.plot && Boolean(formik.errors.plot)}
                                helperText={formik.touched.plot && formik.errors.plot}
                            />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <TextField
                                fullWidth
                                id="runtime"
                                name="runtime"
                                label="Runtime"
                                value={formik.values.runtime}
                                onChange={formik.handleChange}
                                error={formik.touched.runtime && Boolean(formik.errors.runtime)}
                                helperText={formik.touched.runtime && formik.errors.runtime}
                            />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <TextField
                                fullWidth
                                id="language"
                                name="language"
                                label="Language"
                                value={formik.values.language}
                                onChange={formik.handleChange}
                                error={formik.touched.language && Boolean(formik.errors.language)}
                                helperText={formik.touched.language && formik.errors.language}
                            />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <TextField
                                fullWidth
                                id="writer"
                                name="writer"
                                label="Writer"
                                value={formik.values.writer}
                                onChange={formik.handleChange}
                                error={formik.touched.writer && Boolean(formik.errors.writer)}
                                helperText={formik.touched.writer && formik.errors.writer}
                            />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <TextField
                                fullWidth
                                id="director"
                                name="director"
                                label="Director"
                                value={formik.values.director}
                                onChange={formik.handleChange}
                                error={formik.touched.director && Boolean(formik.errors.director)}
                                helperText={formik.touched.director && formik.errors.director}
                            />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <TextField
                                fullWidth
                                id="country"
                                name="country"
                                label="Country"
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                error={formik.touched.country && Boolean(formik.errors.country)}
                                helperText={formik.touched.country && formik.errors.country}
                            />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <TextField
                                fullWidth
                                id="production"
                                name="production"
                                label="Production"
                                value={formik.values.production}
                                onChange={formik.handleChange}
                                error={formik.touched.production && Boolean(formik.errors.production)}
                                helperText={formik.touched.production && formik.errors.production}
                            />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <TextField
                                fullWidth
                                id="boxOffice"
                                name="boxOffice"
                                label="Box Office"
                                value={formik.values.boxOffice}
                                onChange={formik.handleChange}
                                error={formik.touched.boxOffice && Boolean(formik.errors.boxOffice)}
                                helperText={formik.touched.boxOffice && formik.errors.boxOffice}
                            />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <TextField
                                fullWidth
                                id="awards"
                                name="awards"
                                label="awards"
                                value={formik.values.awards}
                                onChange={formik.handleChange}
                                error={formik.touched.awards && Boolean(formik.errors.awards)}
                                helperText={formik.touched.awards && formik.errors.awards}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardContent>
                    <Stack direction="row" spacing={1}>
                        {genres.map((genre, index) => (

                            <Chip
                                key={genre.id}
                                color="primary"
                                label={genre.name}
                                size="large"
                                onDelete={() => handleDeleteGenre(index)}
                            />
                        ))}

                    </Stack>
                </CardContent>
                <Divider />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={10}>
                            {cast.map((person, index) => (
                                <Chip
                                    avatar={<Avatar alt={person.name} src={person.photo} />}
                                    key={person.id}
                                    color="primary"
                                    label={person.name}
                                    size="large"
                                    onDelete={() => handleDeleteCast(index)}
                                    sx={{ m: 1 }}
                                />
                            ))}

                        </Grid>
                        <Grid item xs={3} md={2}>
                            <Button
                                color="primary"
                                variant="contained"
                                type="button"
                            >
                                Add Cast
                            </Button>
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
