import React, {useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import clsx from 'clsx';

import {List} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SidebarThemeContext from '../../CmtLayouts/SidebarThemeContext/SidebarThemeContext';
import {setSigninPopup} from '../../../redux/actions/Auth';

const useStyles = makeStyles(theme => ({
    navMenuItem: {
        padding: '0 30px 10px 30px',
        position: 'relative',
        '.Cmt-miniLayout .Cmt-sidebar-content:not(:hover) &': {
            paddingLeft: 16,
        }
    },
    navMenuLink: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px 0 0',
        border: '1px solid transparent',
        borderRadius: 30,
        color: props => props.sidebarTheme.textColor,
        '&:hover, &:focus': {
            border: '1px solid #795f08',
            color: props => props.sidebarTheme.textDarkColor,
            backgroundColor: '#5a4104',
            '& .Cmt-nav-text': {
                color: props => props.sidebarTheme.textDarkColor,
            },
            '& .Cmt-icon-root': {
                color: '#000',
                background: 'linear-gradient(to right, #c59e31,#e1c864,#c59e31)'
            }
        },
        '&.active': {
            border: '1px solid #795f08',
            color: props => props.sidebarTheme.textActiveColor,
            backgroundColor: '#5a4104',
            '& .Cmt-nav-text': {
                color: props => props.sidebarTheme.textActiveColor,
            },
            '&:hover, &:focus': {
                '& .Cmt-nav-text': {
                    color: props => props.sidebarTheme.textActiveColor,
                },
            },
            '& .Cmt-icon-root': {
                color: '#000',
                background: 'linear-gradient(to right, #c59e31,#e1c864,#c59e31)'
            }
        },
        '.Cmt-miniLayout .Cmt-sidebar-content:not(:hover) &': {
            justifyContent: 'center',
            padding: 0,
            height: 40,
            width: 40,
            borderRadius: '50%',
            marginLeft: 4,
            marginRight: 4,
        },
    },
    navText: {
        flex: 1,
        fontSize: 14,
        '.Cmt-miniLayout .Cmt-sidebar-content:not(:hover) &': {
            display: 'none',
        },
    },
    iconRoot: {
        background: '#2f2f39',
        color: '#d4ac19',
        padding: '10px 14px',
        borderRadius: '50%',
        marginRight: 16,
        fontSize: 20,
        '.Cmt-miniLayout .Cmt-sidebar-content:not(:hover) &': {
            marginRight: 0,
        }
    },
}));

const NavMenuItem = props => {
    const dispatch = useDispatch();
    const {authUser} = useSelector(({auth}) => auth);
    const {name, icon, link} = props;
    const {sidebarTheme} = useContext(SidebarThemeContext);
    const classes = useStyles({sidebarTheme});

    const renderIcon = () => {
        if (icon/* && isValidElement(icon)*/) {
            // return cloneElement(icon, {
            //     className: clsx(classes.iconRoot, 'Cmt-icon-root'),
            // });

            return <i className={clsx(classes.iconRoot, 'Cmt-icon-root iconfont ' + icon)}></i>;
        }

        return null;
    };

    const refresh = () => {
        if (link != '/user/home' && !authUser) {
            localStorage.setItem('signinPopupFlag', "true");
        }
    }

    // dragon
    const getLink = () => {
        if (link == '/user/home') {
            return link;
        }

        if (authUser) {
            return link;
        } else {            
            return '/user/home' + link.replace('/user', '');
        }
    }


    return (
        <List component="div" className={clsx(classes.navMenuItem, 'Cmt-nav-menu-item')}>
            <NavLink className={clsx(classes.navMenuLink, 'Cmt-nav-menu-link')} to={getLink} onClick={() => refresh()}>
                {/* Display an icon if any */}
                {renderIcon()}
                <span className={clsx(classes.navText, 'Cmt-nav-text')}>{name}</span>
            </NavLink>
        </List>
    );
};

export default NavMenuItem;
