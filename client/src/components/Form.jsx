import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Paper, Grid, InputLabel, FormHelperText, FormControl, NativeSelect } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { navigate } from '@reach/router';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
        '& > *': {
            margin: theme.spacing(1),
        },
        width: 400,
        flexGrow: 1,
        margin: 'auto',
        marginTop: 20,
        padding: theme.spacing(1, 4, 4, 4),
        elevation: 1,
    },
    paper: {
        padding: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    container: {
        margin: 0,
    },
    customButton: {
        margin: 10,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
    selectEmpty: {
    marginTop: theme.spacing(2),
    },
}));

const Form = props => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [err, setErr] = useState({});
    const positionOptions = ['', 'Goalkeeper', 'Forward', 'Defender', 'Midfielder'];

    const submitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/players/new', {name, position, status: ['Undecided', 'Undecided', 'Undecided']})
            .then(res=>{
                navigate('/');
            })
            .catch(err=>{
                console.log(err.response.data);
                const errorResponse = err.response.data;
                const errObj = {};
                for (const key of Object.keys(errorResponse)) {
                    errObj[key] = errorResponse[key].properties.message;
                }
                setErr(errObj);
            })
    }

    const onNameChange = e => {
        setName(e.target.value);
        if (name.length < 2 ) {
            setErr({...err, name: 'Player name must be at least 2 characters in length'})
        } else {
            let tempObj = {...err};
            delete tempObj.name;
            setErr(tempObj);
        }
    }

    const onPositionChange = e => {
        setPosition(e.target.value);
        if (!positionOptions.includes(position) ) {
            setErr({...err, position: 'Preferred position is optional, but must be a valid position (if entered)'})
        } else {
            let tempObj = {...err};
            delete tempObj.position;
            setErr(tempObj);
        }
    }

    return(
        <Paper className={classes.root}>
            <Grid container justify="center" className={classes.container}>
                <Grid item xs={12}>
                    <h2>Add Player</h2>
                </Grid>
            </Grid>
            <Grid container justify="center" className={classes.container}>
                <Grid item xs={12}>
                    <form onSubmit={submitHandler}>
                        <TextField required error={err['name'] ? true : false} label="Name" helperText={err['name'] || ' '} onChange={onNameChange} value={name}/>
                        <FormControl className={classes.formControl} error={err['position'] ? true : false}>
                            <InputLabel htmlFor="age-native-helper">Preferred Position</InputLabel>
                            <NativeSelect
                            value={position}
                            onChange={onPositionChange}
                            >
                                {
                                    positionOptions.map((option, idx) => (<option value={option} key={idx}>{option}</option>))
                                }
                            </NativeSelect>
                            <FormHelperText>{err['position'] ? err['position'] : 'This field is optional'}</FormHelperText>
                        </FormControl>
                        <Grid item xs={12}>
                            <Button variant="contained" size="small" color="primary" type="submit" className={classes.customButton} disabled={err['name'] || err['position'] ? true : false}>Add</Button>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Form;