import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {
    Grid,
    Checkbox,
} from '@material-ui/core';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import GridContainer from '../../../@jumbo/components/GridContainer';

import CasinoCarousel from "../../components/Carousel";
import GameCards from "../../components/GameCards";
import JackpotView from "../../components/Jackpot";
import NoticeView from "../../components/NoticeView";
import EventView from "../../components/NoticeView";
import WithdrawStatusView from "../../components/WithdrawStatusView";

import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import {CommonConstants} from "../Common/Constants";
import HomeAPI from '../../../services/api/apps/home';
import {gameData} from "../../../@fake-db/users/game-list";
import NoticeAPI from '../../../services/api/apps/notice';
import { camelCase } from 'lodash';

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

const UserHome = () => {
    const {authUser} = useSelector(({auth}) => auth);
    const [jackpotAmount, setJackpotAmount] = useState(0);
    const [recentNotice, setRecentNotice] = useState(null);
    const [recentEvent, setRecentEvent] = useState(null);
    const [recentWithdraw, setRecentWithdraw] = useState([]);
    const [popupList, setPopupList] = useState([]);
    const todayString = moment(new Date()).format("YYYY-MM-DD");

    const setJackpot = () => {
        let commonInfo = localStorage.getItem('commonInfo') ? JSON.parse(localStorage.getItem('commonInfo')) : null;
        if (commonInfo) {
            setJackpotAmount(commonInfo.jackpotAmount);
        }
    };

    const handleChange = (event, item) => {
        let popupDateInfo = localStorage.getItem('popupDateInfo') ? JSON.parse(localStorage.getItem('popupDateInfo')) : {};
        if (event.target.checked) {
            popupDateInfo[item.seq] = todayString;
        } else {
            popupDateInfo[item.seq] = '';
        }
        localStorage.setItem("popupDateInfo", JSON.stringify(popupDateInfo));
    };

    const onClosePopup = (item) => {
        var array = [...popupList];
        var index = array.indexOf(item);
        if (index !== -1) {
            array.splice(index, 1);
            setPopupList(array);
        }
    }

    useEffect(() => {
        // dragon_8
        NoticeAPI.getPopupList()
            .then(res => {
                if (res.data.success) {
                    let popupDateInfo = localStorage.getItem('popupDateInfo') ? JSON.parse(localStorage.getItem('popupDateInfo')) : null;
                    let popups = [];
                    res.data.result.popupNotice.map(item => {
                        if (popupDateInfo) {
                            if (popupDateInfo[item.seq] != todayString) {
                                popups = [...popups, item];
                            }
                        } else {
                            popups = [...popups, item];
                        }
                    })
                    setPopupList(popups);
                }
            })
            .catch(function (err) {
            });
    }, [])

    useEffect(() => {
        setJackpot();
        let interval;
        if (authUser) {
             interval = setInterval(() => {
                setJackpot();

                HomeAPI.getHomeInfo()
                    .then(res => {
                        if (res.data.success) {
                            setRecentNotice(res.data.result.notice);
                            setRecentEvent(res.data.result.event);
                            setRecentWithdraw(res.data.result.withdraw);
                        }
                    });
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [jackpotAmount, authUser]);

    return (
        <PageContainer heading="Home">
            <GridContainer>
                <Grid item xs={12} sm={12} md={12}>
                    <CasinoCarousel/>
                </Grid>
            </GridContainer>
            <GridContainer>
                <Grid item xs={12} sm={12} md={12}>
                    <JackpotView jackpotAmount={jackpotAmount}/>
                </Grid>
            </GridContainer>
            <GridContainer>
                <Grid item xs={12} sm={12} md={12}>
                    <GameCards
                        gameType={CommonConstants.gameTypeSlot}
                        title={txt.slotGame}
                        subTitle={txt.mostFavoriteSlotGames}
                        url={"/user/slot"}
                        icon={'iconfont icon-icon_lib_slots'}
                        categoryList={gameData.category.slot}
                    />
                </Grid>
            </GridContainer>
            <GridContainer>
                <Grid item xs={12} sm={12} md={12}>
                    <GameCards
                        gameType={CommonConstants.gameTypeSlot}
                        title={txt.baccaratGame}
                        subTitle={txt.mostFavoriteBaccaratGames}
                        url={"/user/baccarat"}
                        icon={'iconfont icon-poker1'}
                        categoryList={gameData.category.slot}
                    />
                </Grid>
            </GridContainer>
            <GridContainer style={{marginTop: '20px'}}>
                <Grid item xs={12} sm={12} md={4}>
                    <NoticeView subTitle={txt.notice} content={recentNotice} url={'/user/notice'}/>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <EventView subTitle={txt.event} content={recentEvent} url={'/user/event'}/>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <WithdrawStatusView subTitle={txt.realtimeWithdrawStatus} content={recentWithdraw}/>
                </Grid>
            </GridContainer>

            {/* dragon_8 */}
            {
                popupList.length > 0 &&
                (
                    <div style={{}}>
                        {
                            popupList.map((item, index) => (
                                <div key={index} style={{position: 'absolute', left: parseInt(item.xaxios), top: parseInt(item.yaxios), width: parseInt(item.width), height: parseInt(item.height), backgroundColor: '#1D1D1D', zIndex: 5}}>
                                    <div style={{color: '#FFFFFF', fontSize: '15px', marginLeft: 20, marginRight: 20, width: parseInt(item.width) - 40, marginTop: 80, lineHeight: '40px'}}>
                                        {item.content}
                                    </div>
                                    <div style={{display: 'flex', position: 'absolute', left: 0, bottom: 0, width: '100%', height: 40, background: '#A0A0A0', flexDirection: 'row'}}>
                                        <Checkbox style={{height: 40}} onChange={event => handleChange(event, item)} />
                                        <div style={{marginLeft: '2px', lineHeight: '40px'}}>
                                            <IntlMessages id="popup.hide"/>
                                        </div>
                                        <div style={{position: 'absolute', right: '15px', lineHeight: '40px', color: '#DDFF00', fontSize: '20px'}} onClick={() => onClosePopup(item)}>
                                            <IntlMessages id="popup.close"/>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
           
        </PageContainer>
    );
};

export default UserHome;