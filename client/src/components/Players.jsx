import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 700,
        flexGrow: 1,
        margin: 'auto',
        marginTop: 20,
        padding: theme.spacing(1, 4),
    },
    container: {
        maxHeight: 700,
    },
    button: {
        margin: theme.spacing(1),
        color: '#b0bec5',
        borderColor: '#b0bec5'
    },
    customButton: {
        margin: theme.spacing(1),
        backgroundColor: '#ffd54f',
    },
    createButton: {
        margin: theme.spacing(1),
        backgroundColor: '#4dd0e1',
        color: 'white'
    },
    cell: {
        paddingLeft: 100,
    },
    font: {
        fontWeight: 600,
        fontSize: 15,
    }
}));

const Players = () => {
    const classes=useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);
    const [players, setPlayers] = useState([]);
    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/players')
            .then(res=>{
                setPlayers(res.data.players);
            })
    }, []);

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = e => {
        setRowsPerPage(+e.target.value);
        setPage(0);
    };

    const handleClickOpen = (id) => {
        setDeleteId(id);
        setOpen(true);
    };

    const handleClose = (confirm) => {
        setOpen(false);
        if (!confirm) {
            setDeleteId('');
        } else {
            handleDelete(deleteId);
        }
    };

    const handleDelete = id => {
        axios.delete('http://localhost:8000/api/players/delete/' + id)
            .then(res=>{
                setPlayers(players.filter(player=>player._id !== id))
            })
    }

    return(
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className={classes.font}>Player</TableCell>
                            <TableCell align="center" className={classes.font}>Preferred Position</TableCell>
                            <TableCell align="center" className={classes.font}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {players.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.position}</TableCell>
                                <TableCell align="center">
                                    <Button variant="outlined" size="small" color="secondary" className={classes.button} startIcon={<DeleteIcon/>} onClick={() => handleClickOpen(row._id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination rowsPerPageOptions={[10, 20, 40]} component="div" count={players.length} rowsPerPage={rowsPerPage} page={page} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage}/>
            <Dialog
                open={open}
                onClose={()=>handleClose(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">Are you sure you want to delete this player?</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    If you click on Delete, this player will be removed from the team.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>handleClose(false)} color="secondary" autoFocus>
                    Cancel
                </Button>
                <Button onClick={()=>handleClose(true)} color="primary">
                    Delete
                </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    )
}

export default Players;