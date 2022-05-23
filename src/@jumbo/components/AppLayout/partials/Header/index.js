import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router-dom';
import {NotificationManager} from 'react-notifications';

import Toolbar from '@material-ui/core/Toolbar';
import {
    makeStyles,
    Box,
    Grid,
    Tooltip,
    Typography,
    Link,
    Button,
    alpha,
    TextField,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    DialogActions,
    useMediaQuery,
    useTheme,
    Menu,
    MenuItem,
    FormControlLabel,
    Checkbox
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SidebarToggleHandler from '../../../../../@coremat/CmtLayouts/Vertical/SidebarToggleHandler';
import LanguageSwitcher from '../LanguageSwitcher';
import {setSigninPopup} from '../../../../../redux/actions/Auth';
import IntlMessages from '../../../../utils/IntlMessages';
import {AuthMethods} from "../../../../../services/auth";
import {CurrentAuthMethod} from "../../../../constants/AppConstants";
import clsx from 'clsx';
import commonStyles from '../../../../common/common.style';
import HomeAPI from '../../../../../services/api/apps/home';

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
        '@media screen and (max-width: 1550px)': {
            fontSize: '12px'
        }
    },
    langRoot: {
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
        borderRadius: '20px',
        cursor: 'pointer'
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
        '@media screen and (max-width: 1700px)': {
            padding: '5px'
        }
    },
    user: {
        padding: '12px 15px',
        display: 'inline-block',
        background: 'linear-gradient(to right, #c59e31,#e1c864,#c59e31)',
        borderRadius: '50%',
        color: '#000',
        fontSize: '20px',
        '@media screen and (max-width: 1700px)': {
            padding: '4px 7px',
            fontSize: '15px'
        }
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
        padding: '7px 5px !important',
        borderRadius: '30px !important',
        '@media screen and (max-width: 1700px)': {
            padding: '4px 3px !important',
        }
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
    },
    signUpModal: {
        '& .MuiPaper-root': {
            borderRadius: '10px',
            backgroundColor: '#2f2f38',
            width: '500px',
            paddingBottom: '20px'
        },
        '& #responsive-dialog-title span': {
            cursor: 'pointer',
            float: 'right',
            padding: '10px 10px 5px',
            background: '#181a27',
            borderBottomLeftRadius: '10px',
            color: '#efb221'
        }
    },
    referralField: {
        '& fieldset': {
            borderRadius: '10px',
            '& legend span' :{
                width:'200px'
            }
        }
    },
    inlineNotice: {
        whiteSpace: 'nowrap',
        width: '300px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'inline-block',
        verticalAlign: 'middle',
        '@media screen and (max-width: 1700px)': {
            width: '200px'
        },
        '@media screen and (max-width: 1143px)': {
            display: 'none'
        }
    },
    popupDialog: {
        '& .MuiBackdrop-root': {
            backgroundColor: 'transparent'
        },
        '& .MuiDialog-paper': {
            position: 'absolute',
            minWidth: '450px',
            left: '304px',
            top: '60px',
            backgroundColor: '#151a1d'
        },
        '& .MuiDialogActions-root': {
            backgroundColor: '#77787b'
        }
    },

    mpointer:{
        cursor: "pointer"
    }
}));

