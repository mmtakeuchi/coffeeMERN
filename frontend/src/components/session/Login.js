import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../actions/sessionActions";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    padding: theme.spacing(2),
  },
  inputField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "65%",
  },
  errors: {
    color: "red",
    fontSize: "18px",
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
  });

  const session = useSelector((state) => state.session);
  const { user, errors } = session;

  useEffect(() => {
    if (user && Object.keys(user).length !== 0) {
      history.push("/products");
    }
  }, [history, user]);

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    let isValid = true;

    let emailError = "";
    let passwordError = "";
    let email = values.email;
    let password = values.password;

    if (!values.email) {
      emailError = "Email can't be empty.";
    }

    if (!values.password) {
      passwordError = "Password can't be empty.";
    }

    if (emailError || passwordError) {
      setValues({
        email,
        password,
        emailError,
        passwordError,
      });
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      dispatch(
        login({
          email: values.email,
          password: values.password,
        })
      );

      setValues({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className={classes.root}>
      <h2>Sign In</h2>

      {errors && <div className={classes.errors}>{errors}</div>}

      <form
        onSubmit={handleSubmit}
        className={classes.form}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl
              className={classes.inputField}
              error={values.emailError ? true : false}
            >
              <TextField
                label="Email"
                error={values.emailError ? true : null}
                name="email"
                aria-describedby="my-helper-text"
                value={values.email}
                onChange={handleInputChange}
              />

              <FormHelperText id="my-helper-text">
                {values.emailError ? (
                  <div className="error">{values.emailError}</div>
                ) : null}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl
              className={classes.inputField}
              error={values.passwordError ? true : null}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                error={values.passwordError ? true : null}
                name="password"
                type="password"
                aria-describedby="my-helper-text"
                value={values.password}
                onChange={handleInputChange}
              />
              <FormHelperText id="my-helper-text">
                {values.passwordError ? (
                  <div className="error">{values.passwordError}</div>
                ) : null}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="outlined"
              type="submit"
              color="primary"
              // className={classes.button}
              startIcon={<AddCircleOutlineIcon />}
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Login;
