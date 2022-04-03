import React from 'react';
import {Box, makeStyles, Typography} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import {footerFirstItems,footerSecondItems, footerThirdItems} from '../../../../@fake-db';
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'block',
        alignItems: 'center',
    },
    btnRoot: {
        [theme.breakpoints.down('xs')]: {
            padding: '6px 12px',
            fontSize: 11,
        },
    },
    uppercase: {
        textTransform: 'uppercase'
    },
    otherLink: {
        '&:last-child': {
            marginBottom: '10px'
        }
    },
    textCenter: {
        textAlign: 'center'
    },
    link: {
        display: 'inline-block',
        '& div': {
            width: 'auto',
            height: 'auto',
            display: 'inline-block'
        }
    }
}));

const Footer = props => {
    const classes = useStyles();
    const date = new Date();
    const preventDefault = event => event.preventDefault();

    return (
        <Box className={classes.root} {...props}>
            <Box display="block" alignItems="center" className={clsx(classes.otherLink, classes.textCenter)}>
                {footerFirstItems.map((item, index) => (
                    <Link href={item.link} key={index} className={classes.link} onClick={preventDefault}>
                        <Avatar alt={item.text} src={item.image} />
                    </Link>
                ))}
            </Box>
            <Box display="block" alignItems="center" className={clsx(classes.otherLink, classes.textCenter)}>
                {footerSecondItems.map((item, index) => (
                    <Link href={item.link} key={index} className={classes.link} onClick={preventDefault}>
                        <Avatar alt={item.text} src={item.image} />
                    </Link>
                ))}
            </Box>
            <Box display="block" alignItems="center" className={clsx(classes.otherLink, classes.textCenter)}>
                {footerThirdItems.map((item, index) => (
                    <Link href={item.link} key={index} className={classes.link} onClick={preventDefault}>
                        <Avatar alt={item.text} src={item.image} />
                    </Link>
                ))}
            </Box>
            <Box display="block" alignItems="center"  className={classes.textCenter}>
                <Box fontSize={{xs: 12, sm: 14}} component="p" color="text.disabled" className={classes.uppercase}>
                    <Typography component="span">Copyright © {date.getFullYear()}</Typography>
                    <Typography component="span" style={{color: '#d4ac19', margin: '0 10px'}}>MILLION</Typography>
                    <Typography component="span">All Rights Reserved</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
