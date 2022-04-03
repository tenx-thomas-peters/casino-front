import React from 'react';
import {Box, IconButton, makeStyles, Tooltip, Grid} from '@material-ui/core';
import {alpha} from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';
import clsx from 'clsx';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles(theme => ({
    cardRoot: {
        '& .Cmt-header-root': {
            paddingTop: 4,
            paddingBottom: 4,
        },
        '& .Cmt-card-content': {
            padding: '0 0 16px !important',
        },
    },
    typography: {
        padding: theme.spacing(2),
    },
    iconRoot: {
        position: 'relative',
        color: alpha(theme.palette.common.white, 0.38),
        '&:hover, &.active': {
            color: theme.palette.common.white,
        },
    },
    counterRoot: {
        color: theme.palette.common.white,
        border: `solid 1px ${theme.palette.common.white}`,
        backgroundColor: theme.palette.warning.main,
        width: 20,
    },
    scrollbarRoot: {
        height: 300,
        padding: 16,
    },
    popoverRoot: {
        '& .MuiPopover-paper': {
            width: 375,
        },
    },
}));

const HeaderNotifications = () => {
    const classes = useStyles();
    const [counter] = React.useState(5);

    return (
        <Box pr={2} className={classes.note}>
            <Tooltip title="Notifications">
                <Grid container>
                    <Grid item md={12}>
                        <i className={clsx(classes.user, 'iconfont icon-huiyuan2')}></i>
                        <span>
                            test user
                            <i className={'iconfont icon-caidan'}>쪽지 {counter}통</i>
                        </span>
                    </Grid>
                </Grid>
            </Tooltip>
        </Box>
    );
};

export default HeaderNotifications;
