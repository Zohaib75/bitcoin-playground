import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';

import HdWallet from './components/hd-wallet/index'
import MultiSig from './components/multi-sig/index'
const networks = [
  {
    value: 0,
    label: 'BTC - Bitcoin'
  },
  {
    value: 1,
    label: 'BTC - Bitcoin Testnet',
  }
];
const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  }
}));

function App() {
  const classes = useStyles();
  const [network, setNetwork] = useState(0);

  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    message: ''
  });
  const { vertical, horizontal, open, message } = snackbar;


  const showSnackbar = (newSnackbar) => {
    setSnackbar({ open: true, ...newSnackbar });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <React.Fragment>
            <CssBaseline />
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
              <Toolbar className={classes.toolbar}>
                <Typography variant="h4" color="primary" noWrap className={classes.toolbarTitle}>
                  Bitcoin Playground
              </Typography>
                <Button color="primary" href="/" variant="outlined" className={classes.link}>
                  HD-Wallet
              </Button>
                <Button color="primary" href="/multisig" variant="outlined" className={classes.link}>
                  Multi-sig
              </Button>
                <TextField
                  id="networkId"
                  select
                  value={network}
                  onChange={(event) => setNetwork(event.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {networks.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Toolbar>
            </AppBar>

            <div style={{ margin: 25 }}>
              <Switch>
                <Route exact path="/">
                  <HdWallet showSnackbar={showSnackbar} network={network} />
                </Route>
                <Route path="/multisig">
                  <MultiSig showSnackbar={showSnackbar} network={network} />
                </Route>
              </Switch>
            </div>

            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={handleClose}
              autoHideDuration={1000}
              message={message}
              key={vertical + horizontal}
            />
          </React.Fragment>
        </header>
      </div>
    </Router>
  );
}

export default App;