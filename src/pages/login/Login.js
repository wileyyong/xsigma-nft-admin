import React, { useState, useEffect } from "react";
import {
  Grid,
  CircularProgress,
  Tabs,
  Tab,
  Fade,
  TextField as Input
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.png";
import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser, registerUser, sendPasswordResetEmail } from "../../context/UserContext";
import { receiveToken, doInit } from "../../context/UserContext";

//components
import { Button, Typography } from "../../components/Wrappers";
import Widget from "../../components/Widget";
import config from "../../config";

const getGreeting = () => {
  const d = new Date();
  if (d.getHours() >= 4 && d.getHours() <= 12) {
    return "Good Morning";
  } else if (d.getHours() >= 13 && d.getHours() <= 16) {
    return "Good Day";
  } else if (d.getHours() >= 17 && d.getHours() <= 23) {
    return "Good Evening";
  } else {
    return "Good Night";
  }
};

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const token = params.get("token");
    if (token) {
      receiveToken(token, userDispatch);
      doInit()(userDispatch);
    }
  }, []); // eslint-disable-line
  

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("admin@flatlogic.com");
  var [passwordValue, setPasswordValue] = useState("password");
  var [forgotEmail, setForgotEmail] = useState("");
  var [isForgot, setIsForgot] = useState(false);

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>XSigma Admin</Typography>
      </div>
      <div className={!isForgot ? classes.formContainer : classes.customFormContainer}>
        <div className={classes.form}>
          {isForgot ? (
            <div>
            <Input
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.InputUnderline,
                    input: classes.Input
                  }
                }}
                value={forgotEmail}
                onChange={e => setForgotEmail(e.target.value)}
                margin="normal"
                placeholder="Email"
                type="Email"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      forgotEmail.length === 0
                    }
                    onClick={() =>
                      sendPasswordResetEmail(
                        forgotEmail,
                      )(userDispatch)
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Send
                  </Button>
                )}
                <Button
                  color="primary"
                  size="large"
                  onClick={() => setIsForgot(!isForgot)}
                  className={classes.forgetButton}
                >
                  Back to login
                </Button>
              </div>
            </div>
          ) : (
            <>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
            {/* <Tab label="New User" classes={{ root: classes.tab }} /> */}
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              {config.isBackend ? (
                <Widget
                  disableWidgetMenu
                  inheritHeight
                  style={{ marginTop: 32 }}
                >
                  <Typography
                    variant={"body2"}
                    block
                    style={{ textAlign: "center" }}
                  >
                    This is a real app with Node.js backend - use
                    <Typography variant={"body2"} weight={"bold"}>
                      "admin@flatlogic.com / password"
                    </Typography>{" "}
                    to login!
                  </Typography>
                </Widget>
              ) : null}
              <Typography variant="h1" className={classes.greeting}>
                {getGreeting()}, User
              </Typography>
              {/* <Button
                size="large"
                className={classes.googleButton}
                onClick={() =>
                  loginUser(
                    userDispatch,
                    loginValue,
                    passwordValue,
                    props.history,
                    setIsLoading,
                    setError,
                    "google"
                  )
                }
              >
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div> */}
              <Fade
                in={error}
                style={
                  !error ? { display: "none" } : { display: "inline-block" }
                }
              >
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <Input
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.InputUnderline,
                    input: classes.Input
                  }
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <Input
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.InputUnderline,
                    input: classes.Input
                  }
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0
                    }
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError
                      )
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Login
                  </Button>
                )}
                <Button
                  color="primary"
                  size="large"
                  onClick={() => setIsForgot(!isForgot)}
                  className={classes.forgetButton}
                >
                  Forgot Password?
                </Button>
              </div>
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Welcome!
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Create your account
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <Input
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.InputUnderline,
                    input: classes.Input
                  }
                }}
                value={nameValue}
                onChange={e => setNameValue(e.target.value)}
                margin="normal"
                placeholder="Full Name"
                type="email"
                fullWidth
              />
              <Input
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.InputUnderline,
                    input: classes.Input
                  }
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <Input
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.InputUnderline,
                    input: classes.Input
                  }
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() =>
                      registerUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError
                      )()
                    }
                    disabled={
                      loginValue.length === 0 ||
                      passwordValue.length === 0 ||
                      nameValue.length === 0
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Create your account
                  </Button>
                )}
              </div>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div>
              <Button
                size="large"
                className={classnames(
                  classes.googleButton,
                  classes.googleButtonCreating
                )}
                onClick={() =>
                  loginUser(
                    userDispatch,
                    loginValue,
                    passwordValue,
                    props.history,
                    setIsLoading,
                    setError,
                    "google"
                  )
                }
              >
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button>
            </React.Fragment>
          )}
          </>
        )}
        </div>
        <Typography color="primary" className={classes.copyright}>
          @ Copyright {new Date().getFullYear()} xSigma Corporation, a subsidiary of ZK International Group Co., Ltd.
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
