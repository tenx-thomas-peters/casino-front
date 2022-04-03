import React from 'react';
import {Redirect, Route, Switch} from 'react-router';
import {useLocation} from 'react-router-dom';
import Login from './Auth/Login';
import Signup from './Auth/Register';
import ForgotPassword from './Auth/ForgotPassword';
import TourGuide from './TourGuide';
import UserHome from './components/Home';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import Notice from './components/Notice';
import NoticeDetail from './components/Notice/noticeDetail';
import EventDetail from './components/Event/eventDetail';
import Event from './components/Event';
import Note from './components/Note';
import Support from './components/Support';
import Slot from './components/Slot';
import GameList from './components/GameList';

import {CommonConstants} from "./components/Common/Constants";
import {gameData} from "../@fake-db/users/game-list";

const Routes = () => {
    // const {authUser} = useSelector(({auth}) => auth);
    const location = useLocation();

    return (
        <React.Fragment>
            <Switch>
                <Route path="/signin" component={Login}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/forgot-password" component={ForgotPassword}/>
                <Route path="/user/home" component={UserHome}/>
                <Route path="/user/slot" component={
                    () => <Slot gameType={CommonConstants.gameTypeSlot} categoryList={gameData.category.slot} />
                }/>
                <Route path="/user/baccarat" component={
                    () => <Slot gameType={CommonConstants.gameTypeBaccarat} categoryList={gameData.category.baccarat} />
                }/>
                <Route path="/user/deposit" component={Deposit}/>
                <Route path="/user/withdraw" component={Withdraw}/>
                <Route path="/user/notice" component={Notice}/>
                <Route path="/user/noticeDetail" component={NoticeDetail} />
                <Route path="/user/note" component={Note}/>
                <Route path="/user/support" component={Support}/>
                <Route path="/user/event" component={Event}/>
                <Route path="/user/eventDetail" component={EventDetail} />

                <Route path="/game" component={GameList}/>

                <Redirect to={'/user/home'}/>
            </Switch>

            {location.pathname !== '/signin' && location.pathname !== '/signup' && location.pathname !== '/forgot-password' && (
                <TourGuide/>
            )}
        </React.Fragment>
    );
};

export default Routes;
