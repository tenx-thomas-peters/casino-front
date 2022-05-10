import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import GridContainer from '../../../@jumbo/components/GridContainer';
import {Grid} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {Button} from '../../../../node_modules/@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {Box} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import AppTextInput from '../../../@jumbo/components/Common/formElements/AppTextInput';
import Pagination from '@material-ui/lab/Pagination';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import {NotificationManager} from 'react-notifications';

import useStyles from '../../../@jumbo/common/common.style';
import supportStyles from '../../../@jumbo/support/support.style';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import clsx from 'clsx';

import {CommonConstants} from "../Common/Constants";
import SupportAPI from '../../../services/api/apps/support';

const items = [
    {
        support: <IntlMessages id={'sidebar.support'}/>,
        number: <IntlMessages id={'note.number'}/>,
        title: <IntlMessages id={'note.title'}/>,
        ask: <IntlMessages id={'support.ask'}/>,
        close: <IntlMessages id={'support.close'}/>,
        askSoon: <IntlMessages id={'support.askSoon'}/>,
        delete: <IntlMessages id={'note.delete'}/>,
        writeNote: <IntlMessages id={'support.writeNote'}/>,
        createDate: <IntlMessages id={'support.createDate'}/>,
        content: <IntlMessages id={'support.content'}/>,
        millionNotePage: <IntlMessages id={'note.millionNotePage'}/>,
        processingResult: <IntlMessages id={'component.deposit.processingResult'}/>,
        noData: <IntlMessages id={'app.common.noData'}/>,
        askSoonTitle: <IntlMessages id={'support.askSoonTitle'}/>,
        askSoonContent: <IntlMessages id={'support.askSoonContent'}/>
    }
];

