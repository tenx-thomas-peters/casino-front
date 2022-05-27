import React, {useState} from 'react';
import {
    Box,
    TextField,
    makeStyles,
    alpha,
    FormLabel,
    Button,
} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import commonStyles from '../../../@jumbo/common/common.style';
import {NotificationManager} from 'react-notifications';
import {AuthMethods} from '../../../services/auth';
import {CurrentAuthMethod} from '../../../@jumbo/constants/AppConstants';

const txt = {
    slotGame: <IntlMessages id={'home.gameCategory.slotGame'}/>,
    baccaratGame: <IntlMessages id={'home.gameCategory.baccaratGame'}/>,
    mostFavoriteSlotGames: <IntlMessages id={'home.mostFavoriteSlotGames'}/>,
    mostFavoriteBaccaratGames: <IntlMessages id={'home.mostFavoriteBaccaratGames'}/>,
    notice: <IntlMessages id={'home.notice'}/>,
    event: <IntlMessages id={'home.event'}/>,
    million: <IntlMessages id={'home.million'}/>,
    realtimeWithdrawStatus: <IntlMessages id={'home.realTimeWithdrawStatus'}/>
};

const useStyles = makeStyles(theme => ({
    rowRoot: {
        display: 'flex', 
        flexDirection: 'row', 
        height: '30px', 
        marginTop: '50px'
    },
    labelRoot: {
        display: 'flex',
        width: '100px',
        marginTop: '40px',
        fontSize: '15px',
        color: '#FFFFFF',        
    },

    textFieldRoot: {
        display: 'flex',
        width: '300px',
        height: '100%',

    }
}));

const UserRegister = () => {
    
    const classes = useStyles();
    const commonClasses = commonStyles();
    const dispatch = useDispatch();
    const method = CurrentAuthMethod;
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');

    const onRegister = () => {
        let referralCode = localStorage.getItem('referralCode')
        if (id.trim() === '' || nickname.trim() === '' || password.trim() === '') {
            NotificationManager.error('Please input required field!', 'Error');
            return;
        } else if (password.trim() !== confirmPassword.trim()) {
            NotificationManager.error('Password does not match.!', 'Error');
            return;
        } else {
            dispatch(AuthMethods[method].onRegister(id, id, nickname, password, referralCode));
        }
    }

    const onCancel = () => {
        localStorage.setItem('referralCode', '');
        window.location.href = '/user/home';
    }

    return (
        <PageContainer heading="Register">
            <Box style={{fontSize: 25}}>
                {<IntlMessages id="signup.user.title"/>}
            </Box>

            <Box>
                <Box className={classes.rowRoot}>
                    <FormLabel component="legend" className={classes.labelRoot}>
                        {<IntlMessages id="signup.user.id"/>}
                    </FormLabel>
                    <TextField
                        label={<IntlMessages id="signup.user.id.hint"/>}
                        fullWidth
                        onChange={event => setId(event.target.value)}
                        defaultValue={id}
                        margin="normal"
                        variant="outlined"
                        className={classes.textFieldRoot}
                        required={true}
                    />
                </Box>

                <Box className={classes.rowRoot}>
                    <FormLabel component="legend" className={classes.labelRoot}>
                        {<IntlMessages id="signup.user.password"/>}
                    </FormLabel>
                    <TextField
                        type="password"
                        label={<IntlMessages id="signup.user.password.hint"/>}
                        fullWidth
                        onChange={event => setPassword(event.target.value)}
                        defaultValue={password}
                        margin="normal"
                        variant="outlined"
                        className={classes.textFieldRoot}
                        required={true}
                    />
                </Box>

                <Box className={classes.rowRoot}>
                    <FormLabel component="legend" className={classes.labelRoot}>
                        {<IntlMessages id="signup.user.confirm_password"/>}
                    </FormLabel>
                    <TextField
                        type="password"
                        label={<IntlMessages id="signup.user.confirm_password.hint"/>}
                        fullWidth
                        onChange={event => setConfirmPassword(event.target.value)}
                        defaultValue={confirmPassword}
                        margin="normal"
                        variant="outlined"
                        className={classes.textFieldRoot}
                        required={true}
                    />
                </Box>

                <Box className={classes.rowRoot}>
                    <FormLabel component="legend" className={classes.labelRoot}>
                        {<IntlMessages id="signup.user.nick_name"/>}
                    </FormLabel>
                    <TextField
                        label={<IntlMessages id="signup.user.nick_name.hint"/>}
                        fullWidth
                        onChange={event => setNickname(event.target.value)}
                        defaultValue={nickname}
                        margin="normal"
                        variant="outlined"
                        className={classes.textFieldRoot}
                        required={true}
                    />
                </Box>

                <Button onClick={() => onRegister()} className={commonClasses.containedActionButton} autoFocus style={{width: '150px', padding: '12px', marginTop: '60px', marginLeft: '40px', borderRadius: '10px'}}>
                    <IntlMessages id={'signup.user.request'}/>
                </Button>

                <Button onClick={() => onCancel()} className={commonClasses.outlinedActionButton} autoFocus style={{width: '150px', padding: '12px', marginTop: '60px', marginLeft: '30px', borderRadius: '10px'}}>
                    <IntlMessages id={'signup.user.cancel'}/>
                </Button>
            </Box>
        </PageContainer>
    );
};

export default UserRegister;