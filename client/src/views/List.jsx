// Tabs component (pass headers, paths)
// Players component
import React from 'react';
import CustomTabs from '../components/CustomTabs';
import Players from '../components/Players';
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

const List = props => {
    const classes=useStyles();

    return (
        <Grid container className={classes.root}>
            <CustomTabs headers={['List', 'Add Player']} paths={['/players/list', '/players/addplayer']} initialIdx={0} selectColor="primary" textColor="primary"/>
            <Players/>
        </Grid>
    )

}

export default List;