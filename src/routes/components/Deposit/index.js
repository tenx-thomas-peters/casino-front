import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import commonStyles from '../../../@jumbo/common/common.style';
import DepositApplyCharge from './applyCharge';
import {Grid} from '@material-ui/core';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import GridContainer from '../../../@jumbo/components/GridContainer';

const depositStyles = makeStyles(theme => ({
    attensionContent: {
        backgroundImage: `url('/images/deposit/attension.png')`,
        height: 295,
        borderRadius: '10px',
        marginBottom: 20,
        backgroundColor: '#2e2e2e',
        backgroundSize: 'cover',
    },
}));

const Deposit = () => {
    const commonClasses = commonStyles();
    const classes = depositStyles();
    return (
        <PageContainer heading="Home">
            <GridContainer>
                <Grid item xs={12} sm={12} md={12}>
                    <Card className={commonClasses.root}>
                        <CardHeader className={commonClasses.cardHeader} title="Application Deposit" subheader="Deposit description" />
                    </Card>
                    <Card className={classes.attensionContent}></Card>
                    <DepositApplyCharge/>
                </Grid>
            </GridContainer>
        </PageContainer>
    );
}

export default Deposit;