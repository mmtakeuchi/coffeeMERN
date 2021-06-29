import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme) => ({
  footer: {
    display: "flex",
    marginTop: "auto",
    padding: "10px",
    textAlign: "center",
    color: "black",
    borderTop: "1px solid black",
    width: "100%",
  },
  copy: {
    textAlign: "left",
    alignItems: "center",
    flex: "50%",
  },
  link: {
    flex: "50%",
    textAlign: "right",
    textDecoration: "none",
    color: "blue",
  },
}));
// margin-top: auto;
const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <div className={classes.copy}>&copy; Coffee Shop 2020</div>

      <a
        href="https://github.com/mmtakeuchi/coffee_shop"
        target="_blank"
        className={classes.link}
      >
        <GitHubIcon fontSize="small" />
      </a>
    </div>
  );
};

export default Footer;
