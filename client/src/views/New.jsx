// Tabs component (pass headers, paths)
// Form component
import React from 'react';
import CustomTabs from '../components/CustomTabs';
import Form from '../components/Form';
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

const New = props => {
    const classes=useStyles();

    return (
        <Grid container className={classes.root}>
            <CustomTabs headers={['List', 'Add Player']} paths={['/players/list', '/players/addplayers']} initialIdx={1} selectColor="primary" textColor="primary"/>
            <Form/>
        </Grid>
    )

}

export default New;