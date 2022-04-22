import {useState, useRef, useEffect} from 'react';
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
    Typography,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import {useGetMovies} from '../../service/service';
import { useFormik } from 'formik';
import * as yup from 'yup';
import AddCast from '../cast/add-cast';
import AddGenre from '../genre/add-genre';


const states = [
    {
        value: 'G',
        label: 'G'
    },
    {
        value: 'PG-13',
        label: 'PG-13'
    },
    {
        value: 'R',
        label: 'R'
    },
    {
        value: 'N/A',
        label: 'N/A'
    }
];

const validationSchema = yup.object({
    title: yup
        .string('Enter a valid title')
        .required('Title is required'),
    year: yup
        .number('Enter a valid year')
        .min(4, 'Year must be 4 digits')
        .required('Year is required'),
    rated: yup
        .string('Enter a valid rating')
        .required('Rating is required'),
    plot: yup
        .string('Enter plot description')
        .required('Plot is required'),
    runtime: yup
        .number('Enter a valid runtime')
        .min(1, 'Runtime must be at least 1 minute')
        .required('Runtime is required'),
    language: yup
        .string('Enter a valid language')
        .required('language is required'),
    writer: yup
        .string('Enter a valid writer'),
    director: yup
        .string('Enter a valid director')
        .required('language is required'),
    awards: yup
        .string('Enter a valid awards'),
    poster: yup
        .string('Enter a valid poster'),
    boxoffice: yup
        .string('Enter a valid boxoffice'),
    production: yup
        .string('Enter a valid production'),
    country: yup
        .string('Enter a valid country'),
    poster: yup
        .string('Enter a valid website'),
    background: yup
        .string('Enter a valid background'),
    price: yup
        .number('Enter a valid price')
        .min(1, 'Price must be at least 1 dollar')
        .required('Price is required'),

    imdb: yup
        .number('Enter a valid IMDB score')
        .min(1, 'IMDB score must be at least 1')
        .max(10, 'IMDB score must be no greater than 10'),

    metacritic: yup
        .number('Enter a valid meta score')
        .min(1, 'Meta score must be at least 1')
        .max(100, 'Meta score must be no greater than 100'),

    rottenTomatoes: yup
        .number('Enter a valid rotten score')
        .min(1, 'Rotten Tomatoes score must be at least 1')
        .max(100, 'Rotten Tomatoes score must be no greater than 100'),

    rottenTomatoesAudience: yup
        .number('Enter a valid rotten score')
        .min(1, 'Rotten Tomatoes score must be at least 1')
        .max(100, 'Rotten Tomatoes score must be no greater than 100')
});

function formatData(data) {
    return {
        id: data.id,
        title: data.title,
        year: data.year,
        rated: data.rated,
        plot: data.plot,
        runtime: data.runtime,
        language: data.language,
        writer: data.writer,
        director: data.director,
        awards: data.awards,
        poster: data.poster,
        background: data.background,
        boxOffice: data.boxOffice,
        production: data.production,
        country: data.country,
        price: data.price,
        ratings : {
            imdb: data.imdb,
            metacritic: data.metacritic,
            rottenTomatoes: data.rottenTomatoes,
            rottenTomatoesAudience: data.rottenTomatoesAudience,
        },
        genres: data.genres.map(genre => ({
            id: genre.id,
            name: genre.name
        })),
        casts: data.cast.map(cast => ({
            starId: cast.starId,
            category: cast.category,
            characters: cast.characters,
            movieId: data.id,
        })),
    }
}


