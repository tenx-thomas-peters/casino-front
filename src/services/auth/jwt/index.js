import {fetchError, fetchStart, fetchSuccess} from '../../../redux/actions';
import {setAuthUser, setForgetPassMailSent, updateLoadUser} from '../../../redux/actions/Auth';
import React from 'react';
import {NotificationManager} from 'react-notifications';
import axios from '../../config';

const JWTAuth = {
    onRegister: ({id, name, nickname, password}) => {
        return dispatch => {
            dispatch(fetchStart());
            axios
                .post('auth/register', {
                    id: id,
                    name: name,
                    nickname: nickname,
                    password: password,
                })
                .then(({data}) => {
                    if (data.success) {
                        NotificationManager.success(data.message, 'SignUp');

                        localStorage.setItem('token', data.result.token);
                        localStorage.setItem('user', JSON.stringify(data.result.userInfo));

                        // axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token.access_token;
                        dispatch(fetchSuccess());
                        dispatch(JWTAuth.getAuthUser(true, data.result.token));
                    } else {
                        NotificationManager.error(data.message, 'SignUp');
                        dispatch(fetchError(data.error));
                    }
                })
                .catch(function (error) {
                    NotificationManager.error(error.message, 'SignUp');
                    dispatch(fetchError(error.message));
                });
        };
    },

    onLogin: (id, password) => {
        return dispatch => {
            try {
                dispatch(fetchStart());
                axios
                    .get('auth/signin', {params: {loginID: id, password: password}})
                    .then(({data}) => {
                        if (data.success) {
                            let userInfo = data.result.userInfo;
                            if (userInfo.status == 1) {
                                NotificationManager.success(data.message, 'SignIn');
                                dispatch(fetchSuccess());
    
                                localStorage.setItem('token', data.result.token);
                                localStorage.setItem('user', JSON.stringify(data.result.userInfo));
    
                                // JWTAuth.setCommonInfo(data.result);
    
                                dispatch(setAuthUser(data.result.userInfo));
    
                                window.location.href = '/user/home';
                            } else {
                                alert('정상이 아닌 회원입니다.');
                                dispatch(fetchError('정상이 아닌 회원입니다.'));
                            }
                        } else {
                            NotificationManager.error(data.message, 'SignIn');
                            dispatch(fetchError(data.error));
                        }
                    })
                    .catch(function (error) {
                        dispatch(fetchError(error.message));
                    });
            } catch (error) {
                dispatch(fetchError(error.message));
            }
        };
    },

    onLogout: () => {
        return dispatch => {
            dispatch(fetchStart());
            // axios
            //     .post('auth/logout')
            //     .then(({data}) => {
            //         if (data.success) {
            //             dispatch(fetchSuccess());
            //
            //             localStorage.removeItem('token');
            //             localStorage.removeItem('user');
            //
            //             dispatch(setAuthUser(null));
            //         } else {
            //             dispatch(fetchError(data.error));
            //         }
            //     })
            //     .catch(function (error) {
            //         dispatch(fetchError(error.message));
            //     });
            dispatch(fetchSuccess());

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('commonInfo');

            dispatch(setAuthUser(null));
        };
    },

    getAuthUser: (loaded = false, token) => {
        let userInfo = {name: '', password: ''};
        return dispatch => {
            if (!token) {
                token = localStorage.getItem('token');
            }

            userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : userInfo;
            // dispatch(fetchStart());
            dispatch(updateLoadUser(loaded));

            if (token) {
                axios
                    .get('auth/me', {params: {token: token, name: userInfo.name, password: userInfo.password}})
                    .then(({data}) => {
                        if (data.result) {
                            // dispatch(fetchSuccess());
                            JWTAuth.setCommonInfo(data.result);

                            localStorage.setItem('user', JSON.stringify(data.result.userInfo));

                            dispatch(setAuthUser(data.result.userInfo));
                        } else {
                            dispatch(updateLoadUser(true));
                        }
                    })
                    .catch(function (error) {
                        dispatch(updateLoadUser(true));
                    });
            } else {
                dispatch(updateLoadUser(true));
            }
        };
    },

    onForgotPassword: () => {
        return dispatch => {
            dispatch(fetchStart());

            setTimeout(() => {
                dispatch(setForgetPassMailSent(true));
                dispatch(fetchSuccess());
            }, 300);
        };
    },

    getSocialMediaIcons: () => {
        return <React.Fragment> </React.Fragment>;
    },

    setCommonInfo: (result) => {
        let noteCounts = result.noteCounts;
        let moneyAmount = result.moneyAmount;
        let casinoMoney = result.casinoMoney;
        let mileageAmount = result.mileageAmount;
        let houseMoney = result.houseMoney;
        let topRanking = result.topRanking;

        const commonInfo = {
            'noteCounts': noteCounts,
            'moneyAmount': moneyAmount,
            'casinoMoney': casinoMoney,
            'mileageAmount': mileageAmount,
            'houseMoney': houseMoney,
            'topRanking': topRanking
        };

        localStorage.setItem("commonInfo", JSON.stringify(commonInfo));
    }
};

export default JWTAuth;
