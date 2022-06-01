import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import CmtVerticalLayout from '../../../../../@coremat/CmtLayouts/Vertical';
import CmtHeader from '../../../../../@coremat/CmtLayouts/Vertical/Header';
import Header from '../../partials/Header';
import CmtSidebar from '../../../../../@coremat/CmtLayouts/Vertical/Sidebar';
import SidebarHeader from '../../partials/SidebarHeader';
import SideBar from '../../partials/SideBar';
import CmtContent from '../../../../../@coremat/CmtLayouts/Vertical/Content';
import Customizer from './Customizer';
import ContentLoader from '../../../ContentLoader';
import CmtFooter from '../../../../../@coremat/CmtLayouts/Vertical/Footer';
import Footer from '../../partials/Footer';
import defaultContext from '../../../contextProvider/AppContextProvider/defaultContext';
import UserAPI from '../../../../../services/api/users';
import {AuthMethods} from '../../../../../services/auth';
import {CurrentAuthMethod} from '../../../../constants/AppConstants';
import HomeAPI from "../../../../../services/api/apps/home";

let layoutOptions = {
    headerType: defaultContext.headerType,
    footerType: 'fixed',
    sidebarType: defaultContext.sidebarType,
    isSidebarFixed: defaultContext.isSidebarFixed,
    isSidebarOpen: false,
    showTourOpt: true,
    showFooterOpt: true,
    miniSidebarWidth: 80,
    layoutStyle: defaultContext.layoutType,
    drawerBreakPoint: defaultContext.drawerBreakPoint,
    sidebarWidth: defaultContext.sidebarWidth,
};

const VerticalDefault = ({children}) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const [commonInfo, setCommonInfo] = useState();
    const [headerShow, setHeaderShow] = useState(true);
    const [sidebarShow, setSidebarShow] = useState(true);
    const [footerShow, setFooterShow] = useState(true);

    const getUserInfo = (apiCount) => {
        console.log(apiCount);
        let userInfo = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
        let memberSeq = userInfo && userInfo.seq ? userInfo.seq : '';
        UserAPI.getUserInfo({memberSeq}, {apiCount});

        // dragon
        let info = localStorage.getItem('commonInfo') ? JSON.parse(localStorage.getItem('commonInfo')) : null;
        if (info != null) {
            let accessToken = localStorage.getItem('token');
            let token = info.token;
            if (token != null && token != '' && `${accessToken}` != `${token}`) {
                dispatch(AuthMethods[CurrentAuthMethod].onLogout());
            }
        }
        
        setCommonInfo(info);
    };

    const getInitialData = () =>{
        HomeAPI.getInitialData()
            .then(res => {
                if (res.data.success) {
                    const initData = {
                        'recentNotice': res.data.result.notice,
                        'recentEvent': res.data.result.event,
                        'recentWithdraw': res.data.result.withdraw,
                        'jackpotAmount': res.data.result.jackpotAmount,
                        'houseMoney': res.data.result.houseMoney,
                        'topRanking': res.data.result.topRanking,
                    }
                    localStorage.setItem("initData", JSON.stringify(initData));
                }
            });
    }

    // const {authUser} = useSelector(({auth}) => auth);
    // // dragon
    // useEffect(() => {
    //     if (authUser != null) {
    //         alert(authUser.status);
    //     }
    //     console.log(authUser);
    //     // 
    // }, [authUser]);

    useEffect(() => {
        if (location.pathname.indexOf('/user') < 0 && location.pathname !== '/') {
            setHeaderShow(false);
            setSidebarShow(false);
            setFooterShow(false);

            layoutOptions.isSidebarFixed = false;
            layoutOptions.sidebarWidth = 0;
        }

        let userInfo = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
        getInitialData();
        if (userInfo && userInfo.seq) {
            console.log("userInfo.seq");
            console.log(userInfo.seq);
            let apiCount = 0;
            var intervalHandler = setInterval(() => {
                apiCount++;
                getUserInfo(apiCount);
            }, 5000);
        }

        // let intervalHandler = setInterval(() => {
        //     let token = localStorage.getItem('token');
        //     dispatch(AuthMethods[CurrentAuthMethod].getAuthUser(true, token));
        //     setCommonInfo(localStorage.getItem('commonInfo') ? JSON.parse(localStorage.getItem('commonInfo')) : null);
        // }, 3000);

        return () => {
            clearTimeout(intervalHandler);
        };
    }, [location.pathname, dispatch]);

    return (
        <CmtVerticalLayout
            className="verticalDefaultLayout"
            layoutOptions={layoutOptions}
            header={
                headerShow ?
                    <CmtHeader>
                        <Header commonInfo={commonInfo}/>
                    </CmtHeader>
                    : ''
            }
            sidebar={
                sidebarShow ?
                    <CmtSidebar>
                        <SidebarHeader/>
                        <SideBar commonInfo={commonInfo}/>
                    </CmtSidebar>
                    : ''
            }
            footer={
                footerShow ?
                    <CmtFooter>
                        <Footer/>
                    </CmtFooter>
                    : ''
            }>
            <CmtContent>
                {children}
                <Customizer/>
                <ContentLoader/>
            </CmtContent>
        </CmtVerticalLayout>
    );
};

export default VerticalDefault;
