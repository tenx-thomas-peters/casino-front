import React, {useContext} from 'react';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SidebarThemeContext from '../../../../@coremat/CmtLayouts/SidebarThemeContext/SidebarThemeContext';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '0 16px',
    },
    userInfo: {
        paddingTop: 24,
        transition: 'all 0.1s ease',
        height: 75,
        opacity: 1,
        '.Cmt-miniLayout .Cmt-sidebar-content:not(:hover) &': {
            height: 0,
            paddingTop: 0,
            opacity: 0,
            transition: 'all 0.3s ease',
        },
    },
    userTitle: {
        color: props => props.sidebarTheme.textDarkColor,
        marginBottom: 8,
    },
    userSubTitle: {
        fontSize: 14,
        fontWeight: theme.typography.fontWeightBold,
        letterSpacing: 0.25,
    },
    '@keyframes rotation': {
        from: {
            transform: 'rotateY(0deg)',
        },
        to: {
            transform: 'rotateY(360deg)',
        },
    },
    avatarSetting: {
        animation: '$rotation 2s infinite linear'
    },
}));

const SidebarHeader = () => {
    const {sidebarTheme} = useContext(SidebarThemeContext);
    const classes = useStyles({sidebarTheme});

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={3} />
                <Grid item xs={6}>
                    <img src={'/logo512.png'} alt="User Avatar" className={clsx(classes.avatarSetting, 'avatar-rotate')}/>
                </Grid>
            </Grid>
        </div>
    );
};

export default SidebarHeader;
