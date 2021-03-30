import React from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        marginBottom: 25
    }
}));
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function AddressTable(props) {
    const classes = useStyles();

    const { addresses, handleGenerate, limit } = props;

    return (
        <React.Fragment>

            <Typography variant="h4" gutterBottom>
                DERIVED ADDRESSES
            </Typography>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Path</StyledTableCell>
                            <StyledTableCell>Address</StyledTableCell>
                            <StyledTableCell>Public Key</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {addresses.map((address) => (
                            <StyledTableRow key={address.path}>
                                <StyledTableCell component="th" scope="row">
                                    {address.path}
                                </StyledTableCell>
                                <StyledTableCell >{address.address}</StyledTableCell>
                                <StyledTableCell >{address.pubkey}</StyledTableCell>

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button color="primary" disabled={addresses.length === 0 ? true : false} variant="contained" onClick={() => handleGenerate(addresses[0].path, addresses.length / limit, true)}>Generate More</Button>
        </React.Fragment >
    )
}

export default AddressTable;