import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../actions/sessionActions";
import { getCart } from "../actions/cartActions";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import LocalCafeTwoToneIcon from "@material-ui/icons/LocalCafeTwoTone";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
  },
  grow: {
    flexGrow: 1,
    marginBottom: "5px",
  },
  menuButton: {
    color: "black",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    color: "teal",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.light, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.light, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "blue",
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
  console.log(props);
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => dispatch(getCart(props.current.user.id)), []);

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

  const authenticatedLinks = () => {
    if (props.current.isAuthenticated) {
      return <Button onClick={() => props.logout()}>Logout</Button>;
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
        <MenuItem>
          <Button onClick={() => props.logout()}>Logout</Button>
        </MenuItem>
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
          <Typography className={classes.title} variant="h6" noWrap>
            Coffee Shop
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
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
              // onClick={
              //   props.current.isAuthenticated ? goToCart : handleProfileMenuOpen
              // }
              // color="inherit"
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
              // color="inherit"
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
