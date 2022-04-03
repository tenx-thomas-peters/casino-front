import React from 'react';
import NumberFormat from 'react-number-format';
import {lighten, makeStyles, Card, CardHeader, CardContent, Grid} from '@material-ui/core';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import GridContainer from "../../../@jumbo/components/GridContainer";

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
        margin: '0 auto',
        backgroundColor: lighten(theme.palette.background.paper, 0.1),
    },
    cardHeader: {
        borderRadius: '10px',
        backgroundSize: 'cover',
        '& span': {
            display: 'inline-block'
        },
        '& span:first-child': {
            fontSize: '15px',
            margin: '15px 10px 0px 15px',
            color: 'gray',
            textTransform: 'uppercase'
        },
        '& span:last-child': {
            color: '#f8b319',
            fontSize: '15px',
            textTransform: 'lowercase'
        }
    },
}));

const txt = {
    million: <IntlMessages id={'home.million'}/>,
};

const WithdrawStatusView = ({title, subTitle, content}) => {
    const classes = useStyles();

    return (
        <Card style={{borderRadius: '10px'}}>
            <CardHeader
                className={classes.cardHeader}
                title={txt.million}
                subheader={subTitle}
            />
            <CardContent className={classes.cardContent} style={{padding: '0 30px 30px'}}>
                {
                    content.length > 0
                        ?
                        content.map(entry => (
                            <GridContainer key={entry.seq}>
                                <Grid item md={3}>
                                    <span style={{color: 'grey'}}>{entry.applicationTime}</span>
                                </Grid>
                                <Grid item md={6}>
                                    {entry.memberName}
                                </Grid>
                                <Grid item md={3}>
                                    <NumberFormat value={entry.moneyAmount} thousandSeparator isNumericString disabled suffix={'₩'}
                                                  style={{float: 'left', width: '100%', border: 'none', color: '#f8b319', textAlign: 'right', backgroundColor: 'rgb(18, 18, 18)'}}/>
                                </Grid>
                            </GridContainer>
                        ))
                        :
                        ''
                }
            </CardContent>
        </Card>
    );
}

export default WithdrawStatusView

