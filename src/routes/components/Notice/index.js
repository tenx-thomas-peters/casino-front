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

import {CommonConstants} from "../Common/Constants";
import NoticeAPI from '../../../services/api/apps/notice';
import GridContainer from "../../../@jumbo/components/GridContainer";
import IntlMessages from '../../../@jumbo/utils/IntlMessages';

const LinkRouter = props => <Link {...props} component={RouterLink} />;

const items = [{
    number: <IntlMessages id={'component.notice.number'}/>,
    title: <IntlMessages id={'component.notice.title'}/>,
    createDate: <IntlMessages id={'component.notice.createDate'}/>,
    notice: <IntlMessages id={'component.notice.notice'}/>,
    subheader: <IntlMessages id={'component.notice.subheader'}/>,
    noData: <IntlMessages id={'app.common.noData'}/>
}];

const Notice = () => {
    const classes= useStyles();

    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [pages, setPages] = useState(1);
    const [noticeList, setNoticeList] = useState([]);

    useEffect(() => {
        getNoticeList(pageNo, pageSize);
    },[pageNo, pageSize]);

    const getNoticeList = (pageNo, pageSize) => {
        let type = CommonConstants.noteTypePost;
        let classification = CommonConstants.noteClassificationNotice;
        NoticeAPI.getNoticeList({type, classification, pageNo, pageSize})
            .then(res => {
                if (res.data.success) {
                    let noticeList = res.data.result.records;
                    let pageNo = res.data.result.current;
                    let pageSize = res.data.result.size;
                    let pages = res.data.result.pages;
                    setNoticeList(noticeList);
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
        getNoticeList(page, pageSize);
    };

    return (
        <PageContainer heading="Home">
            <GridContainer>
                <Grid item xs={12} sm={12} md={12}>
                    <Card className={classes.root}>
                        <CardHeader
                            className={classes.cardHeader}
                            title={items[0].notice}
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
                                        noticeList.length > 0
                                        ?
                                            noticeList.map(notice => (
                                                <TableRow key={notice.seq}>
                                                    <TableCell align="center">
                                                        <LinkRouter color='inherit' to={"/user/noticeDetail?seq=" + notice.seq}>
                                                            <Button className={classes.tableRowGradient}>
                                                                {items[0].notice}
                                                            </Button>
                                                        </LinkRouter>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {notice.title}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {notice.sendTime}
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
}

export default Notice;