export function ProductForm(props) {

    const container = useRef(null);
    const [loading, setLoading] = useState(false);
    const [cast, setCast] = useState(props.product.cast);
    const [genres, setGenres] = useState(props.product.genres);
    const [movie, setMovie] = useState(null);

    const product = props.product;

    useEffect(() => {
        // POST request using fetch with error handling
        if(loading && movie !== null) {
            console.log(JSON.stringify(formatData(movie)));
            const url = process.env.NEXT_PUBLIC_API_URL + '/movie/' + product.id;
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
                body: JSON.stringify(formatData(movie))
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
                    //console.log(JSON.stringify(data));
                    props.setalert({
                        open: true,
                        message: 'Product updated successfully',
                        severity: 'success',
                    });
                    setLoading(false);
                })
                .catch(error => {
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


    const formik = useFormik({
        initialValues: {
            id: product.id,
            title: product.title,
            year: product.year,
            plot: product.plot || '',
            rated: product.rated || '',
            runtime: product.runtime ? product.runtime : 0,
            language: product.language || '',
            writer: product.writer || '',
            director: product.director || '',
            awards: product.awards ? product.awards : '',
            boxOffice: product.boxOffice ? product.boxOffice : '',
            production: product.production || '',
            country: product.country || '',
            poster: product.poster ? product.poster : '',
            background: product.background ? product.background : '',
            price: product.price ? product.price : 0,

            imdb: product.ratings.imdb ? product.ratings.imdb : '',
            metacritic: product.ratings.metacritic ? product.ratings.metacritic : '',
            rottenTomatoes: product.ratings.rottenTomatoes ? product.ratings.rottenTomatoes : '',
            rottenTomatoesAudience: product.ratings.rottenTomatoesAudience ? product.ratings.rottenTomatoesAudience : '',

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            values.cast = cast;
            values.genres = genres;

            const json = JSON.stringify(values);
            setMovie(values);
            setLoading(true);
        },
    });

    function handleDeleteGenre(index) {
        if(genres.length > 1) {
            const newGenres = genres.filter((item, g) => g !== index);
            setGenres(newGenres);
        }
    }

    function handleDeleteCast(index) {
        if(cast.length > 1) {
            const newCast = cast.filter((item, i) => i !== index);
            setCast(newCast);
        }

    }

    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <>
            <form
                autoComplete="off"
                noValidate
                onSubmit={formik.handleSubmit}
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
                                <TextField
                                    fullWidth
                                    label="Rated"
                                    name="rated"
                                    onChange={formik.handleChange}
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={formik.values.rated}
                                    onChange={formik.handleChange}
                                    error={formik.touched.rated && Boolean(formik.errors.rated)}
                                    helperText={formik.touched.rated && formik.errors.rated}
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
                                    label="Awards"
                                    value={formik.values.awards}
                                    onChange={formik.handleChange}
                                    error={formik.touched.awards && Boolean(formik.errors.awards)}
                                    helperText={formik.touched.awards && formik.errors.awards}
                                />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <TextField
                                    fullWidth
                                    id="price"
                                    name="price"
                                    label="Price"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    error={formik.touched.price && Boolean(formik.errors.price)}
                                    helperText={formik.touched.price && formik.errors.price}
                                />
                            </Grid>
                            <Grid item xs={6} md={12}>
                                <TextField
                                    fullWidth
                                    id="poster"
                                    name="poster"
                                    label="Poster URL"
                                    value={formik.values.poster}
                                    onChange={formik.handleChange}
                                    error={formik.touched.poster && Boolean(formik.errors.poster)}
                                    helperText={formik.touched.poster && formik.errors.poster}
                                />
                            </Grid>

                            <Grid item xs={6} md={12}>
                                <TextField
                                    fullWidth
                                    id="background"
                                    name="background"
                                    label="Background URL"
                                    value={formik.values.background}
                                    onChange={formik.handleChange}
                                    error={formik.touched.background && Boolean(formik.errors.background)}
                                    helperText={formik.touched.background && formik.errors.background}
                                />
                             </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={3}>
                                <TextField
                                    fullWidth
                                    id="imdb"
                                    name="imdb"
                                    label="IMDB"
                                    value={formik.values.imdb}
                                    onChange={formik.handleChange}
                                    error={formik.touched.imdb && Boolean(formik.errors.imdb)}
                                    helperText={formik.touched.imdb && formik.errors.imdb}
                                />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <TextField
                                    fullWidth
                                    id="metacritic"
                                    name="metacritic"
                                    label="Metacritic"
                                    value={formik.values.metacritic}
                                    onChange={formik.handleChange}
                                    error={formik.touched.metacritic && Boolean(formik.errors.metacritic)}
                                    helperText={formik.touched.metacritic && formik.errors.metacritic}
                                />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <TextField
                                    fullWidth
                                    id="rottenTomatoes"
                                    name="rottenTomatoes"
                                    label="Rotten Tomatoes"
                                    value={formik.values.rottenTomatoes}
                                    onChange={formik.handleChange}
                                    error={formik.touched.rottenTomatoes && Boolean(formik.errors.rottenTomatoes)}
                                    helperText={formik.touched.rottenTomatoes && formik.errors.rottenTomatoes}
                                />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <TextField
                                    fullWidth
                                    id="rottenTomatoesAudience"
                                    name="rottenTomatoesAudience"
                                    label="Rotten Tomatoes Audience"
                                    value={formik.values.rottenTomatoesAudience}
                                    onChange={formik.handleChange}
                                    error={formik.touched.rottenTomatoesAudience && Boolean(formik.errors.rottenTomatoesAudience)}
                                    helperText={formik.touched.rottenTomatoesAudience && formik.errors.rottenTomatoesAudience}
                                />
                            </Grid>

                        </Grid>
                    </CardContent>
                    <Divider/>
                    <CardContent>
                        <Stack direction="row" spacing={1}>
                            {genres.map((genre, index) => (
                                <Chip
                                    key={index}
                                    color="primary"
                                    label={genre.name}
                                    size="large"
                                    onDelete={() => handleDeleteGenre(index)}
                                />
                            ))}

                        </Stack>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                pt: 2
                            }}
                        >

                            <AddGenre movie={product} genres={genres} setgenres={setGenres}/>
                        </Box>
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Grid container item xs={6} md={12}  spacing={1}>
                            {cast.map((person, index) => (
                                <Chip
                                    avatar={<Avatar alt={person.name} src={person.photo} />}
                                    key={index}
                                    color="primary"
                                    label={person.name}
                                    size="large"
                                    onDelete={() => handleDeleteCast(index)}
                                    style={{ margin: '0.5rem' }}
                                />
                            ))}
                        </Grid>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                pt: 2
                            }}
                        >
                            <AddCast movie={product} cast={cast} setcast={setCast}/>
                        </Box>
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
                            disabled={loading}
                        >
                            Save details
                        </Button>
                    </Box>
                </Card>
            </form>
        </>
    );
};
