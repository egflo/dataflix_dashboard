import * as React from 'react';

import {
    Box,
    Button,
    FormGroup,
    FormControlLabel,
    Checkbox,
    FormHelperText,
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
    CircularProgress,
    Protal,
} from '@mui/material';
import {useGetGenre} from '../../service/service';
import {useEffect} from "react";


export default function GenreForm(props) {
    const {genres, setgenres, open, setopen, ...rest} = props;
    const [list, setList] = React.useState([]);
    const {data, error} = useGetGenre("all?limit=30");

    useEffect(() => {
        if(data) {
            const content = data.content;
            for(let i = 0; i < content.length; i++) {
                const id = content[i].id;
                const checked = genres.some(genre => genre.id === id);
                const name = content[i].name;
                const item = {id, name, checked};

                if(list.includes(item) === false) {
                    setList(prevList => [...prevList, item]);
                }

            }
            //setList([...data.content]);
        }
    }, [data]);

    const handleChange = (index) => {
        setList(list => {
            const newList = [...list];
            newList[index-1].checked = !newList[index-1].checked;
            return newList;
        });

    };

    function submit() {
        const genres = list.filter(item => item.checked === true).map(item => ({id: item.id, name: item.name}));
        const data = JSON.stringify(genres);
        setgenres(genres);
        setopen(false);
    }

    return (
        <Box sx={{ display: 'flex', color:'black'}}>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel component="legend">Assign Genres</FormLabel>
                <CardContent>
                    {list.map((item, index) => (
                        <FormControlLabel
                            key={index}
                            control={
                                <Checkbox
                                    onChange={() => handleChange(item.id)}
                                    name="genre"
                                    color="primary"
                                    checked={item.checked}
                                    disabled={props.genres.some(genre => genre.id === item.id)}
                                />
                            }
                            label={item.name}
                        />
                    ))}
                </CardContent>
                <FormHelperText>Confirm your selection before saving.</FormHelperText>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => submit()}
                    disabled={false}
                >
                    Save details
                </Button>
            </FormControl>
        </Box>
    );
}