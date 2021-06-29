import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  content: {
    textDecoration: "none",
    color: "black",
  },
});

const Product = ({ product }) => {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <Link to={`/products/${product._id}`} className={classes.content}>
            <CardMedia
              className={classes.media}
              image={product.image}
              title="Contemplative Reptile"
            />

            <CardContent className={classes.content}>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className={classes.content}
              >
                {product.title}
              </Typography>
              <Typography variant="body1" component="p">
                Type: {product.category.toUpperCase()}
              </Typography>
            </CardContent>
          </Link>
        </CardActionArea>
        <CardActions>
          <Typography variant="body1" color="textSecondary" component="p">
            ${product.price}
          </Typography>
        </CardActions>
      </Card>
    </div>
  );
};

export default Product;
