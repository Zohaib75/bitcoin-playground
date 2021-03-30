import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import API from '../../config/api';

function MultiSig({ showSnackbar, network }) {

    const [address, setAddress] = useState('');
    const [pubkeys, setPubkeys] = useState([]);
    const [signatures, setSignatures] = useState(0);
    const [signatureError, setSignatureError] = useState('');

    const handleAdd = () => {
        setPubkeys([...pubkeys, { value: '', error: 'This field cannot be empty' }]);
    }



    useEffect(() => {

        validateSignatureCount();

    }, [signatures, pubkeys])

    const validateSignatureCount = () => {
        if (signatures > pubkeys.length)
            setSignatureError('Pubkey count cannot be less than m');
        else if (signatures === 0)
            setSignatureError('M cannot be 0');
        else if (signatureError.length > 0)
            setSignatureError('');
    }

    const handleGenerateAddress = async () => {
        try {
            const response = await API.post(`/generate/multisig/address/${network}`, {
                pubkeys: pubkeys.map(pubkey => pubkey.value),
                m: signatures
            })

            setAddress(response.data.p2sh);
        }
        catch (error) {
            showSnackbar({ vertical: 'top', horizontal: 'right', message: error.response.data });
        }
    }

    return (
        <React.Fragment>

            <Typography variant="h4" gutterBottom>
                P2SH MULTI-SIG ADDRESS
            </Typography>
            <Grid container spacing={3} style={{ borderBottom: '1px solid gray', marginBottom: 25 }}>
                <Grid item xs={7} style={{ border: '1px solid gray' }}>
                    {
                        pubkeys.map(({ error, value }, index) => <div key={index}>
                            <TextField
                                error={error.length === 0 ? false : true}
                                helperText={error}
                                required
                                id="pubkeys"
                                name="pubkeys"
                                label={`Public Key ${index + 1}`}
                                onChange={(event) => {
                                    let newPubkeys = [...pubkeys];
                                    newPubkeys[index].error = event.target.value === '' ? 'This field cannot be empty' : ''
                                    newPubkeys[index].value = event.target.value;
                                    setPubkeys(newPubkeys);
                                }}
                                value={value}
                                variant="outlined"
                                style={{ paddingBottom: 15, width: '90%' }}
                            />
                            <IconButton aria-label="delete" onClick={(e) => {
                                let newPubkeys = [...pubkeys];
                                newPubkeys.splice(index, 1);
                                setPubkeys(newPubkeys);
                            }} >
                                <DeleteIcon fontSize="large" />
                            </IconButton>
                        </div>
                        )
                    }

                    <Button style={{ float: 'right' }} color="primary" variant="contained" onClick={handleAdd} >Add Public Key</Button>
                </Grid>
                <Grid item xs={7}>
                    <TextField
                        id="n"
                        name="n"
                        label="Public Keys (N)"
                        fullWidth
                        variant="outlined"
                        type="number"
                        value={pubkeys.length}
                        disabled
                    />
                </Grid>
                <Grid item xs={7}>
                    <TextField
                        error={signatureError.length === 0 ? false : true}
                        helperText={signatureError}
                        id="m"
                        name="m"
                        label="Signatures (M)"
                        fullWidth
                        variant="outlined"
                        type="number"
                        style={{ paddingBottom: 15 }}
                        value={signatures}
                        onChange={(event) => setSignatures(Number(event.target.value))}
                    />
                    <Button
                        style={{ float: 'right' }}
                        disabled={(signatureError.length === 0 && pubkeys.length > 0 && pubkeys.every(pubkey => pubkey.error === '')) ? false : true}
                        color="primary"
                        variant="contained"
                        onClick={handleGenerateAddress}>GENERATE ADDRESS</Button>

                </Grid>
            </Grid>

            {
                address !== '' ? <Typography variant="h4" gutterBottom>
                    {`Address: ${address}`}
                </Typography> : null

            }
        </React.Fragment>
    );
}

export default MultiSig;