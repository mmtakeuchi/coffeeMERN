import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../actions/sessionActions";
import { getCart } from "../actions/cartActions";
import { fade, makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import LocalCafeTwoToneIcon from "@material-ui/icons/LocalCafeTwoTone";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    width: "100%",
  },
  grow: {
    marginBottom: "5px",
    width: "100%",
  },
  menuButton: {
    color: "black",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
    width: "30%",
    color: "teal",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    color: "black",
  },
  links: {
    textDecoration: "none",
    color: "black",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
    color: "blue",
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    color: "black",
  },
}));

const Navbar = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (props.current.isAuthenticated) {
      dispatch(getCart(props.current.user.id));
    }
  }, [props.current.user]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    props.logout();
    history.push("/");
  };

  const authenticatedLinks = () => {
    if (props.current.isAuthenticated) {
      return (
        <React.Fragment>
          <Button onClick={handleMobileMenuClose}>
            <Link to="/orders" className={classes.links}>
              Orders
            </Link>
          </Button>
          <Button onClick={handleLogout}>Logout</Button>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Button>
            <Link to="/signup" className={classes.links}>
              Signup
            </Link>
          </Button>

          <Button>
            <Link to="/login" className={classes.links}>
              Login
            </Link>
          </Button>
        </React.Fragment>
      );
    }
  };

  const goToCart = (e) => {
    history.push(`/cart`);
  };

  const cartProducts = () => {
    if (props.cart) {
      return props.cart.products.reduce((total, el) => total + el.quantity, 0);
    } else {
      return null;
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Button onClick={handleMobileMenuClose}>
          <Link to="/products" className={classes.links}>
            Shop
          </Link>
        </Button>
      </MenuItem>
      {props.current.isAuthenticated ? (
        <div>
          <MenuItem>
            <Button onClick={handleMobileMenuClose}>
              <Link to="/orders" className={classes.links}>
                Orders
              </Link>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button onClick={handleLogout}>Logout</Button>
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem>
            <Button onClick={handleMobileMenuClose}>
              <Link to="/signup" className={classes.links}>
                Signup
              </Link>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button onClick={handleMobileMenuClose}>
              <Link to="/login" className={classes.links}>
                Login
              </Link>
            </Button>
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.root} elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => history.push("/")}
          >
            <LocalCafeTwoToneIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6">
            Coffee Shop
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button>
              <Link to="/products" className={classes.links}>
                Shop
              </Link>
            </Button>
            {authenticatedLinks()}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={goToCart}
            >
              <Badge badgeContent={cartProducts()} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={() => history.push(`/cart`)}
            >
              <Badge badgeContent={cartProducts()} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

const mapStateToProps = (state) => ({
  current: state.session,
  cart: state.cart.cart,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  getCart: (userId) => dispatch(getCart(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
