import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router-dom';
import {NotificationManager} from 'react-notifications';

import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles, Box, Grid, Tooltip, Typography, Link, Button, alpha, TextField} from '@material-ui/core';
import SidebarToggleHandler from '../../../../../@coremat/CmtLayouts/Vertical/SidebarToggleHandler';
import LanguageSwitcher from '../LanguageSwitcher';

import IntlMessages from '../../../../utils/IntlMessages';
import {AuthMethods} from "../../../../../services/auth";
import {CurrentAuthMethod} from "../../../../constants/AppConstants";
import clsx from 'clsx';
import commonStyles from '../../../../common/common.style';

import axios from "axios";
import gameService from '../../../../../services/gameConfig';

const LinkRouter = props => <Link {...props} component={RouterLink}/>;

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        paddingLeft: 16,
        paddingRight: 16,
        minHeight: 64,
        [theme.breakpoints.up('md')]: {
            minHeight: 72,
        },
        [theme.breakpoints.up('md')]: {
            paddingLeft: 24,
            paddingRight: 24,
        },
    },
    langRoot: {
        borderLeft: `solid 1px ${alpha(theme.palette.common.dark, 0.15)}`,
        minHeight: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 8,
        paddingRight: 8,
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
            minHeight: 64,
        },
    },
    iconBtn: {
        color: alpha(theme.palette.common.white, 0.38),
        '&:hover, &:focus': {
            color: theme.palette.common.white,
        },
    },
    logoutBtn: {
        background: '#1e1f21',
        color: '#caa516',
        padding: '10px',
        border: '1px solid #715a0a',
        borderRadius: '20px'
    },
    notice: {
        color: '#fff',
        padding: '10px',
        border: '1px solid #715a0a',
        borderRadius: '5px',
        marginRight: '10px',
        '&.active': {
            background: '#1e1f21',
        },
    },
    user: {
        padding: '12px 15px',
        display: 'inline-block',
        background: 'linear-gradient(to right, #c59e31,#e1c864,#c59e31)',
        borderRadius: '50%',
        color: '#000',
        fontSize: '20px',
    },
    box: {
        background: '#1e1f21',
        borderRadius: '30px',
        marginRight: '20px',
        '& span': {
            marginLeft: '5px'
        }
    },
    btn: {
        marginLeft: '5px',
        padding: '7px 5px',
        borderRadius: '30px'
    },
    link: {
        textDecoration: 'none',
        '&:hover, &:focus': {
            textDecoration: 'none',
        }
    },
    textFieldError: {
        '& label': {
            color: '#f44336'
        },
        '& fieldset': {
            borderColor: '#f44336'
        }
    }
}));

