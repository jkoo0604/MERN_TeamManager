// Tabs component (pass headers and paths)
// PlayerStatus component
import React from 'react';
import CustomTabs from '../components/CustomTabs';
import Game from '../components/Game';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 800,
        flexGrow: 1,
        margin: 'auto',
        marginTop: 20,
        padding: theme.spacing(1, 4),
    },
    container: {
        maxHeight: 700,
    },
}));

const Status = props => {
    const classes=useStyles();

    return (
        <Grid container className={classes.root}>
            <CustomTabs headers={['Game 1', 'Game 2', 'Game 3']} paths={['/status/game/1', '/status/game/2', '/status/game/3']} initialIdx={0} selectColor="primary" textColor="primary"/>
            <Game gameId={props.gameId}/>
        </Grid>
    )

}

export default Status;