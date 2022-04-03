import React from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import {Box, Typography} from '@material-ui/core';
import Link from "@material-ui/core/Link/Link";
import {Link as RouterLink} from "react-router-dom";
import IntlMessages from '../../../@jumbo/utils/IntlMessages';

const LinkRouter = props => <Link {...props} component={RouterLink} />;

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
        margin: '0 auto',
        backgroundColor: lighten(theme.palette.background.paper, 0.1),
    },
    cardHeader: {
        borderRadius: '10px',
        backgroundSize: 'cover',
        '& span': {
            display: 'inline-block'
        },
        '& span:first-child': {
            fontSize: '15px',
            margin: '15px 10px 0px 15px',
            color: 'gray',
            textTransform: 'uppercase'
        },
        '& span:last-child': {
            color: '#f8b319',
            fontSize: '15px',
            textTransform: 'lowercase'
        },
        '& .MuiCardHeader-action':{
            marginTop: '18px',
            marginRight: '8px'
        }
    },
}));

const txt = {
    million: <IntlMessages id={'home.million'}/>,
};

const NoticeView = ({title, subTitle, content, url}) => {
    const classes = useStyles();

    return(
        <Card style={{borderRadius: '10px'}}>
            <CardHeader
                className={classes.cardHeader}
                title={txt.million}
                subheader={subTitle}
                action={
                    <LinkRouter color='inherit' to={url} className={classes.link} style={{color: 'gray', margin: '15px 10px 0px 15px'}}>
                        <IntlMessages id={"app.txt.more"}/>&nbsp;+
                    </LinkRouter>
                }
            />
            <CardContent className={classes.cardContent} style={{padding: '0 30px 30px'}}>
                <Box>
                    <Typography component={'span'}>
                        <LinkRouter color='inherit' to={url + "Detail?seq="+(content && content.seq ? content.seq : '')} className={classes.link} style={{color: '#fff'}}>
                            {content && content.title ? '- ' + content.title : ''}
                        </LinkRouter>
                    </Typography>
                    <Typography component={'span'} style={{float: 'right', color: 'gray'}}>
                        {content && content.sendTime ? content.sendTime : ''}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default NoticeView

