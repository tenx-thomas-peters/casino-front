import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import IntlMessages from '../../../utils/IntlMessages';
import {useDispatch} from 'react-redux';
import Button from '@material-ui/core/Button';
import {Box} from '@material-ui/core';
import {AuthMethods} from '../../../../services/auth';
import ContentLoader from '../../ContentLoader';
import {alpha, makeStyles} from '@material-ui/core/styles';
import CmtImage from '../../../../@coremat/CmtImage';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {CurrentAuthMethod} from '../../../constants/AppConstants';
import {NavLink} from 'react-router-dom';
import AuthWrapper from './AuthWrapper';
import {NotificationManager} from 'react-notifications';

import axios from 'axios';
import gameService from '../../../../services/gameConfig';

const useStyles = makeStyles(theme => ({
    authThumb: {
        backgroundColor: alpha(theme.palette.primary.main, 0.12),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '50%',
            order: 2,
        },
    },
    authContent: {
        padding: 30,
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: props => (props.variant === 'default' ? '50%' : '100%'),
            order: 1,
        },
        [theme.breakpoints.up('xl')]: {
            padding: 50,
        },
    },
    titleRoot: {
        marginBottom: 14,
        color: theme.palette.text.primary,
    },
    textFieldRoot: {
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(theme.palette.common.dark, 0.12),
        },
    },
    formcontrolLabelRoot: {
        '& .MuiFormControlLabel-label': {
            [theme.breakpoints.down('xs')]: {
                fontSize: 12,
            },
        },
    },
}));
//variant = 'default', 'standard'
const SignIn = ({method = CurrentAuthMethod, variant = 'default', wrapperVariant = 'default'}) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const classes = useStyles({variant});

    const onSubmit = () => {
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

        // axios.patch('/user/refresh-token', {params: {username: name}})
        //     .then(res => {
        //         if (res.status === 200) {
        //             localStorage.setItem('server_token', res.data.token);
                    dispatch(AuthMethods[method].onLogin(name, password));
            //     } else {
            //         NotificationManager.error(res.errors.username, 'Error');
            //     }
            // })
            // .catch(function (err) {
            //     NotificationManager.error(err.message, 'Error');
            // });

    };

    return (
        <AuthWrapper variant={wrapperVariant}>
            {variant === 'default' ? (
                <Box className={classes.authThumb}>
                    <CmtImage src={'/images/auth/login-img.png'}/>
                </Box>
            ) : null}
            <Box className={classes.authContent}>
                <Box mb={7}>
                    <CmtImage src={'/images/logo.png'}/>
                </Box>
                <Typography component="div" variant="h1" className={classes.titleRoot}>
                    Login
                </Typography>
                <form>
                    <Box mb={2}>
                        <TextField
                            label={<IntlMessages id="appModule.email"/>}
                            fullWidth
                            onChange={event => setName(event.target.value)}
                            defaultValue={name}
                            margin="normal"
                            variant="outlined"
                            className={classes.textFieldRoot}
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
                        />
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
                        <FormControlLabel
                            className={classes.formcontrolLabelRoot}
                            control={<Checkbox name="checkedA"/>}
                            label="Remember me"
                        />
                        <Box component="p" fontSize={{xs: 12, sm: 16}}>
                            <NavLink to="/forgot-password">
                                <IntlMessages id="appModule.forgotPassword"/>
                            </NavLink>
                        </Box>
                    </Box>

                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
                        <Button onClick={onSubmit} variant="contained" color="primary">
                            <IntlMessages id="appModule.signIn"/>
                        </Button>

                        <Box component="p" fontSize={{xs: 12, sm: 16}}>
                            <NavLink to="/signup">
                                <IntlMessages id="signIn.signUp"/>
                            </NavLink>
                        </Box>
                    </Box>
                </form>

                {dispatch(AuthMethods[method].getSocialMediaIcons())}

                <ContentLoader/>
            </Box>
        </AuthWrapper>
    );
};

export default SignIn;
