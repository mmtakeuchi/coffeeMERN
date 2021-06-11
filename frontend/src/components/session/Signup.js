import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signup } from "../../actions/sessionActions";
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

const Signup = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    nameError: "",
    emailError: "",
    passwordError: "",
    passwordConfirmationError: "",
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
    let nameError = "";
    let emailError = "";
    let passwordError = "";
    let passwordConfirmationError = "";
    let name = values.name;
    let email = values.email;
    let password = values.password;
    let passwordConfirmation = values.passwordConfirmation;

    if (!values.name) {
      nameError = "Name can't be empty.";
    }

    if (!values.email) {
      emailError = "Email can't be empty.";
    }

    if (!values.password) {
      passwordError = "Password can't be empty.";
    }

    if (!values.passwordConfirmation) {
      passwordConfirmationError = "Password Confirmation can't be empty.";
    }

    if (values.password !== values.passwordConfirmation) {
      passwordError = "Passwords do not match.";
      passwordConfirmationError = "Passwords do not match.";
    }

    if (nameError || emailError || passwordError || passwordConfirmationError) {
      setValues({
        name,
        email,
        password,
        passwordConfirmation,
        nameError,
        emailError,
        passwordError,
        passwordConfirmationError,
      });
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      dispatch(
        signup({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      );

      setValues({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      });
    }
  };

  return (
    <div className={classes.root}>
      <h2>Create an Account</h2>

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
              error={values.nameError ? true : false}
            >
              <TextField
                label="Name"
                error={values.nameError ? true : null}
                name="name"
                aria-describedby="my-helper-text"
                value={values.name}
                onChange={handleInputChange}
              />

              <FormHelperText id="my-helper-text">
                {values.nameError ? (
                  <div className="error">{values.nameError}</div>
                ) : null}
              </FormHelperText>
            </FormControl>
          </Grid>

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
            <FormControl
              className={classes.inputField}
              error={values.passwordConfirmationError ? true : null}
            >
              <InputLabel htmlFor="passwordConfirmation">
                Password Confirmation
              </InputLabel>
              <Input
                error={values.passwordConfirmationError ? true : null}
                name="passwordConfirmation"
                type="password"
                aria-describedby="my-helper-text"
                value={values.passwordConfirmation}
                onChange={handleInputChange}
              />
              <FormHelperText id="my-helper-text">
                {values.passwordConfirmationError ? (
                  <div className="error">
                    {values.passwordConfirmationError}
                  </div>
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
              Create Account
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Signup;
