import React, {useState, useEffect} from 'react';
import useStyles from '../../../@jumbo/common/common.style';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import Card from '@material-ui/core/Card';
import {Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import { Box } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import {NotificationManager} from 'react-notifications';
import {Button} from '../../../../node_modules/@material-ui/core';
import clsx from 'clsx';
import {Link as RouterLink, useLocation} from 'react-router-dom';
import Link from "@material-ui/core/Link/Link";

import EventAPI from '../../../services/api/apps/event';
import GridContainer from "../../../@jumbo/components/GridContainer";
import IntlMessages from '../../../@jumbo/utils/IntlMessages';

const LinkRouter = props => <Link {...props} component={RouterLink} />;
const queryString = require('query-string');

const items = [{
    event: <IntlMessages id={'component.event.event'}/>,
    subheader: <IntlMessages id={'component.event.subheader'}/>,
    list: <IntlMessages id={'component.event.list'}/>,
}]

const EventDetail = () => {
    const classes = useStyles();
    const location = useLocation();
    const [noteSeq, setNoteSeq] = useState('');
    const [detailItem, setDetailItem] = useState({});

    useEffect(() => {
        var seq = queryString.parse(location.search).seq;
        setNoteSeq(seq);
        getEventDetailItem(noteSeq);
    }, [noteSeq, location.search]);

    const getEventDetailItem = (noteSeq) => {
        EventAPI.getEventDetail({noteSeq})
            .then(res => {
                if (res.data.success) {
                    let item = res.data.result;
                    setDetailItem(item);
                }
            })
            .catch(function (err) {
                NotificationManager.error(err, 'Error');
            });
    };

    return(
        <PageContainer>
            <GridContainer>
                <Grid item xs={12} sm={12} md={12}>
                    <Card className={classes.root}>
                        <CardHeader
                            className={classes.cardHeader}
                            title={items[0].event}
                            subheader={items[0].subheader}
                        />
                        <CardContent className={classes.cardContent}>
                            <Box className={classes.detailBox}>
                                <Box className={classes.detailHeader}>
                                    <GridContainer>
                                        <Grid item xs={1} sm={1} md={1}>
                                            <Typography variant="h3" className={classes.detailHeader1}>
                                                {items[0].event}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={9} sm={9} md={9}>
                                            <Typography variant="h3" className={classes.detailHeader2}>{detailItem && detailItem.title ? detailItem.title : ''}</Typography>
                                        </Grid>
                                        <Grid item xs={2} sm={2} md={2}>
                                            <Typography variant="h3" className={classes.detailHeader3} >{detailItem && detailItem.sendTime ? detailItem.sendTime : ''}</Typography>
                                        </Grid>
                                    </GridContainer>
                                </Box>
                                <Box className={classes.detailContent}>
                                    <p dangerouslySetInnerHTML={{ __html: detailItem && detailItem.content ? detailItem.content : ''}}></p>
                                </Box>
                            </Box>
                            <Box className={clsx(classes.root, classes.contentCenter)}>
                                <LinkRouter color='inherit' to={"/user/event"}>
                                    <Button className={classes.containedActionButton}>
                                        <Typography variant="h3">
                                            {items[0].list}
                                        </Typography>
                                    </Button>
                                </LinkRouter>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </GridContainer>
        </PageContainer>
    );
};

export default EventDetail;