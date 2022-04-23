import { formatDistanceToNow, subHours } from 'date-fns';
import { v4 as uuid } from 'uuid';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useGetMovies} from "/src/service/service";
import CircularProgress from '@mui/material/CircularProgress';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


export function LatestProducts({...props}) {

    const { data, error } = useGetMovies("all?sortBy=year&limit=6");

    if (!data || error)
        return(
            <Card sx={{ height:'100%'}} {...props}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100%"
                >
                    {!data ? <CircularProgress /> : <ErrorOutlineIcon style={{color:'gray', fontSize:'50px'}}/>}
                </Box>
            </Card>
        );

    const {content, totalElements} = data;
    return (
        <Card {...props}>
            <CardHeader
                subtitle={`${content.length} in total`}
                title="Latest Products"
            />
            <Divider />
            <List>
                {content.map((product, i) => (
                    <ListItem
                        divider={i < content.length - 1}
                        key={product.id}
                    >
                        <ListItemAvatar>
                            <img
                                alt={product.title}
                                src={product.poster == null || product.poster.length < 2 ? "/static/images/products/no_image.jpg" : product.poster}
                                style={{
                                    height: 70,
                                    width: 50,
                                    borderRadius: 5
                                }}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={product.title + " (" + product.year + ")"}
                            secondary={`Updated ${formatDistanceToNow(product.updated)}`}
                        />
                        <IconButton
                            edge="end"
                            size="small"
                        >
                            <MoreVertIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
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
                    endIcon={<ArrowRightIcon />}
                    size="small"
                    variant="text"
                    href="/products"
                >
                    View all
                </Button>
            </Box>
        </Card>
    );
}






