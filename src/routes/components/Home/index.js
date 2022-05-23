import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import {Grid} from '@material-ui/core';
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

    const setJackpot = () => {
        let commonInfo = localStorage.getItem('commonInfo') ? JSON.parse(localStorage.getItem('commonInfo')) : null;
        if (commonInfo) {
            setJackpotAmount(commonInfo.jackpotAmount);
        }
    };

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
        </PageContainer>
    );
};

export default UserHome;