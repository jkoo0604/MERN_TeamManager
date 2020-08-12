// takes header, paths, initialIndex[, selectColor, textColor]
// activeIndex, setActiveIndex useState(initialIndex)
// activeIndex === idx in header.map, then add a className for bold font style
import React, { useState } from 'react';
import { navigate } from '@reach/router';
import { Tabs, Tab, Paper } from '@material-ui/core';

const CustomTabs = props => {

    const { headers, paths, initialIdx, selectColor, textColor } = props;
    const [value, setValue] = useState(initialIdx);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        navigate(paths[newValue]);
    };

    return (
        <Paper square>
            <Tabs
                value={value}
                indicatorColor={selectColor || 'primary'}
                textColor={textColor || 'primary'}
                onChange={handleChange}
                centered
            >
                {
                    headers.map((header, id) => (
                        <Tab label={header} key={id} />
                    ))
                }
            </Tabs>
        </Paper>
    )

}

export default CustomTabs;