const Header = ({method = CurrentAuthMethod, commonInfo}) => {
    const {authUser} = useSelector(({auth}) => auth);
    const classes = useStyles();
    const commonClasses = commonStyles();
    const dispatch = useDispatch();

    const [member, setMember] = useState();
    const [noteCounts, setNoteCounts] = useState(0);
    const [moneyAmount, setMoneyAmount] = useState(0);
    const [casinoMoney, setCasinoMoney] = useState(0);
    const [mileageAmount, setMileageAmount] = useState(0);

    const [id, setId] = useState('');
    const [idError, setIdError] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    let totalMoney = 0;
    useEffect(() => {
        let userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if (userInfo) {
            setMember(userInfo);
        }
    }, []);

    useEffect(() => {
        if (commonInfo) {
            setNoteCounts(commonInfo.noteCounts);
            setMoneyAmount(commonInfo.moneyAmount);
            setCasinoMoney(commonInfo.casinoMoney);
            setMileageAmount(commonInfo.mileageAmount);
        }
    }, [commonInfo]);

    const logout = (event) => {
        event.preventDefault();
        window.clearInterval(window);
        dispatch(AuthMethods[method].onLogout());
    };

    const login = (event) => {
        event.preventDefault();
        if (id.trim() === '') {
            setIdError(true);
        } else {
            setIdError(false);
        }

        if (password.trim() === '') {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }

        if (id.trim() === '' || password.trim() === '') {
            NotificationManager.error('Please input required field', 'Error');
            return;
        }

        // TODO
        // game api - /user/refresh-token
        /**
         * game server api = /user/refresh-token
         */
        /*
        gameService.patch('/user/refresh-token')
            .then(res => {
                if (res.status === 200) {
                    localStorage.setItem('server_token', res.token);
                    dispatch(AuthMethods[method].onLogin(name, password));
                } else {
                    NotificationManager.error(res.errors.username, 'Error');
                }
            })
            .catch(function (err) {
                NotificationManager.error(err.message, 'Error');
            });
        */

        // axios.patch('/user/refresh-token', {params: {username: id}})
        //     .then(res => {
        //         if (res.status === 200) {
        //             localStorage.setItem('server_token', res.data.token);
                    dispatch(AuthMethods[method].onLogin(id, password));
            //     } else {
            //         NotificationManager.error(res.errors.username, 'Error');
            //     }
            // })
            // .catch(function (err) {
            //     NotificationManager.error(err.message, 'Error');
            // });
    };

    return (
        <Toolbar className={classes.root}>
            <SidebarToggleHandler edge="start" color="inherit" aria-label="menu"/>
            {/*<Logo ml={2} color="white" />*/}
            <Box flex={1} className={commonClasses.hiddenSm}>
                <a href="/" className={clsx(classes.notice, 'active')}><IntlMessages id={'header.notice'}/></a>
                <a href="/" className={classes.notice}><IntlMessages id={'header.lineNotice'}/></a>
            </Box>
            {
                authUser
                    ?
                    <Box pr={2} className={classes.box}>
                        <Tooltip title="Notifications">
                            <Grid container>
                                <Grid item md={12}>
                                    <i className={clsx(classes.user, 'iconfont icon-huiyuan2')}></i>
                                    <Typography component={'span'} variant={'inherit'}
                                                style={{display: 'inline-block', marginLeft: '5px'}}>
                                        {member ? member.id : ''}
                                        <LinkRouter color='inherit' to={"/user/note"} className={classes.link}>
                                            <i className={'iconfont icon-caidan'}>
                                                <IntlMessages id={"header.note"}/>&nbsp;{noteCounts}<IntlMessages
                                                id={"header.note.count"}/>
                                            </i>
                                        </LinkRouter>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Tooltip>
                    </Box>
                    :
                    ''
            }
            {
                authUser
                    ?
                    <Box pr={2} className={classes.box}>
                        <Tooltip title="Money">
                            <Grid container>
                                <Grid item md={12}>
                                    <i className={clsx(classes.user, 'iconfont icon-nsiconkrb')}></i>
                                    <Typography component={'span'} variant={'inherit'} style={{display: 'inline-block', marginLeft: '5px'}}>
                                        <IntlMessages id={'header.amountMoney'}/>
                                        <span style={{color: '#e8de0d'}}>{!isNaN(moneyAmount+casinoMoney)? moneyAmount+casinoMoney:0 }</span>&nbsp;
                                        <IntlMessages id={"header.money.yen"}/>
                                        <Button variant="contained" color="secondary" className={classes.btn}>
                                            <IntlMessages id={"header.updateMoney"}/>
                                        </Button>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Tooltip>
                    </Box>
                    :
                    <Box pr={2} className={commonClasses.hiddenSm}>
                        <TextField
                            label={<IntlMessages id="appModule.id"/>}
                            fullWidth
                            onChange={event => setId(event.target.value)}
                            defaultValue={id}
                            margin="normal"
                            variant="outlined"
                            className={idError ? classes.textFieldError : ''}
                            required
                        />
                    </Box>
            }
            {
                authUser
                    ?
                    <Box pr={2} className={classes.box}>
                        <Tooltip title="Point">
                            <Grid container>
                                <Grid item md={12}>
                                    <i className={clsx(classes.user, 'iconfont icon-hearts')}></i>
                                    <span>
                                <IntlMessages id={"header.point"}/>
                                <span style={{color: '#bb2322'}}>{mileageAmount ? mileageAmount : 0}</span>&nbsp;
                                        <IntlMessages id={"header.point"}/>
                                <i className={clsx('iconfont icon-zhuanhuan4')}
                                   style={{color: '#757978', marginLeft: '5px'}}></i>
                            </span>
                                </Grid>
                            </Grid>
                        </Tooltip>
                    </Box>
                    :
                    <Box pr={2} className={commonClasses.hiddenSm}>
                        <TextField
                            type="password"
                            label={<IntlMessages id="appModule.password"/>}
                            fullWidth
                            onChange={event => setPassword(event.target.value)}
                            defaultValue={password}
                            margin="normal"
                            variant="outlined"
                            className={passwordError ? classes.textFieldError : ''}
                            required
                        />
                    </Box>
            }
            <Box className={classes.langRoot}>
                <LanguageSwitcher/>
            </Box>
            {
                authUser
                    ?
                    <Box className={classes.langRoot}>
                        <a href="/" className={clsx(classes.logoutBtn)} onClick={logout}><IntlMessages id={'header.logout'}/></a>
                    </Box>
                    :
                    <Box className={classes.langRoot}>
                        <a href="/" className={clsx(classes.logoutBtn, commonClasses.hiddenXs)} onClick={login}><IntlMessages id={'header.login'}/></a>
                        <a href="/signin" className={clsx(classes.logoutBtn, commonClasses.showXs)}><IntlMessages id={'header.login'}/></a>
                    </Box>
            }
            {
                authUser
                    ?
                    ''
                    :
                    <Box className={classes.langRoot}>
                        <a href="/signup" className={clsx(classes.logoutBtn, commonClasses.hiddenXs)}><IntlMessages id={'header.signup'}/></a>
                    </Box>
            }
        </Toolbar>
    );
};

export default Header;
