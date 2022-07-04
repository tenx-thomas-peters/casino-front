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
    const [headerShow, setHeaderShow] = useState(false);
    const [sidebarShow, setSidebarShow] = useState(false);
    const [footerShow, setFooterShow] = useState(false);
    const [restContentShow, setRestContentShow] = useState(false);


    const getInitialData = () =>{
        HomeAPI.getInitialData().then(r => {
            setHeaderShow(true);
            setSidebarShow(true);
            setFooterShow(true);
            setRestContentShow(true);
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
        getInitialData();
        if (location.pathname.indexOf('/user') < 0 && location.pathname !== '/') {
            setHeaderShow(false);
            setSidebarShow(false);
            setFooterShow(false);
            setRestContentShow(false);

            layoutOptions.isSidebarFixed = false;
            layoutOptions.sidebarWidth = 0;
        }

    }, [location.pathname, dispatch]);

    return (
        <CmtVerticalLayout
            className="verticalDefaultLayout"
            layoutOptions={layoutOptions}
            header={
                headerShow ?
                    <CmtHeader>
                        <Header/>
                    </CmtHeader>
                    : ''
            }
            sidebar={
                sidebarShow ?
                    <CmtSidebar>
                        <SidebarHeader/>
                        <SideBar/>
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
                {restContentShow?children:''}
                <Customizer/>
                <ContentLoader/>
            </CmtContent>
        </CmtVerticalLayout>
    );
};

export default VerticalDefault;
