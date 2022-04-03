import React, {useContext, useState, useEffect} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/core/styles';
import {lighten, Box} from '@material-ui/core';
import SidebarThemeContext from '../../../../../@coremat/CmtLayouts/SidebarThemeContext/SidebarThemeContext';
import IntlMessages from '../../../../utils/IntlMessages';
import CountUp from 'react-countup';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    list: {
        // borderTop: props => `1px solid ${props.sidebarTheme.borderColor}`,
        padding: '10px 24px',
        marginTop: 0,
        '.Cmt-miniLayout .Cmt-sidebar-content:not(:hover) &': {
            padding: '10px 20px',
        },
    },
    listItem: {
        marginBottom: '0 !important',
        paddingBottom: '0 !important',
        color: '#fff',
        borderRadius: theme.shape.borderRadius,
        transition: 'all 0.3s ease',
        background: 'transparent !important',

        '.Cmt-miniLayout .Cmt-sidebar-content:not(:hover) &': {
            width: 40,
            height: 40,
            padding: 3,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& .MuiListItemIcon-root': {
                marginTop: 0,
            },
        },
        '&:not(:last-child)': {
            marginBottom: 16,
        },

        '& .MuiListItemIcon-root': {
            minWidth: 'auto',
            color: lighten(theme.palette.common.black, 0.5),
        },
        '& .MuiListItemText-root': {
            marginLeft: 20,

            '.Cmt-miniLayout .Cmt-sidebar-content:not(:hover) &': {
                display: 'none',
            },
        },
        '& i': {
            fontSize: '20px',
            marginTop: '4px',
        }
    },
    listItemText: {
        marginLeft: '5px !important',
        '& span': {
            wordBreak: 'break-all',
        }
    },
    iconWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid',
        borderRadius: '50%',
        height: 66,
        minWidth: 66,
        width: 66,
    },
    topRanking: {
        width: '100%',
        background: 'rgb(47, 47, 57)',
        borderRadius: '10px',
        alignItems: 'center'
    },
    ranking: {
        marginRight: '16px',
        alignItems: 'center',
        '& div': {
            width: '46px',
            height: '46px',
            display: 'flex',
            background: '#5b4104',
            color: '#d4ac19',
            alignItems: 'center',
            borderRadius: '50%',
            justifyContent: 'center',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        }
    },
    content: {
        '& .yellow': {
            color: '#d4ac19'
        },
        '& p:last-child': {
            fontSize: '25px'
        }
    },
    houseMoney: {
        width: '100%',
        background: 'rgb(106, 19, 2)',
        borderRadius: '10px',
        alignItems: 'center'
    }
}));

const items = [
    {
        title: {
            text: <IntlMessages id={'sidebar.withdrawTopRankingInWeek'}/>,
            color: '#d4ac19',
            textColor: '#d4ac19',
            subTextColor: '#fff',
            icon: 'iconfont icon-dingjihuiyuan',
        },
    },
    {
        title: {
            text: <IntlMessages id={'sidebar.houseMoney'}/>,
            color: '#d4ac19',
            textColor: '#fff',
            icon: 'iconfont icon-jifen2'
        },
    },
];

const SidebarButtons = ({commonInfo}) => {
    const {sidebarTheme} = useContext(SidebarThemeContext);
    const classes = useStyles({sidebarTheme});

    const [houseMoney, setHouseMoney] = useState(0);
    const [topRankingMember, setTopRankingMember] = useState('');
    const [topRankingAmount, setTopRankingAmount] = useState(0);

    useEffect(() => {
        if (commonInfo) {

            setHouseMoney(commonInfo.houseMoney);
            setTopRankingMember(commonInfo.topRanking.topMember);
            setTopRankingAmount(commonInfo.topRanking.moneyAmount);
        }
    }, [commonInfo]);

    return (
        <List className={classes.list} disablePadding>
            <ListItem
                alignItems="flex-start"
                component="li"
                className={classes.listItem}
            >
                <i style={{color: items[0].title.color}} className={items[0].title.icon}></i>
                <ListItemText className={classes.listItemText} primary={items[0].title.text}/>
            </ListItem>
            <ListItem component="li" className={classes.listItem} style={{padding: '0'}}>
                <Box className={classes.topRanking}>
                    <Box style={{display: 'flex', padding: '4px 16px', alignItems: 'center'}}>
                        <div className={classes.ranking}>
                            <div>1</div>
                        </div>
                        <div className={classes.content}>
                            <Typography component="p" className={clsx('yellow')}>
                                {topRankingMember}
                            </Typography>
                            <Typography component="p">
                                <i className={"iconfont icon-nsiconkrb"} style={{fontSize: '30px', marginRight: '5px'}}></i>
                                <CountUp preserveValue={true} start={0} end={topRankingAmount} useEasing={true} separator={','}/>
                            </Typography>
                        </div>
                    </Box>
                </Box>
            </ListItem>
            <ListItem
                alignItems="flex-start"
                component="li"
                className={classes.listItem}
            >
                <i style={{color: items[1].title.color}} className={items[1].title.icon}></i>
                <ListItemText className={classes.listItemText} primary={items[1].title.text}/>
            </ListItem>
            <ListItem component="li" className={classes.listItem} style={{padding: '0'}}>
                <Box className={classes.houseMoney}>
                    <Box style={{display: 'flex', padding: '16px', alignItems: 'center'}}>
                        <div className={classes.content}>
                            <Typography component="p">
                                <i className={"iconfont icon-nsiconkrb"} style={{fontSize: '30px', marginRight: '5px'}}></i>
                                <CountUp preserveValue={true} start={0} end={houseMoney} useEasing={true} separator={','}/>
                            </Typography>
                        </div>
                    </Box>
                </Box>
            </ListItem>
        </List>
    );
};

export default SidebarButtons;
