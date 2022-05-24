import React, {useEffect, useState} from 'react';
import NumberFormat from 'react-number-format';
import {NotificationManager} from 'react-notifications';
import {useSelector} from 'react-redux';
import gameService from '../../../services/gameConfig';

import {
    Card,
    CardContent,
    InputBase,
    Button,
    Box,
    Grid,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    alpha,
    makeStyles
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import DeleteIcon from '@material-ui/icons/Delete';

import commonStyles from '../../../@jumbo/common/common.style';
import GridContainer from '../../../@jumbo/components/GridContainer';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';

import {CommonConstants} from "../Common/Constants";
import DepositAPI from '../../../services/api/apps/deposit';

import clsx from 'clsx';
import axios from 'axios';
import SupportAPI from "../../../services/api/apps/support";

const depositStyles = makeStyles(theme => ({
    revenueRoot: {
        flex: 1,
        display: 'block',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
            marginBottom: -12,
        },
    },
    revenueCol: {
        width: '100%',
        padding: 15,
        textAlign: 'center',
        '&:not(:last-child)': {
            borderBottom: `1px solid ${theme.palette.borderColor.main}`,
        },
    },
    applyChargeCard: {
        borderBottom: '6px solid #641609',
        borderRadius: 10,
        marginBottom: 30,
        backgroundSize: 'cover',
        background: '#100f14',
        padding: '10px 40px'
    },
    textFieldRoot: {
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(theme.palette.common.dark, 0.12),
        },
    },
    yenBtns: {
        background: '#6a1302',
        borderBottom: '2px solid #a2210c',
        borderLeft: '1px solid #a2210c',
        borderRight: '1px solid #a2210c',
        color: 'white',
        borderRadius: 8,
        marginLeft: 5,
        padding: 12,
        fontSize: 15,
        textTransform: 'none',
        '&:hover': {
            background: '#6a1302',
        }
    },
    requectAccountBtn: {
        padding: 12,
        textTransform: 'none',
        fontSize: 15,
    },
    resetBtn: {
        background: 'linear-gradient(to bottom, #c22335,#9d0a5a)',
        color: 'white',
        marginLeft: 5,
        borderRadius: 8,
        padding: 12,
        fontSize: 15,
        textTransform: 'none',
    },
    input: {
        marginRight: theme.spacing(1),
        borderRadius: '10px',
        border: '1px solid #312e2e',
        boxShadow: '0px 3px 8px #000 inset',
        background: '#252121',
        height: 45,
        paddingLeft: 20,
    },
    detailMsg: {
        color: "#6c6e6d",
        paddingLeft: 5,
    },
    tableTitle: {
        fontSize: 20,
        backgroundColor: '#1e1f21',
        padding: '0 0 25px 10px',
        '& small': {
            paddingLeft: 10,
            fontSize: 15,
            color: '#757577'
        },
    },
    statusStyle: {
        color: '#d3b44b',
    }
}));

const items = [{
    askAccount: <IntlMessages id={'component.deposit.askAccount'}/>,
    requestAccount: {
        text: <IntlMessages id={'component.deposit.requestAccount'}/>,
        background: '#100f14',
    },
    requestAccountMsg: <IntlMessages id={'component.deposit.requestAccountMsg'}/>,
    requestAmount: <IntlMessages id={'component.deposit.requestAmount'}/>,
    yen1: <IntlMessages id={'component.deposit.1yen'}/>,
    yen5: <IntlMessages id={'component.deposit.5yen'}/>,
    yen10: <IntlMessages id={'component.deposit.10yen'}/>,
    yen50: <IntlMessages id={'component.deposit.50yen'}/>,
    yen100: <IntlMessages id={'component.deposit.100yen'}/>,
    reset: <IntlMessages id={'appModule.reset'}/>,
    depositer: <IntlMessages id={'component.deposit.depositer'}/>,
    depositerMsg: <IntlMessages id={'component.deposit.depositerMsg'}/>,
    applyChargeBtn: <IntlMessages id={'component.deposit.applyCharge'}/>,
    historyTitle: <IntlMessages id={'component.deposit.historyTitle'}/>,
    historySubTitle: <IntlMessages id={'component.deposit.historySubTitle'}/>,
    number: <IntlMessages id={'component.common.number'}/>,
    applicationAmount: <IntlMessages id={'component.deposit.applicationAmount'}/>,
    date: <IntlMessages id={'component.common.date'}/>,
    processingDate: <IntlMessages id={'component.deposit.processingDate'}/>,
    processingResult: <IntlMessages id={'component.deposit.processingResult'}/>,
    delete: <IntlMessages id={'component.common.delete'}/>,
    won: <IntlMessages id={'component.withdraw.won'}/>,
    noData: <IntlMessages id={'app.common.noData'}/>,
    pending: <IntlMessages id={'app.common.status.pending'}/>,
    completed: <IntlMessages id={'app.common.status.completed'}/>,
    cancel: <IntlMessages id={'app.common.status.cancel'}/>,
    partnerPayment: <IntlMessages id={'app.common.status.partnerPayment'}/>,
}];

