import React, {useImperativeHandle, useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {Box, makeStyles} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    root: {
        background: '#1e1f21',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
    },
    appMainContent: {
        padding: '30px 15px',
        [theme.breakpoints.up('md')]: {
            paddingLeft: 50,
            paddingRight: 50,
        },
        [theme.breakpoints.up('lg')]: {
            paddingLeft: 65,
            paddingRight: 65,
        },
        [theme.breakpoints.up('xl')]: {
            paddingLeft: 70,
            paddingRight: 70,
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: 20,
            paddingBottom: 20,
        },
    },
    borderTopLeftRadius: {
        borderTopLeftRadius: '20px',
    },
}));

const CmtContent = React.forwardRef(function LayoutContent(props, ref) {
    const {children} = props;
    const location = useLocation();
    const contentRef = React.createRef();
    const classes = useStyles();

    const [appMainClasses, setAppMainClasses] = useState();

    useEffect(() => {
        let newClasses = [];
        newClasses.push(classes.root);

        if (location.pathname.indexOf('/user') >= 0) {
            newClasses.push(classes.appMainContent);
            newClasses.push(classes.borderTopLeftRadius);
        }

        setAppMainClasses(clsx(newClasses));
    }, [appMainClasses, location.pathname, classes.root, classes.appMainContent, classes.borderTopLeftRadius]);

    useImperativeHandle(ref, () => ({}));

    return (
        <Box ref={contentRef}
             className={clsx(appMainClasses, 'Cmt-appMainContent')}
             bgcolor="background.main">
            {children}
        </Box>
    );
});

export default CmtContent;
CmtContent.defaultProps = {
    name: 'LayoutContent',
};