const Header = ({method = CurrentAuthMethod, commonInfo}) => {

    const {authUser, signinPopup} = useSelector(({auth}) => auth);
    const classes = useStyles();
    const commonClasses = commonStyles();
    const dispatch = useDispatch();

    const [member, setMember] = useState();
    const [noteCounts, setNoteCounts] = useState(0);
    const [moneyAmount, setMoneyAmount] = useState(0);
    const [casinoMoney, setCasinoMoney] = useState(0);
    const [mileageAmount, setMileageAmount] = useState(0);
    const [inlineNotice, setInlineNotice] = useState(0);
    const [popupNotice, setPopupNotice] = useState([]);

    const [id, setId] = useState('');
    const [idError, setIdError] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const [signupOpen, setSignupOpen] = useState(false);
    const [signinOpen, setSigninOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [referralCode, setReferralCode] = useState('');
    const [referralCodeError, setReferralCodeError] = useState('');

    const [isRecommeded, setIsRecommeded] = useState(false);
    const [isPopupShowed, setIsPopupShowed] = useState(false);

    const [signinPopupId, setSigninPopupId] = useState('');
    const [signinPopupIdError, setSigninPopupIdError] = useState('');
    const [signinPopupPassword, setSigninPopupPassword] = useState('');
    const [signinPopupPasswordError, setSigninPopupPasswordError] = useState('');


    const handleClose = () => {
        setSignupOpen(false);
        setSigninOpen(false);
        setReferralCode('');
        setTimeout(() => {
            setIsRecommeded(false);
        }, 500);
    };

    const handleNext = () => {
        if (referralCode.trim() === '') {
            setReferralCodeError(true);
        } else {
            setReferralCodeError(false);
            setIsRecommeded(true);
        }
    };

    let totalMoney = 0;
    useEffect(() => {
        let userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if (userInfo) {
            setMember(userInfo);
        }
    }, []);

    // dragon_5
    useEffect(() => {
        if (!authUser && localStorage.getItem('signinPopupFlag') == "true") {
            setSigninOpen(true);
            localStorage.setItem('signinPopupFlag', "false");
        }
    }, [localStorage.getItem('signinPopupFlag')]);

    useEffect(() => {
        if (commonInfo) {
            setInlineNotice(commonInfo.inlineNotice);
            setNoteCounts(commonInfo.noteCounts);
            setMoneyAmount(commonInfo.moneyAmount);
            setCasinoMoney(commonInfo.casinoMoney);
            setMileageAmount(commonInfo.mileageAmount);
            setPopupNotice(commonInfo.popupNotice);

            if (!isPopupShowed) {
                setIsPopupShowed(localStorage.getItem("hidePopup") === "true" ? true : false);
            }

            if (!isPopupShowed && popupNotice !== undefined && popupNotice.length !== 0) {
                setIsPopupShowed(true);
                setPopupOpen(true);
            }
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

    const popupLogin = () => {
        if (signinPopupId.trim() === '') {
            setSigninPopupIdError('Please input required field');
        } else {
            setSigninPopupIdError('');
        }

        if (signinPopupPassword.trim() === '') {
            setSigninPopupPasswordError('Please input required field');
        } else {
            setSigninPopupPasswordError('');
        }

        if (signinPopupId.trim() === '' || signinPopupPassword.trim() === '') {
            NotificationManager.error('Please input required field', 'Error');
            return;
        }
        setSigninOpen(false);
        dispatch(AuthMethods[method].onLogin(signinPopupId, signinPopupPassword));
    };

    const exchangeMileage= (event) => {
        let userSeq = member.seq;
        console.log(userSeq);
        HomeAPI.exchangePoint({userSeq})
            .then((res) => {
                if (res.data.success) {
                    setMember(res.data.result)
                    // console.log(res.data.result);
                }
            })
    }

    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');

    const onSubmit = () => {
        if (name.trim() === '' || nickname.trim() === '' || password.trim() === '') {
            NotificationManager.error('Please input required field!', 'Error');
            return;
        } else {
            dispatch(AuthMethods[method].onRegister(name, name, nickname, password));

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    };

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const infoClose = () => {
        setAnchorEl(null);
    };

    const descriptionElementRef = React.useRef(null);
    const [popupOpen, setPopupOpen] = useState(false);

    useEffect(() => {
        if (popupOpen) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [popupOpen]);

    const handlePopupClose = () => {
        setPopupOpen(false);
    };

    const [state, setState] = React.useState({
        checkedB: false
    });

    const handleChange = event => {
        setState({ ...state, [event.target.name]: event.target.checked });
        localStorage.setItem("hidePopup", event.target.checked);
    };

    const renderRow = (item, index) => {
        return (
            <span key={index} style={{display: 'block'}}>
                <span style={{margin: '20px 0', display: 'block'}}>
                    {item.title}
                </span>
                <span>
                    {item.content}
                </span>
            </span>
        );
    };

    return (
        <Toolbar className={classes.root}>
            <SidebarToggleHandler edge="start" color="inherit" aria-label="menu"/>
            {/*<Logo ml={2} color="white" />*/}
            <Box flex={1} className={commonClasses.hiddenSm}>
                <span className={clsx(classes.notice, 'active')}><IntlMessages id={'header.notice'}/></span>
                <span className={classes.inlineNotice}>
                    {inlineNotice}
                </span>
            </Box>
            {
                authUser
                    ?
                    <Box pr={2} className={clsx(classes.box)}>
                        <Tooltip title="Notifications" className={commonClasses.hiddenMd}>
                            <Grid container>
                                <Grid item md={12}>
                                    <i className={clsx(classes.user, 'iconfont icon-huiyuan2')}></i>
                                    <Typography component={'span'} variant={'inherit'} style={{display: 'inline-block', marginLeft: '5px'}}>
                                        {member ? member.id : ''}
                                        <LinkRouter color='inherit' to={"/user/note"} className={classes.link}>
                                            <i className={'iconfont icon-caidan'}>
                                                <IntlMessages id={"header.note"}/>&nbsp;{noteCounts}<IntlMessages id={"header.note.count"}/>
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
                    <Box pr={2} className={clsx(classes.box)}>
                        <Tooltip title="Money" className={commonClasses.hiddenMd}>
                            <Grid container>
                                <Grid item md={12}>
                                    <i className={clsx(classes.user, 'iconfont icon-nsiconkrb')}></i>
                                    <Typography component={'span'} variant={'inherit'} style={{display: 'inline-block', marginLeft: '5px'}}>
                                        <IntlMessages id={'header.amountMoney'}/>
                                        <span style={{color: '#e8de0d'}}>{!isNaN(moneyAmount+casinoMoney)? numberWithCommas(moneyAmount+casinoMoney):0 }</span>&nbsp;
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
                    <Box pr={2} className={clsx(classes.box)}>
                        <Tooltip title="Point" className={commonClasses.hiddenMd}>
                            <Grid container>
                                <Grid item md={12}>
                                    <i className={clsx(classes.user, 'iconfont icon-hearts')}></i>
                                    <a onClick={exchangeMileage} className={classes.mpointer}>
                                        <span>
                                            <IntlMessages id={"header.point"}/>
                                            <span style={{color: '#bb2322'}}>{mileageAmount ? mileageAmount : 0}</span>&nbsp;
                                                    point
                                            <i className={clsx('iconfont icon-zhuanhuan4')}
                                               style={{color: '#757978', marginLeft: '5px'}}></i>
                                        </span>
                                    </a>
                                </Grid>
                            </Grid>
                        </Tooltip>
                        <Tooltip title="Notifications" className={commonClasses.showMd}>
                            <Box>
                                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                    <i className={clsx(classes.user, 'iconfont icon-huiyuan2')}></i>
                                </Button>
                                <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={infoClose}>
                                    <MenuItem onClick={infoClose}>
                                        <Grid container>
                                            <Grid item md={12}>
                                                <i className={clsx(classes.user, 'iconfont icon-huiyuan2')}></i>
                                                <Typography component={'span'} variant={'inherit'} style={{display: 'inline-block', marginLeft: '5px'}}>
                                                    {member ? member.id : ''}
                                                    <LinkRouter color='inherit' to={"/user/note"} className={classes.link}>
                                                        <i className={'iconfont icon-caidan'}>
                                                            <IntlMessages id={"header.note"}/>&nbsp;{noteCounts}<IntlMessages id={"header.note.count"}/>
                                                        </i>
                                                    </LinkRouter>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </MenuItem>
                                    <MenuItem onClick={infoClose}>
                                        <Grid container>
                                            <Grid item md={12}>
                                                <i className={clsx(classes.user, 'iconfont icon-nsiconkrb')}></i>
                                                <Typography component={'span'} variant={'inherit'} style={{display: 'inline-block', marginLeft: '5px'}}>
                                                    <IntlMessages id={'header.amountMoney'}/>
                                                    <span style={{color: '#e8de0d'}}>{moneyAmount ? moneyAmount : 0}</span>&nbsp;
                                                    <IntlMessages id={"header.money.yen"}/>
                                                    <Button variant="contained" color="secondary" className={classes.btn}>
                                                        <IntlMessages id={"header.updateMoney"}/>
                                                    </Button>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </MenuItem>
                                    <MenuItem onClick={infoClose}>
                                        <Grid container>
                                            <Grid item md={12}>
                                                <i className={clsx(classes.user, 'iconfont icon-hearts')}></i>
                                                <Typography component={'span'} variant={'inherit'} style={{display: 'inline-block', marginLeft: '5px'}}>
                                                    <IntlMessages id={"header.point"}/>
                                                    <span style={{color: '#bb2322'}}>{mileageAmount ? mileageAmount : 0}</span>&nbsp;<IntlMessages id={"header.point"}/>
                                                    <i className={clsx('iconfont icon-zhuanhuan4')} style={{color: '#757978', marginLeft: '5px'}}></i>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </MenuItem>
                                </Menu>
                            </Box>
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
                        <span className={clsx(classes.logoutBtn, commonClasses.hiddenXs)} onClick={() => setSignupOpen(true)}><IntlMessages id={'header.signup'}/></span>
                    </Box>
            }

            <Dialog
                className={classes.popupDialog}
                open={popupOpen}
                onClose={handleClose}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description">
                <DialogContent>
                    <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
                        {
                            popupNotice && popupNotice.length > 0 ? popupNotice.map((item, index) => renderRow(item, index)) : ''
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <FormControlLabel
                        style={{position: 'absolute', left: '10px'}}
                        control={<Checkbox checked={state.checkedB} onChange={handleChange} name="checkedB" color="primary" />}
                        label={<IntlMessages id={"home.popupAlarm"}/>}/>
                    <Button onClick={handlePopupClose}>
                        <IntlMessages id={"home.close"}/>
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog className={classes.signUpModal} fullScreen={fullScreen} open={signupOpen} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title" style={{padding: '0'}}>
                    <span onClick={handleClose}><CloseIcon /></span>
                </DialogTitle>
                <DialogContent>
                    {
                        isRecommeded
                            ?
                            <form>
                                <Box mb={2}>
                                    <TextField
                                        label={<IntlMessages id="appModule.name"/>}
                                        fullWidth
                                        onChange={event => setName(event.target.value)}
                                        defaultValue={name}
                                        margin="normal"
                                        variant="outlined"
                                        className={classes.textFieldRoot}
                                        required={true}
                                    />
                                </Box>
                                <Box mb={2}>
                                    <TextField
                                        label={<IntlMessages id="appModule.nickname"/>}
                                        fullWidth
                                        onChange={event => setNickname(event.target.value)}
                                        defaultValue={nickname}
                                        margin="normal"
                                        variant="outlined"
                                        className={classes.textFieldRoot}
                                        required={true}
                                    />
                                </Box>
                                <Box mb={2}>
                                    <TextField
                                        type="password"
                                        label={<IntlMessages id="appModule.password"/>}
                                        fullWidth
                                        onChange={event => setPassword(event.target.value)}
                                        defaultValue={password}
                                        margin="normal"
                                        variant="outlined"
                                        className={classes.textFieldRoot}
                                        required={true}
                                    />
                                </Box>
                                <Box
                                    display="flex"
                                    flexDirection={{xs: 'column', sm: 'row'}}
                                    alignItems={{sm: 'center'}}
                                    justifyContent={{sm: 'space-between'}}
                                    mb={3}>
                                    <Box mb={{xs: 2, sm: 0}}>
                                        <Button onClick={onSubmit} variant="contained" color="primary">
                                            <IntlMessages id="appModule.regsiter"/>
                                        </Button>
                                    </Box>
                                </Box>
                            </form>
                            :
                            <Box pr={2} className={commonClasses.hiddenSm} style={{padding: '0 20px'}}>
                                <h2 style={{color: '#efb221', textAlign:'center', fontSize: '40px', fontWeight: '900', marginBottom: '20px'}}><IntlMessages id={'signup.title'}/></h2>
                                <span><IntlMessages id={'signup.referralCode'}/></span>
                                <TextField
                                    type="text"
                                    label={<IntlMessages id="signup.referralCodeInput"/>}
                                    fullWidth
                                    onChange={event => setReferralCode(event.target.value)}
                                    defaultValue={referralCode}
                                    margin="normal"
                                    variant="outlined"
                                    className={referralCodeError ? clsx(classes.textFieldError, classes.referralField) : classes.referralField}
                                    required
                                    style={{background: '#1e1f21', borderRadius: '10px'}}
                                />
                                <Button onClick={handleNext} className={commonClasses.containedActionButton} autoFocus style={{width: '100%', padding: '12px 0', marginTop: '15px', borderRadius: '10px'}}>
                                    <IntlMessages id={'signup.next'}/>
                                </Button>
                            </Box>
                    }
                </DialogContent>
            </Dialog>

            {/* dragon_5 */}
            <Dialog className={classes.signUpModal} fullScreen={fullScreen} open={signinOpen} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title" style={{padding: '0'}}>
                    <span onClick={handleClose}><CloseIcon /></span>
                </DialogTitle>
                <DialogContent>
                    <Box pr={2} className={commonClasses.hiddenSm} style={{padding: '0 20px'}}>
                        <h2 style={{color: '#efb221', textAlign:'center', fontSize: '40px', fontWeight: '900', marginBottom: '20px'}}><IntlMessages id={'signup.title'}/></h2>
                        <span><IntlMessages id={'signin.id'}/></span>
                        <TextField
                            type="text"
                            label={<IntlMessages id="signin.id.hint"/>}
                            fullWidth
                            onChange={event => setSigninPopupId(event.target.value)}
                            defaultValue={signinPopupId}
                            margin="normal"
                            variant="outlined"
                            className={signinPopupIdError ? clsx(classes.textFieldError, classes.referralField) : classes.referralField}
                            required
                            style={{background: '#1e1f21', borderRadius: '10px', marginBottom: '30px'}}
                        />
                        <span><IntlMessages id={'signin.password'}/></span>
                        <TextField
                            type="text"
                            label={<IntlMessages id="signin.password.hint"/>}
                            fullWidth
                            onChange={event => setSigninPopupPassword(event.target.value)}
                            defaultValue={signinPopupPassword}
                            margin="normal"
                            variant="outlined"
                            secureTextEntry={true}
                            className={signinPopupPasswordError ? clsx(classes.textFieldError, classes.referralField) : classes.referralField}
                            required
                            style={{background: '#1e1f21', borderRadius: '10px'}}
                        />
                        <Button onClick={() => popupLogin()} className={commonClasses.containedActionButton} autoFocus style={{width: '100%', padding: '12px 0', marginTop: '15px', borderRadius: '10px'}}>
                            <IntlMessages id={'header.login'}/>
                        </Button>
                        
                        <Box mb={2} style={{marginTop: '20px'}}>
                            <span style={{marginLeft: '50px'}}><IntlMessages id={'signin.no.account'}/></span>
                            <span style={{color: '#efb221', textAlign:'center', fontSize: '20px', fontWeight: '500', marginLeft: '10px'}} onClick={() => {
                                setSigninOpen(false);
                                setSignupOpen(true);
                            }}><IntlMessages id={'signin.free.signup'}/></span>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>

        </Toolbar>
    );
};

export default Header;
