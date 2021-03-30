import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AddressTable from './addressTable';
import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import API from '../../config/api';

const useStyles = makeStyles((theme) => ({
    button: {
        height: '100%',
        width: '25%',
    },
    divider: {
        marginTop: 25,
        marginBottom: 25
    }
}));


function HdWallet({ showSnackbar, network }) {
    const classes = useStyles();

    const [mnemonic, setMnemonic] = React.useState('');
    const [passphrase, setPassphrase] = React.useState('');
    const [account, setAccount] = useState(0);
    const [external, setExternal] = useState(0);
    const [index, setIndex] = useState(0);
    const [path, setPath] = useState(`m/84'/${network}'/${account}'/${external}/${index}`);
    const [error, setError] = useState('');

    const [addresses, setAddresses] = React.useState([]);
    const [limit, setLimit] = React.useState(10);

    useEffect(() => {
        setPath(`m/84'/${network}'/${account}'/${external}/${index}`);
    }, [network, account, external, index])

    useEffect(() => {

        validateMnemonic();

    }, [mnemonic])

    const validateMnemonic = () => {
        if (mnemonic === "" || mnemonic === undefined || mnemonic === null) {
            setError('This field is required.')
        }
        else {
            setError('')
        }
    }

    const handleGenerate = async (path, page = 0, moreFlag = false) => {

        try {
            const response = await API.post(`/generate/wallet/addresses/${network}/${limit}/${page}`, {
                mnemonic,
                passphrase,
                path
            })


            moreFlag === true ? setAddresses([...addresses, ...response.data]) : setAddresses(response.data);
        }
        catch (error) {
            showSnackbar({ vertical: 'top', horizontal: 'right', message: error.response.data });
        }

    }

    return (
        <React.Fragment >
            <Typography variant="h4" gutterBottom>
                MNEMONIC
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={7}>
                    <TextField
                        error={error.length === 0 ? false : true}
                        helperText={error}
                        required
                        id="words"
                        name="words"
                        label="Mnemonic Words"
                        fullWidth
                        variant="outlined"
                        value={mnemonic}
                        onChange={(event) => {
                            setMnemonic(event.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={7}>
                    <TextField
                        id="passphrase"
                        name="passphrase"
                        label="Passphrase (optional)"
                        fullWidth
                        variant="outlined"
                        value={passphrase}
                        onChange={(event) => setPassphrase(event.target.value)}
                    />
                </Grid>
                {/* <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Use this address for payment details"
                    />
                </Grid> */}
            </Grid>

            <Typography variant="h4" gutterBottom style={{ marginTop: 25 }}>
                DERIVATION PATH
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <TextField
                        id="purpose"
                        name="purpose"
                        label="Purpose"
                        fullWidth
                        disabled
                        variant="outlined"
                        defaultValue={84}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        id="network"
                        name="network"
                        label="Coin Type"
                        fullWidth
                        disabled
                        variant="outlined"
                        value={network}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        id="account"
                        name="account"
                        label="Account"
                        fullWidth
                        variant="outlined"
                        value={account}
                        type="number"
                        onChange={(event) => setAccount(event.target.value)}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        id="external"
                        name="external"
                        label="External / Internal"
                        fullWidth
                        variant="outlined"
                        value={external}
                        type="number"
                        onChange={(event) => setExternal(event.target.value)}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        id="index"
                        name="index"
                        label="Index"
                        fullWidth
                        variant="outlined"
                        value={index}
                        type="number"
                        onChange={(event) => setIndex(event.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="path"
                        name="path"
                        label="Derivation Path"
                        fullWidth
                        disabled
                        variant="outlined"
                        value={path}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Button color="primary" size="large" disabled={mnemonic === "" ? true : false} variant="contained" className={classes.button} onClick={() => handleGenerate(path)}>Generate</Button>
                </Grid>
            </Grid>

            <Divider className={classes.divider} />

            <AddressTable
                addresses={addresses}
                handleGenerate={handleGenerate}
                limit={limit}
            />
        </React.Fragment>
    );
}

export default HdWallet;