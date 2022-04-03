import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Grid} from '@material-ui/core';
import ImageCard from "./ImageCard";
import GridContainer from "../../../@jumbo/components/GridContainer";
import Typography from "@material-ui/core/Typography/Typography";
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import commonStyles from '../../../@jumbo/common/common.style';

import Link from "@material-ui/core/Link/Link";
import {Link as RouterLink} from "react-router-dom";

const LinkRouter = props => <Link {...props} component={RouterLink}/>;

const txt = {
    totalView: <IntlMessages id={'home.totalView'}/>,
};

const useStyles = makeStyles(() => ({
    category: {
        perspective: '700px'
    },
}));

const GameCards = ({gameType, title, subTitle, url, icon, categoryList}) => {
    const classes = useStyles();
    const commonClasses = commonStyles();

    const [style, setStyle] = useState('');

    const changeStyle = () => {
        setStyle('gameItem');
    };

    const clearStyle = () => {
        setStyle('');
    };

    const renderRow = (item, index) => {
        return (
            <Grid item xs={12} sm={4} md={2} key={index} className={classes.category}>
                <ImageCard
                    vendor={item.vendor}
                    type={gameType}
                    title={item.title}
                    background_img={item.background_img}
                    style={style}
                    changeStyle={changeStyle}
                    clearStyle={clearStyle}/>
            </Grid>
        );
    };

    return (
        <div>
            <GridContainer>
                <Grid item xs={12} sm={12} md={12}>
                    <Typography component="span" className={commonClasses.uppercase} style={{fontSize: '25px'}}>
                        <i className={icon} style={{fontSize: '40px', color: '#f8b319', marginRight: '20px'}}></i>
                        {title}
                    </Typography>

                    <Typography component="span" className={commonClasses.lowercase}
                                style={{fontSize: '15px', marginLeft: '20px'}}>
                        {subTitle}
                    </Typography>
                    {
                        url
                            ?
                            <LinkRouter color='inherit' to={url}>
                                <Button size="small" variant="contained" style={{
                                    backgroundColor: 'black',
                                    color: 'white',
                                    float: 'right',
                                    marginTop: '10px',
                                    borderRadius: '12px',
                                    padding: '10px 20px 10px 20px',
                                    transform: 'skew(-10deg)'
                                }} className={commonClasses.lowercase}>
                                    {txt.totalView}
                                    <Typography style={{color: '#f8b319', marginLeft: '25px'}}>
                                        ->
                                    </Typography>
                                    {/*<i className={"iconfont icon-icon_lib_slots"} style={{color: '#f8b319', marginLeft: '25px'}}></i>*/}
                                </Button>
                            </LinkRouter>
                            :
                            ''
                    }
                </Grid>
            </GridContainer>
            <GridContainer>
                {categoryList && categoryList.length > 0 ? categoryList.map((item, index) => renderRow(item, index)) : ''}
            </GridContainer>
        </div>
    );
};

export default GameCards;
