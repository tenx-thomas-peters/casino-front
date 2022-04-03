import IntlMessages from '../../../utils/IntlMessages';
import React from 'react';


const dashboardsMenus = [
    {
        name: <IntlMessages id={'sidebar.home'}/>,
        icon: 'icon-index',
        type: 'item',
        link: '/user/home',
    },
    {
        name: <IntlMessages id={'sidebar.bankDesc'}/>,
        icon: 'icon-yinhang',
        type: 'item',
        link: '/user/bankDesc',
    },
    {
        name: <IntlMessages id={'sidebar.slot'}/>,
        icon: 'icon-icon_lib_slots',
        type: 'item',
        link: '/user/slot',
    },
    {
        name: <IntlMessages id={'sidebar.baccarat'}/>,
        icon: 'icon-poker1',
        type: 'item',
        link: '/user/baccarat',
    },
    {
        name: <IntlMessages id={'sidebar.deposit'}/>,
        icon: 'icon-yinhang',
        type: 'item',
        link: '/user/deposit',
    },
    {
        name: <IntlMessages id={'sidebar.withdraw'}/>,
        icon: 'icon-tikuanjilu',
        type: 'item',
        link: '/user/withdraw',
    },
    {
        name: <IntlMessages id={'sidebar.notice'}/>,
        icon: 'icon-gonggao',
        type: 'item',
        link: '/user/notice',
    },
    {
        name: <IntlMessages id={'sidebar.event'}/>,
        icon: 'icon-huodong3',
        type: 'item',
        link: '/user/event',
    },
    {
        name: <IntlMessages id={'sidebar.support'}/>,
        icon: 'icon-tiwen',
        type: 'item',
        link: '/user/support',
    },
];

export const sidebarNavs = [
    {
        type: 'section',
        children: dashboardsMenus,
    },
];
