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

const products = [
  {
    id: uuid(),
    name: 'Dropbox',
    imageUrl: '/static/images/products/product_1.png',
    updatedAt: subHours(Date.now(), 2)
  },
  {
    id: uuid(),
    name: 'Medium Corporation',
    imageUrl: '/static/images/products/product_2.png',
    updatedAt: subHours(Date.now(), 2)
  },
  {
    id: uuid(),
    name: 'Slack',
    imageUrl: '/static/images/products/product_3.png',
    updatedAt: subHours(Date.now(), 3)
  },
  {
    id: uuid(),
    name: 'Lyft',
    imageUrl: '/static/images/products/product_4.png',
    updatedAt: subHours(Date.now(), 5)
  },
  {
    id: uuid(),
    name: 'GitHub',
    imageUrl: '/static/images/products/product_5.png',
    updatedAt: subHours(Date.now(), 9)
  }
];

export function LatestProducts({...props}) {

    const { data, error } = useGetMovies("all?sortBy=year&limit=6");

    if (error) return(
        <>
            <h1>Something went wrong</h1>
        </>
    );

    if (!data) return(
        <>
            <h1>Loading...</h1>
        </>
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
                        divider={i < products.length - 1}
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






