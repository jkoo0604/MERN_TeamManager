import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper, Button } from '@material-ui/core';

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
    button0: {
        margin: theme.spacing(1),
        color: 'white',
        backgroundColor: '#0097a7'
    },
    button1: {
        margin: theme.spacing(1),
        color: 'white',
        backgroundColor: '#e57373'
    },
    button2: {
        margin: theme.spacing(1),
        color: 'white',
        backgroundColor: '#fdd835'
    },
    inactive: {
        margin: theme.spacing(1),
        color: '#455a64',
        borderColor: '#455a64'
    },
    cell: {
        paddingLeft: 100,
    },
    font: {
        fontWeight: 600,
        fontSize: 15,
    }
}));

const Game = props=> {
    const classes=useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [players, setPlayers] = useState([]);
    const { gameId } = props;
    const statusOptions = ['Playing','Not Playing','Undecided'];

    useEffect(() => {
        axios.get('http://localhost:8000/api/players')
            .then(res=>{
                // console.log(res.data.players)
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

    const onStatusChange = (player, id, status) => {
        // console.log(player);
        var tempPlayer = {...player};
        tempPlayer.status[gameId-1] = status;
        // console.log('updated', tempPlayer);
        axios.put('http://localhost:8000/api/players/update/' + tempPlayer._id, {
            'name': tempPlayer.name,
            'position': tempPlayer.position,
            'status': tempPlayer.status
        })
        .then(res=>{
            // console.log([...players.filter(player=>player._id !== tempPlayer._id), tempPlayer]);
            setPlayers([...players.slice(0,id), tempPlayer, ...players.slice(id+1)]);
            // setPlayers([...players.filter(player=>player._id !== tempPlayer._id), tempPlayer]);
        })
        .catch(err=>console.log(err));

    }

    return(
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className={classes.font}>Player</TableCell>
                            <TableCell align="center" className={classes.font}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {players.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowId) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={rowId}>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">
                                    {
                                        statusOptions.map((item, idx) => (
                                            <Button key={idx} variant={row.status[gameId-1] === item ? "contained" : "outlined"} size="small" className={row.status[gameId-1] === item ? classes[`button${idx}`] : classes.inactive} onClick={() => onStatusChange(row, rowId, item)}>{item}</Button>
                                        ))
                                    }
                                    
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination rowsPerPageOptions={[10, 20, 40]} component="div" count={players.length} rowsPerPage={rowsPerPage} page={page} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage}/>
        </Paper>
    )
}

export default Game;