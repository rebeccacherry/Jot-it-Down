
import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const shop = () =>{
  const dispatch = useDispatch()
  const {id} = useParams();
  const { shops } = useSelector(state => state);
  const [expanded, setExpanded] = useState(false);
  if (!shops){return null}

  const shop = shops.find(d => d.id===id)
  if (!shop){return null}

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const clickToCart = () => {
    dispatch(addToCart(shop))
  }

  return (
    <div id="productDiv" >
    <div id="productDivLeft">
    <Card sx={{ maxWidth: 345 }}>
    <CardMedia
        component="img"
        height="345"
        image={ shop.imageUrl }
        alt={ shop.name }
      />
    </Card>
     </div>

    <div id="productDivright">
     <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={ shop.name }
        subheader= {'Size: ' + shop.size + ' Price: ' + shop.price}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Other info about the shop...
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <CardActions>
         <Button size="small" onClick={()=> clickToCart()}>Add To Order</Button>
        </CardActions>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            { shop.description }
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    </div>
    </div>
  )
}

export default shop