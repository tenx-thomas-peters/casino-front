import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {NotificationManager} from 'react-notifications';
import NumberFormat from 'react-number-format';
import gameService from '../../../services/gameConfig';

import useStyles from '../../../@jumbo/common/common.style';
import {
    Card,
    CardHeader,
    CardContent,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    InputBase,
    Typography,
    Button,
    Box,
    IconButton,
    Grid,
    makeStyles
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Pagination from '@material-ui/lab/Pagination';

import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';

import WithdrawalAPI from '../../../services/api/apps/withdrawal';
import clsx from 'clsx';
import axios from 'axios';

const items = [
    {
        withdrawApplication: <IntlMessages id={'component.withdraw.withdrawApplication'}/>,
    },
    {
        description: <IntlMessages id={'component.withdraw.description'}/>,
    },
    {
        amountOfWithdraw: <IntlMessages id={'component.withdraw.amountOfWithdraw'}/>,
    },
    {
        bankName: <IntlMessages id={'component.withdraw.bankName'}/>,
    },
    {
        yen1: <IntlMessages id={'component.withdraw.10000yen'}/>,
    },
    {
        yen5: <IntlMessages id={'component.withdraw.50000yen'}/>,
    },
    {
        yen10: <IntlMessages id={'component.withdraw.100000yen'}/>,
    },
    {
        yen50: <IntlMessages id={'component.withdraw.500000yen'}/>,
    },
    {
        yen100: <IntlMessages id={'component.withdraw.1000000yen'}/>,
    },
    {
        reset: <IntlMessages id={'appModule.reset'}/>,
    },
    {
        accountHolder: <IntlMessages id={'component.withdraw.accountHolder'}/>,
    },
    {
        accountHolderDescription: <IntlMessages id={'component.withdraw.accountHolderDescription'}/>,
    },
    {
        accountNumber: <IntlMessages id={'component.withdraw.accountNumber'}/>,
    },
    {
        withdrawPassword: <IntlMessages id={'component.withdraw.withdrawPassword'}/>,
    },
    {
        application: <IntlMessages id={'dashboard.application'}/>
    },
    {
        withdrawHistory: <IntlMessages id={'component.withdraw.withdrawHistory'}/>,
    },
    {
        tableDes: <IntlMessages id={'component.withdraw.tableDescription'}/>
    },
    {
        number: <IntlMessages id={'note.number'}/>
    },
    {
        depositer: <IntlMessages id={'component.deposit.depositer'}/>
    },
    {
        applicationAmount: <IntlMessages id={'component.withdraw.applicationAmount'}/>
    },
    {
        date: <IntlMessages id={'component.withdraw.date'}/>
    },
    {
        processingDate: <IntlMessages id={'component.withdraw.processingDate'}/>
    },
    {
        processingResult: <IntlMessages id={'component.withdraw.processingResult'}/>
    },
    {
        delete: <IntlMessages id={'note.delete'}/>
    },
    {
        won: <IntlMessages id={'component.withdraw.won'}/>
    },
    {
        noData: <IntlMessages id={'app.common.noData'}/>
    }
];

const withdrawStyle = makeStyles(theme => ({

    attention: {
        backgroundImage: `url('/images/withdraw/withdraw.jpg')`,
        backgroundSize: 'cover',
        height: '300px',
        marginBottom: '30px',
        borderRadius: '10px'
    },

    cardContent: {
        backgroundColor: '#100f14',
        borderRadius: '10px',
        borderBottom: '7px solid #641609',
        marginBottom: '30px'
    },

    inputValue: {
        border: 'rgba(159, 159, 161, 0.26)',
        backgroundColor: 'rgba(60, 66, 64, 0.34)'
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

    gridContent: {
        marginTop: '10px',
        marginBottom: '1px'
    },

    paymentGroup: {
        margin: '25px',
    },

    paymentCol: {
        marginBottom: '18px',
        borderBottom: '2px solid #252121'
    },

    yenBtns: {
        background: '#6a1302',
        borderBottom: '2px solid #a2210c',
        borderLeft: '1px solid #a2210c',
        borderRight: '1px solid #a2210c',
        color: 'white',
        borderRadius: 5,
        marginLeft: 5,
        '&:hover': {
            background: '#6a1302',
        }
    },

    resetBtn: {
        background: 'linear-gradient(to bottom, #c22335,#9d0a5a)',
        color: 'white',
        marginLeft: 5
    },

    applyBtnStyle: {
        textAlign: 'center',
    },

    applyBtn: {
        borderRadius: '30px',
        background: 'linear-gradient(to right, #bd8e0c, #e1c965, #bd8e0c)'
    },

    applyBtnTxt: {
        fontSize: '20px',
    },

    tableTitle: {
        fontSize: 30,
        backgroundColor: '#1e1f21',
        padding: '0 0 25px 10px',
        '& small': {
            paddingLeft: 10,
            fontSize: 13,
            color: '#757577'
        },
    },

    fontStyle: {
        color: '#bd8e0c'
    }
}));

const Withdraw = () => {
    const {authUser} = useSelector(({auth}) => auth);
    const commonClasses = useStyles();
    const classes = withdrawStyle();

    const [withdrawalList, setWithdrawalList] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const [firstMoney, setFirstMoney] = useState(0);
    const [bankName, setBankName] = useState();
    const [accountHolderDescription, setAccountHolderDescription] = useState();

    const setInvestment = (amount) => {
        if (firstMoney !== 0) {
            let total = firstMoney + amount;
            setFirstMoney(total);
        } else if (firstMoney === 0) {
            setFirstMoney(amount);
        }
    };

    const onSubmit = () => {
        if (authUser) {
            let userInfo = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
            let moneyHistory = {
                memberSeq: userInfo.seq,
                username: userInfo.name,
                amount: firstMoney,
                note: accountHolderDescription
            };

            if (firstMoney === 0) {
                NotificationManager.success('Please insert your money', 'Error');
            } else {
                // /user/sub-balance process
                let withdrawInfo = {
                    username: userInfo.name,
                    amount: firstMoney
                };

                // TODO
                // game api - /user/sub-balance
                //
                // gameService.post('/user/sub-balance', {params: withdrawInfo})
                //     .then(res => {
                //         if (res.status === 200) {
                            WithdrawalAPI.addWithdrawal({moneyHistory})
                                .then(res => {
                                    if (res.data.success === false) {
                                        NotificationManager.error(res.data.message, 'Error');
                                    } else if (res.data.success === true) {
                                        NotificationManager.success(res.data.message, 'Success');

                                        setFirstMoney(0);
                                        getWithdrawalList(pageNo, pageSize);
                                    }
                                })
                                .catch(function (err) {
                                    NotificationManager.error(err.message, 'Error');
                                });
                    //     } else {
                    //         NotificationManager.error(res.data.message, 'Error');
                    //     }
                    // })
                    // .catch(function (err) {
                    //     NotificationManager.error(err.message, 'Error');
                    // });


                // axios.post('/user/sub-balance', {withdrawInfo})
                //     .then(res => {
                //         if (res.status === 200) {
                //             WithdrawalAPI.addWithdrawal({moneyHistory})
                //                 .then(res => {
                //                     if (res.data.success === false) {
                //                         NotificationManager.error(res.data.message, 'Error');
                //                     } else if (res.data.success === true) {
                //                         NotificationManager.success(res.data.message, 'Success');
                //
                //                         setFirstMoney(0);
                //                         getWithdrawalList(pageNo, pageSize);
                //                     }
                //                 })
                //                 .catch(function (err) {
                //                     NotificationManager.error(err.message, 'Error');
                //                 });
                //         }
                //     });

                // TODO
                // game api - /user/sub-balance-all
                // /user/sub-balance-all process
                /*let withdrawInfo = {
                    username: userInfo.name
                };
                axios.post('/user/sub-balance-all', {withdrawInfo}).then(res => {
                    if (res.status === 200) {
                        console.log(res)
                        console.log("success");
                    }
                });*/
            }
        } else {
            NotificationManager.error('Please login first', 'Error');
        }
    };

    const setReset = () => {
        setFirstMoney(0);
    };

    const getWithdrawalList = (pageNo, pageSize) => {
        let userInfo = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

        if (userInfo) {
            WithdrawalAPI.getWithdrawalList({
                memberSeq: userInfo.seq,
                operationType: 1,
                pageNo: pageNo,
                pageSize: pageSize
            }).then(res => {
                if (res.data.success) {
                    setPageNo(res.data.result.current);
                    setPageSize(res.data.result.size);
                    setTotalPage(res.data.result.pages);
                    setWithdrawalList(res.data.result.records);
                }
            });
        }
    };

    const deleteWithdrawalBySeq = (seq) => {
        WithdrawalAPI.deleteWithdrawalBySeq({seq: seq}).then(res => {
            if (res.data.success) {
                NotificationManager.success(res.data.message, 'Success!');
                getWithdrawalList(pageNo, pageSize);
            }
        })
    };

    const changePage = (e, page) => {
        setPageNo(page);
        getWithdrawalList(page, pageSize);
    };

    useEffect(() => {
        getWithdrawalList(pageNo, pageSize);
    }, [pageNo, pageSize]);

    return (
        <PageContainer heading="Withdrawal">
            <GridContainer>
                <Grid item xs={12} sm={12} md={12}>
                    <Card className={commonClasses.root}>
                        <CardHeader className={commonClasses.cardHeader} title={items[0].withdrawApplication}
                                    subheader={items[1].description}/>

                        <CardContent className={classes.attention}></CardContent>
                        <form>
                            <CardContent className={classes.cardContent}>
                                <div className={classes.paymentGroup}>
                                    <div className={classes.paymentCol}>
                                        <GridContainer className={classes.gridContent}>
                                            <Grid item xs={12} sm={4} md={2} align="left">
                                                <Typography component="div">
                                                    <Box component="label" fontSize={13} color="text.white">
                                                        {items[2].amountOfWithdraw}
                                                    </Box>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={8} md={10} align="left">
                                                <Box component="div">
                                                    <InputBase className={classes.input} value={firstMoney}/>
                                                    <Button variant="contained" className={classes.yenBtns}
                                                            onClick={() => setInvestment(10000)}>{items[4].yen1}</Button>
                                                    <Button variant="contained" className={classes.yenBtns}
                                                            onClick={() => setInvestment(50000)}>{items[5].yen5}</Button>
                                                    <Button variant="contained" className={classes.yenBtns}
                                                            onClick={() => setInvestment(100000)}>{items[6].yen10}</Button>
                                                    <Button variant="contained" className={classes.yenBtns}
                                                            onClick={() => setInvestment(500000)}>{items[7].yen50}</Button>
                                                    <Button variant="contained" className={classes.yenBtns}
                                                            onClick={() => setInvestment(1000000)}>{items[8].yen100}</Button>
                                                    <Button variant="contained" className={classes.resetBtn}
                                                            onClick={() => setReset()}>{items[9].reset}</Button>
                                                </Box>
                                            </Grid>
                                        </GridContainer>
                                    </div>
                                    <div className={classes.paymentCol}>
                                        <GridContainer className={classes.gridContent}>
                                            <Grid item xs={12} sm={4} md={2} align="left">
                                                <Typography component="div">
                                                    <Box component="label" fontSize={13} color="text.white">
                                                        {items[3].bankName}
                                                    </Box>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={8} md={10} align="left">
                                                <Typography component="div">
                                                    <Box component="div">
                                                        <InputBase className={classes.input} defaultValue={bankName}
                                                                   onChange={event => setBankName(event.target.value)}/>
                                                    </Box>
                                                </Typography>
                                            </Grid>
                                        </GridContainer>
                                    </div>
                                    <div className={classes.paymentCol}>
                                        <GridContainer className={classes.gridContent}>
                                            <Grid item xs={12} sm={4} md={2} align="left">
                                                <Typography component="div">
                                                    <Box component="label" fontSize={13} color="text.white">
                                                        {items[10].accountHolder}
                                                    </Box>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={8} md={10} align="left">
                                                <Typography component="div">
                                                    <Box component="div">
                                                        <InputBase className={classes.input}
                                                                   defaultValue={accountHolderDescription}
                                                                   onChange={event => setAccountHolderDescription(event.target.value)}/>
                                                        <Box component="span" fontSize={12} ml={1}
                                                             color="text.darkgray">
                                                            {items[11].accountHolderDescription}
                                                        </Box>
                                                    </Box>
                                                </Typography>
                                            </Grid>
                                        </GridContainer>
                                    </div>
                                    <div className={classes.paymentCol}>
                                        <GridContainer className={classes.gridContent}>
                                            <Grid item xs={12} sm={4} md={2} align="left">
                                                <Typography component="div">
                                                    <Box component="label" fontSize={13} color="text.white">
                                                        {items[12].accountNumber}
                                                    </Box>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={8} md={10} align="left">
                                                <Typography component="div">
                                                    <Box component="div">
                                                        <InputBase className={classes.input}/>
                                                    </Box>
                                                </Typography>
                                            </Grid>
                                        </GridContainer>
                                    </div>
                                    <div className={classes.paymentCol}>
                                        <GridContainer className={classes.gridContent}>
                                            <Grid item xs={12} sm={4} md={2} align="left">
                                                <Typography component="div">
                                                    <Box component="label" fontSize={13} color="text.white">
                                                        {items[13].withdrawPassword}
                                                    </Box>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={8} md={10} align="left">
                                                <Typography component="div">
                                                    <Box component="div">
                                                        <InputBase className={classes.input}/>
                                                        <Box component="span" fontSize={12} ml={1}
                                                             color="text.darkgray">
                                                            {items[1].description}
                                                        </Box>
                                                    </Box>
                                                </Typography>
                                            </Grid>
                                        </GridContainer>
                                    </div>
                                </div>
                            </CardContent>

                            <CardContent className={classes.applyBtnStyle}>
                                <Button variant="contained" className={commonClasses.containedActionButton}
                                        onClick={onSubmit}>
                                    <Typography component="div">
                                        <Box component="div">
                                            <Box component="span" fontSize={20} ml={1}>
                                                {items[14].application}
                                            </Box>
                                        </Box>
                                    </Typography>
                                </Button>
                            </CardContent>
                        </form>

                        <div className={classes.tableTitle}>
                            <span>{items[15].withdrawHistory}
                                <small>{items[16].tableDes}</small>
                            </span>
                        </div>
                        <CardContent className={commonClasses.cardContent}>
                            <Table>
                                <TableHead className={commonClasses.tableHeader}>
                                    <TableRow>
                                        <TableCell align="center"
                                                   className={commonClasses.tableHeader1}>{items[17].number}</TableCell>
                                        <TableCell align="center"
                                                   className={commonClasses.tableHeader2}>{items[18].depositer}</TableCell>
                                        <TableCell align="center"
                                                   className={commonClasses.tableHeader2}>{items[19].applicationAmount}</TableCell>
                                        <TableCell align="center"
                                                   className={commonClasses.tableHeader2}>{items[20].date}</TableCell>
                                        <TableCell align="center"
                                                   className={commonClasses.tableHeader2}>{items[21].processingDate}</TableCell>
                                        <TableCell align="center"
                                                   className={commonClasses.tableHeader2}>{items[22].processingResult}</TableCell>
                                        <TableCell align="center"
                                                   className={commonClasses.tableHeader1}>{items[23].delete}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {withdrawalList.length > 0 ?
                                        withdrawalList.map((entry, index) => (
                                            <TableRow key={entry.seq}>
                                                <TableCell
                                                    align="center">{pageSize * (pageNo - 1) + (index + 1)}</TableCell>
                                                <TableCell align="center">{entry.accountHolder}</TableCell>
                                                <TableCell align="center">
                                                    <NumberFormat className={commonClasses.numberFormatStyle}
                                                                  value={entry.variableAmount} thousandSeparator
                                                                  isNumericString disabled/>
                                                    {items[24].won}
                                                </TableCell>
                                                <TableCell align="center">{entry.applicationTime}</TableCell>
                                                <TableCell align="center">{entry.processTime}</TableCell>
                                                <TableCell align="center"
                                                           className={classes.fontStyle}>{entry.status === 1 ? 'Complete' : 'Pending'}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton aria-label="delete" style={{color: 'grey'}}
                                                                onClick={() => deleteWithdrawalBySeq(entry.seq)}>
                                                        <DeleteIcon fontSize="small"/>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )) :
                                        <TableRow>
                                            <TableCell colSpan={12} align={'center'}>
                                                {items[25].noData}
                                            </TableCell>
                                        </TableRow>}
                                </TableBody>
                            </Table>
                            <Box className={clsx(commonClasses.root, commonClasses.contentCenter)}>
                                <Pagination count={totalPage}
                                            variant="outlined"
                                            shape="rounded"
                                            className={commonClasses.paginationBtn}
                                            hidePrevButton
                                            hideNextButton
                                            onChange={(e, page) => changePage(e, page)}/>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </GridContainer>

        </PageContainer>

    );
}

export default Withdraw;