import React, { useEffect, useState } from 'react';
import useStyles from '../../../@jumbo/common/common.style';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import Card from '@material-ui/core/Card';
import {Grid} from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import { Box } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Pagination from '@material-ui/lab/Pagination';
import {NotificationManager} from 'react-notifications';
import Link from "@material-ui/core/Link/Link";
import {Link as RouterLink} from "react-router-dom";
import clsx from 'clsx';
import {Button} from '../../../../node_modules/@material-ui/core';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';

import {CommonConstants} from "../Common/Constants";
import EventAPI from '../../../services/api/apps/event';
import GridContainer from "../../../@jumbo/components/GridContainer";

const LinkRouter = props => <Link {...props} component={RouterLink} />;

const items = [{
    number: <IntlMessages id={'component.notice.number'}/>,
    title: <IntlMessages id={'component.notice.title'}/>,
    createDate: <IntlMessages id={'component.notice.createDate'}/>,
    event: <IntlMessages id={'component.event.event'}/>,
    subheader: <IntlMessages id={'component.event.subheader'}/>,
    noData: <IntlMessages id={'app.common.noData'}/>
}];

const Event = () => {
    const classes= useStyles();

    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [pages, setPages] = useState(1);
    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        getEventList(pageNo, pageSize);
    },[pageNo, pageSize]);

    const getEventList = (pageNo, pageSize) => {
        let type = CommonConstants.noteTypePost;
        let classification = CommonConstants.noteClassificationEvent;
        EventAPI.getEventList({type, classification, pageNo, pageSize})
            .then(res => {
                if (res.data.success) {
                    let eventList = res.data.result.records;
                    let pageNo = res.data.result.current;
                    let pageSize = res.data.result.size;
                    let pages = res.data.result.pages;
                    setEventList(eventList);
                    setPageNo(pageNo);
                    setPageSize(pageSize);
                    setPages(pages);
                }
            })
            .catch(function (err) {
                NotificationManager.error(err, 'Error');
            });

    };

    const changeCurrentPage = (e, page) => {
        setPageNo(page);
        getEventList(page, pageSize);
    };

    return (
        <PageContainer heading="Home">
            <GridContainer>
                <Grid item xs={12} sm={12} md={12}>
                    <Card className={classes.root}>
                        <CardHeader
                            className={classes.cardHeader}
                            title={items[0].event}
                            subheader={items[0].subheader}
                        />
                        <CardContent className={classes.cardContent}>
                            <Table>
                                <TableHead className={classes.tableHeader}>
                                    <TableRow>
                                        <TableCell className={classes.tableHeader1}>
                                            {items[0].number}
                                        </TableCell>
                                        <TableCell className={classes.tableHeader2}>
                                            {items[0].title}
                                        </TableCell>
                                        <TableCell className={classes.tableHeader1}>
                                            {items[0].createDate}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        eventList.length > 0
                                            ?
                                            eventList.map(event => (
                                                <TableRow key={event.seq}>
                                                    <TableCell align="center">
                                                        <LinkRouter color='inherit' to={"/user/eventDetail?seq=" + event.seq}>
                                                            <Button className={classes.tableRowGradient}>
                                                                {items[0].event}
                                                            </Button>
                                                        </LinkRouter>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {event.title}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {event.sendTime}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                            :
                                            <TableRow>
                                                <TableCell colSpan={5} align={'center'}>
                                                    {items[0].noData}
                                                </TableCell>
                                            </TableRow>
                                    }
                                </TableBody>
                            </Table>
                            <Box className={clsx(classes.root, classes.contentCenter)}>
                                <Pagination count={pages}
                                            variant="outlined"
                                            shape="rounded"
                                            className={classes.paginationBtn}
                                            hidePrevButton
                                            hideNextButton
                                            onChange={(e, page) => changeCurrentPage(e, page)}/>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </GridContainer>
        </PageContainer>
    );
};

export default Event;