const Support = () => {
    const classes = useStyles();
    const supportClasses = supportStyles();

    const [showInput, setShowInput] = useState(false);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const [supportList, setSupportList] = useState([]);
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const deleteNote = (e, noteSeq) => {
        e.stopPropagation();
        SupportAPI.deleteNote({noteSeq}).then(res => {
            if (res.data.success) {
                NotificationManager.success(res.data.message, 'Success!');
                getSupportList(pageNo, pageSize);
            } else {
                NotificationManager.error(res.data.message, 'Error!');
            }
        });
    };

    const askSoonBut = () => {
        let title = CommonConstants.txtAskSoonTitle;
        let content= CommonConstants.txtAskSoonContent;
        let type = CommonConstants.noteTypePost;
        let classification = CommonConstants.noteClassificationCustomerService;

        let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

        if (user) {
                let memberSeq = user.seq;
                SupportAPI.postSupportForm({memberSeq, title, content, type, classification})
                    .then((res) => {
                        if (res.data.success) {
                            NotificationManager.success(res.data.message, 'Success!');
                            setShowInput(false);
                            getSupportList(pageNo, pageSize);
                        }
                    })
                    .catch(function (err) {
                        NotificationManager.error(err, 'Error!');
                    });
            }
    };

    const onSubmit = () => {
        let type = CommonConstants.noteTypePost;
        let classification = CommonConstants.noteClassificationCustomerService;
        
        if (title.length > 0 && content.length > 0) {
            let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

            if (user) {
                let memberSeq = user.seq;
                SupportAPI.postSupportForm({memberSeq, title, content, type, classification})
                    .then((res) => {
                        if (res.data.success) {
                            NotificationManager.success(res.data.message, 'Success!');
                            setShowInput(false);
                            getSupportList(pageNo, pageSize);
                        }
                    })
                    .catch(function (err) {
                        NotificationManager.error(err, 'Error!');
                    });
            }
        } else {
            NotificationManager.error('Please write a note', 'Error!')
        }
    };

    const getSupportList = (pageNo, pageSize) => {
        let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if (user) {
            let memberSeq = user.seq;
            let type = CommonConstants.noteTypePost;
            let classification = CommonConstants.noteClassificationCustomerService;


            SupportAPI.getSupportList({memberSeq, type, classification, pageNo, pageSize})
                .then((res) => {
                    if (res.data.success) {
                        setPageNo(res.data.result.current);
                        setPageSize(res.data.result.size);
                        setTotalPage(res.data.result.pages);
                        setSupportList(res.data.result.records);
                    }
                })
                .catch(function (err) {
                    NotificationManager.error(err, 'Error!');
                });
        }
    };

    useEffect(() => {
        getSupportList(pageNo, pageSize);
    }, [pageNo, pageSize]);

    const changePage = (e, page) => {
        setPageNo(page);
        getSupportList(page, pageSize);
    };

    function Row(props) {
        const {row, index, pageNo, pageSize} = props;
        const [open, setOpen] = useState(false);
    
        return (
            <React.Fragment>
                <TableRow onClick={() => row.answer && setOpen(!open)}>
                    <TableCell align='center'>{pageSize * (pageNo - 1) + (index + 1)}</TableCell>
                    <TableCell align="left"><p dangerouslySetInnerHTML={{ __html: row.title }}></p></TableCell>
                    <TableCell align="center">{row.sendTime}</TableCell>
                    <TableCell align="center">
                        {row.answerStatus === 0 ? <IntlMessages id={'app.support.processing'} /> : <IntlMessages id={'app.support.answer'} />}
                        </TableCell>
                    <TableCell align="center">
                        <IconButton aria-label="delete" style={{color: 'grey'}} onClick={(e) => deleteNote(e, row.seq)}>
                            <DeleteIcon/>
                        </IconButton>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{paddingBottom: 0, paddingTop: 0}}/>
                    <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={5}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography component={'p'} style={{padding: '16px'}}>
                                    <p dangerouslySetInnerHTML={{ __html: row.answer }}></p>
                                </Typography>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    Row.propTypes = {
        row: PropTypes.shape({
            seq: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            sendTime: PropTypes.string.isRequired,
            readStatus: PropTypes.number.isRequired,
            answerStatus: PropTypes.number.isRequired,
            answer: PropTypes.string
        }),
        index: PropTypes.number.isRequired,
        pageNo: PropTypes.number.isRequired,
        pageSize: PropTypes.number.isRequired
    };

    return (
        <PageContainer>
            <GridContainer>
                <Grid item xs={12} sm={12} md={12}>
                    <Card className={classes.root}>
                        <CardHeader
                            className={classes.cardHeader}
                            title={items[0].support}
                            subheader={items[0].millionNotePage}
                        />
                        {
                            showInput
                                ?
                                <CardContent className={clsx(classes.cardContent)} style={{marginBottom: '25px'}}>
                                    <CardContent className={supportClasses.messageContent}>
                                        <CardContent className={supportClasses.messageHeader}>
                                            {items[0].title}
                                        </CardContent>
                                        <CardContent className={supportClasses.messageText}>
                                            <TextField
                                                className={clsx(classes.textField, supportClasses.inputField)}
                                                onChange={event => setTitle(event.target.value)}
                                            />
                                        </CardContent>
                                    </CardContent>
                                    <CardContent className={supportClasses.messageContent}>
                                        <CardContent className={supportClasses.messageHeader}>
                                            {items[0].content}
                                        </CardContent>
                                        <CardContent className={supportClasses.messageText}>
                                            <AppTextInput
                                                className={clsx(classes.textField, supportClasses.inputField)}
                                                multiline
                                                rows={5}
                                                onChange={event => setContent(event.target.value)}
                                            />
                                        </CardContent>
                                    </CardContent>
                                    <Box align='center'>
                                        <Button className={classes.containedActionButton} onClick={() => onSubmit()}>
                                            {items[0].ask}
                                        </Button>
                                        <Button className={classes.outlinedActionButton} onClick={() => setShowInput(false)}>
                                            {items[0].close}
                                        </Button>
                                    </Box>
                                </CardContent>
                                : ''
                        }
                        <CardContent className={classes.cardContent}>
                            <Table>
                                <TableHead className={classes.tableHeader}>
                                    <TableRow>
                                        <TableCell align="center" className={classes.tableHeader1}>
                                            {items[0].number}
                                        </TableCell>
                                        <TableCell align="center" className={classes.tableHeader2} style={{width: '50%'}}>
                                            {items[0].title}
                                        </TableCell>
                                        <TableCell align="center" className={classes.tableHeader2}>
                                            {items[0].createDate}
                                        </TableCell>
                                        <TableCell align="center" className={classes.tableHeader2}>
                                            {items[0].processingResult}
                                        </TableCell>
                                        <TableCell align="center" className={classes.tableHeader1}>
                                            {items[0].delete}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        supportList.length > 0
                                            ?
                                            supportList.map((row, index) => (
                                                <Row key={index} row={row} index={index} pageNo={pageNo} pageSize={pageSize} />
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
                                <Pagination count={totalPage}
                                            variant="outlined"
                                            shape="rounded"
                                            className={classes.paginationBtn}
                                            hidePrevButton
                                            hideNextButton
                                            onChange={(e, page) => changePage(e, page)}/>
                            </Box>
                            <Box align='right'>
                                <Button className={classes.containedActionButton} onClick={() => askSoonBut()}>
                                    {items[0].askSoon}
                                </Button>
                                <Button className={classes.outlinedActionButton} onClick={() => setShowInput(true)}>
                                    {items[0].writeNote}
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </GridContainer>
        </PageContainer>
    );
}

export default Support;