const DepositApplyCharge = () => {
    const {authUser} = useSelector(({auth}) => auth);

    const [requestAmount, setRequestAmount] = useState(0);
    const [depositer, setDepositer] = useState('');
    const [title] = useState('request account');
    const [content] = useState('This is example content of support reply');

    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const [depositList, setDepositList] = useState([]);

    // deposit history
    useEffect(() => {
        getDepositList(pageNo, pageSize);
    }, [pageNo, pageSize]);

    const changePage = (e, page) => {
        setPageNo(page);
        getDepositList(page, pageSize);
    };

    const getDepositList = (pageNo, pageSize) => {
        let userInfo = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

        if (userInfo) {
            DepositAPI.getDepositList({
                memberSeq: userInfo.seq,
                operationType: 0,
                pageNo: pageNo,
                pageSize: pageSize
            }).then(res => {
                if (res.data.success) {
                    setDepositList(res.data.result.records);
                    setPageNo(res.data.result.current);
                    setPageSize(res.data.result.size);
                    setTotalPage(res.data.result.pages);
                }
            });
        }
    };

    const deleteBySeq = (seq) => {
        DepositAPI.deleteHistoryBySeq({seq: seq}).then(res => {
            if (res.data.success) {
                if (res.data.success) {
                    NotificationManager.success(res.data.message, 'Success!');
                    getDepositList(pageNo, pageSize);
                }
            }
        });
    };

    const statusTxt = (status) => {
        let txt = "";
        switch (status) {
            case 0 :
                txt = items[0].pending;
                break;
            case 1 :
                txt = items[0].completed;
                break;
            case 2 :
                txt = items[0].cancel;
                break;
            case 3 :
                txt = items[0].partnerPayment;
                break;
            default:
                break;
        }
        return txt;
    };

    // apply charge 
    const onChangeDepositer = (value) => {
        setDepositer(value);
    };

    const reset = () => {
        setRequestAmount(0);
    };

    const sendRequestAccount = () => {
        let title = CommonConstants.txtAskSoonTitle;
        let content= CommonConstants.txtAskSoonContent;
        let type = CommonConstants.noteTypePost;
        let classification = CommonConstants.noteClassificationCustomerService;

        if (authUser) {
            let memberSeq = authUser.seq;
            SupportAPI.postSupportForm({memberSeq, title, content, type, classification})
                .then((res) => {
                    if (res.data.success) {
                        NotificationManager.success(res.data.message, 'Success!');
                    }
                })
                .catch(function (err) {
                    NotificationManager.error(err, 'Error!');
                });
        } else {
            NotificationManager.error('Please login first', 'Error');
        }
    };

    const addMoney = (amount) => {
        let money = amount + requestAmount;
        setRequestAmount(money);
    };

    const resetApplyCharge = () => {
        setRequestAmount(0);
        setDepositer('');
    };

    const applyCharge = () => {
        let userInfo = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

        if (authUser && userInfo) {
            if (requestAmount > 0) {
                // TODO
                // game api - /user/add-balance
                
                // gameService.post('/user/add-balance', {params: {username: userInfo.name, amount: requestAmount}})
                //     .then(res => {
                //         if (res.status === 200) {
                            // let params = {receiver: userInfo.seq, actualAmount: res.data.amount, note: depositer};
                            let params = {receiver: userInfo.seq, actualAmount: requestAmount, note: depositer};

                            DepositAPI.applyCharge({params}).then(res => {
                                if (res.data.success) {
                                    NotificationManager.success(res.data.message, 'Success!');
                                    resetApplyCharge();
                                    getDepositList();
                                }
                            });
                    //     } else if (res.status === 403) {
                    //         NotificationManager.error(res.message, 'Error');
                    //     }
                    // })
                    // .catch(function (err) {
                    //     NotificationManager.error(err.message, 'Error');
                    // });
                
                // axios.post('/user/add-balance', {username: userInfo.name, amount: requestAmount})
                //     .then(res => {
                //         if (res.status === 200) {
                            // let params = {receiver: userInfo.seq, actualAmount: requestAmount, note: depositer};
                            // DepositAPI.applyCharge({params}).then(res => {
                            //     if (res.data.success) {
                            //         NotificationManager.success(res.data.message, 'Success!');
                            //         resetApplyCharge();
                            //         getDepositList();
                            //     }
                            // });
                    //     } else if (res.status === 403) {
                    //         NotificationManager.error(res.data.message, 'Error');
                    //     }
                    // })
                    // .catch(function (err) {
                    //     NotificationManager.error(err.message, 'Error');
                    // });
            } else {
                NotificationManager.error("Please input request amount or depositer.", 'Error');
            }
        } else {
            NotificationManager.error('Please login first', 'Error');
        }

    };

    const commonClasses = commonStyles();
    const classes = depositStyles();
    return (
        <GridContainer>
            <Grid item xs={12} sm={12} md={12}>
                <Card className={commonClasses.root}>
                    <CardContent className={clsx(commonClasses.cardContent, classes.applyChargeCard)}>
                        <div className={classes.revenueRoot}>
                            <div className={classes.revenueCol}>
                                <GridContainer>
                                    <Grid item xs={12} sm={4} md={2}>
                                        <Typography component="div" align="left">
                                            <Box component="label" fontSize={15} color="text.white">
                                                {items[0].askAccount}
                                            </Box>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8} md={10} align="left">
                                        <Box component="label" fontSize={15} color="text.white">
                                            <Button variant="contained" color="secondary"
                                                    className={classes.requectAccountBtn} onClick={sendRequestAccount}>
                                                {items[0].requestAccount.text}
                                            </Button>
                                            <Box component="span" fontSize={15} color="text.white" ml={3}>
                                                {items[0].requestAccountMsg}
                                            </Box>
                                        </Box>
                                    </Grid>
                                </GridContainer>
                            </div>
                            <div className={classes.revenueCol}>
                                <GridContainer>
                                    <Grid item xs={12} sm={4} md={2}>
                                        <Typography component="div" align="left">
                                            <Box component="label" fontSize={15} color="text.white">
                                                {items[0].requestAmount}
                                            </Box>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8} md={10} align="left">
                                        <Box component="div">
                                            <InputBase className={classes.input} value={requestAmount}/>
                                            <Button variant="contained" className={classes.yenBtns}
                                                    onClick={() => addMoney(10000)}>{items[0].yen1}</Button>
                                            <Button variant="contained" className={classes.yenBtns}
                                                    onClick={() => addMoney(50000)}>{items[0].yen5}</Button>
                                            <Button variant="contained" className={classes.yenBtns}
                                                    onClick={() => addMoney(100000)}>{items[0].yen10}</Button>
                                            <Button variant="contained" className={classes.yenBtns}
                                                    onClick={() => addMoney(500000)}>{items[0].yen50}</Button>
                                            <Button variant="contained" className={classes.yenBtns}
                                                    onClick={() => addMoney(1000000)}>{items[0].yen100}</Button>
                                            <Button variant="contained" className={classes.resetBtn}
                                                    onClick={reset}>{items[0].reset}</Button>
                                        </Box>
                                    </Grid>
                                </GridContainer>
                            </div>
                            <div className={classes.revenueCol}>
                                <GridContainer>
                                    <Grid item xs={12} sm={4} md={2}>
                                        <Typography component="div" align="left">
                                            <Box component="label" fontSize={15} color="text.white">
                                                {items[0].depositer}
                                            </Box>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8} md={10} align="left">
                                        <Box component="div">
                                            <InputBase className={classes.input} value={depositer}
                                                       onChange={e => onChangeDepositer(e.target.value)}/>
                                            <Box component="label" fontSize={14} className={classes.detailMsg}>
                                                {items[0].depositerMsg}
                                            </Box>
                                        </Box>
                                    </Grid>
                                </GridContainer>
                            </div>
                        </div>
                    </CardContent>
                    <CardContent align="center">
                        <Button variant="contained" className={commonClasses.containedActionButton}
                                onClick={applyCharge}>
                            {items[0].applyChargeBtn}
                        </Button>
                    </CardContent>
                </Card>

                <Card className={commonClasses.root}>
                    <div className={classes.tableTitle}>
                        <h3>
                            {items[0].historyTitle}
                            <small>{items[0].historySubTitle}</small>
                        </h3>
                    </div>
                    <CardContent className={commonClasses.cardContent}>
                        <Table>
                            <TableHead className={commonClasses.tableHeader}>
                                <TableRow>
                                    <TableCell align="center"
                                               className={commonClasses.tableHeader1}>{items[0].number}</TableCell>
                                    <TableCell align="center"
                                               className={commonClasses.tableHeader2}>{items[0].depositer}</TableCell>
                                    <TableCell align="center"
                                               className={commonClasses.tableHeader2}>{items[0].applicationAmount}</TableCell>
                                    <TableCell align="center"
                                               className={commonClasses.tableHeader2}>{items[0].date}</TableCell>
                                    <TableCell align="center"
                                               className={commonClasses.tableHeader2}>{items[0].processingDate}</TableCell>
                                    <TableCell align="center"
                                               className={commonClasses.tableHeader2}>{items[0].processingResult}</TableCell>
                                    <TableCell align="center"
                                               className={commonClasses.tableHeader1}>{items[0].delete}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    depositList.length > 0 ?
                                        depositList.map((deposit, index) => (
                                            <TableRow key={deposit.seq}>
                                                <TableCell align="center">{index + 1}</TableCell>
                                                <TableCell align="center">{deposit.accountHolder}</TableCell>
                                                <TableCell align="center">
                                                    <NumberFormat className={commonClasses.numberFormatStyle}
                                                                  value={deposit.variableAmount}
                                                                  thousandSeparator isNumericString
                                                                  disabled/>{items[0].won}
                                                </TableCell>
                                                <TableCell align="center">{deposit.applicationTime}</TableCell>
                                                <TableCell align="center">{deposit.processTime}</TableCell>
                                                <TableCell align="center"
                                                           className={classes.statusStyle}>{statusTxt(deposit.status)}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton aria-label="delete"
                                                                onClick={() => deleteBySeq(deposit.seq)}
                                                                style={{color: 'gray'}}>
                                                        <DeleteIcon fontSize="small"/>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                        :
                                        <TableRow>
                                            <TableCell colSpan={7} align={'center'}>
                                                {items[0].noData}
                                            </TableCell>
                                        </TableRow>
                                }
                            </TableBody>
                        </Table>
                        <Box className={clsx(commonClasses.root, commonClasses.contentCenter)}>
                            <Pagination count={totalPage} variant="outlined" shape="rounded"
                                        className={commonClasses.paginationBtn} hidePrevButton hideNextButton
                                        onChange={(e, page) => changePage(e, page)}/>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </GridContainer>
    );
}

export default DepositApplyCharge;