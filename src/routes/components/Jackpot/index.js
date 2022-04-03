import React from 'react';
import GridContainer from "../../../@jumbo/components/GridContainer";
import {Box, Grid, makeStyles, Typography} from "@material-ui/core";
import CmtImage from "../../../@coremat/CmtImage";
import CountUp from "react-countup";
import IntlMessages from '../../../@jumbo/utils/IntlMessages';

const useStyles = makeStyles(() => ({
    jackpotTitle: {
        position: 'absolute',
        top: '50%',
        left: '0',
        transform: 'translate(10%, -35%)',
        padding: '20px 30px',
        fontSize: '30px',
        textTransform: 'uppercase',
        '@media screen and (max-width: 1500px)': {
            fontSize: '20px'
        },
        '@media screen and (max-width: 1366px)': {
            transform: 'translate(10%, -50%)'
        },
        '@media screen and (max-width: 768px)': {
            fontSize: '11px',
            transform: 'translate(5%, -50%)'
        },
    },
    countUp: {
        fontSize: '50px',
        color: '#f8b319',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        '@media screen and (max-width: 1500px)': {
            fontSize: '40px !important'
        },
        '@media screen and (max-width: 1366px)': {
            fontSize: '30px !important'
        },
        '@media screen and (max-width: 768px)': {
            fontSize: '20px !important',
        },
        '& > i': {
            '@media screen and (max-width: 1500px)': {
                fontSize: '40px !important'
            },
            '@media screen and (max-width: 1366px)': {
                fontSize: '30px !important'
            },
            '@media screen and (max-width: 768px)': {
                fontSize: '20px !important',
            },
        },
    }
}));

const JackpotView = ({jackpotAmount}) => {
    const classes = useStyles();

    return (
        <GridContainer>
            <Grid item xs={12} sm={12} md={12}>
                <Box style={{position: 'relative'}}>
                    <CmtImage src={'/images/home/jackpot_background.png'} />
                    <Typography component="span" className={classes.jackpotTitle}>
                        <IntlMessages id={'home.progressiveJackpot'}/>
                    </Typography>
                    <Typography component="span" className={classes.countUp}>
                        <i className={"iconfont icon-nsiconkrb"} style={{fontSize: '60px', marginRight: '5px'}}></i>
                        {/*<span style={{fontSize: '60px', marginRight: '5px'}}>₩</span>*/}
                        <CountUp preserveValue={true} start={0} end={jackpotAmount ? jackpotAmount : 0} useEasing={false} separator={','}/>
                    </Typography>
                </Box>
            </Grid>
        </GridContainer>
    );
};

export default JackpotView;
