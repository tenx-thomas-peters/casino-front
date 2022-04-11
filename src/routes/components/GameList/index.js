import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {makeStyles, Grid, Card, CardContent, CardMedia, Button, Box, Typography} from '@material-ui/core';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import GridContainer from '../../../@jumbo/components/GridContainer';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';

// import {CommonConstants} from "../Common/Constants";
import GameListAPI from '../../../services/api/apps/gameList';
import gameService from '../../../services/gameConfig';
import casinoMoneyAPI from "../../../services/api/apps/casinoMoney";
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import EventAPI from "../../../services/api/apps/event";

const queryString = require('query-string');

const useStyles = makeStyles(() => ({
    header: {
        backgroundImage: 'url(/images/game/game_list_header.png)',
        backgroundSize: 'cover',
        width: '100%',
        borderBottom: '2px solid #b59c30',
        '& h4': {
            padding: '30px 50px'
        }
    },
    root: {
        border: '2px solid #b59c30',
        transition: 'transform 0.6s ease',
        position: 'relative',
        borderRadius: '10px',
        cursor: 'pointer',
        '&:hover': {
            '& > div > span': {
                opacity: '0.5'
            },
            '& button': {
                opacity: 1
            }
        }
    },
    playBtn: {
        textTransform: 'lowercase',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        background: 'rgb(0, 0, 0)',
        border: '2px solid #b59c30',
        borderRadius: '20px',
        padding: '7px 15px',
        zIndex: '100',
        '&:hover': {
            background: 'rgb(0, 0, 0)',
        },
        opacity: 0
    },
    mask: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        background: '#000',
        opacity: 0
    },
    gameTitle: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        width: '100%',
        padding: '10px'
    }
}));

const GameList = () => {
    const location = useLocation();
    const classes = useStyles();

    let res_game_list = [];

    const [gameList, setGameList] = useState([]);
    const [vendor, setVendor] = useState('');
    const [type, setType] = useState('');

    const getGameList = ({vendor}, {type}) => {
        console.log()
        // TODO
        // game api - /game-list
        GameListAPI.getGameList({vendor})
            .then(res => {
                if (res.status === 200) {
                    setGameList(res.data);
                }
            })
            .catch(function (err) {
                NotificationManager.error(err.message, 'Error');
            });
        
        // axios.get('/game-list', {params: {vendor: vendor}})
        //     .then(res => {
        //         if (res.status === 200) {
        //             setGameList(res.data);
        //         }
        //     })
        //     .catch(function (err) {
        //         NotificationManager.error(err, 'Error');
        //     });
    };

    const playGame = (event, id, provider) => {
        console.log(id);
        event.preventDefault();
        let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

        if (user) {
            // TODO
            // game api - /get-game-url

            gameService.post('user/refresh-token?_method=PATCH', {username: user.name})
            // gameService.patch('/user/refresh-token', {params: {username: user.name}})
                .then(res => {
                    if (res.status === 200) {
                        localStorage.setItem('server_token', res.data.token);

                        console.log(res.data.token);

                        GameListAPI.getGameUrl(id, res.data.token, provider)
                            .then(res => {
                                if (res.status === 200) {
                                    console.log(res.data.link);
                                    window.open(res.data.link);

                                    console.log("user");
                                    console.log(user);
                                    setCasinoMoney(user);
                                } else {
                                    NotificationManager.error(res.errors.token, 'Error');
                                }
                            })
                            .catch(function (err) {
                                NotificationManager.error(err.message, 'Error');
                            });
                    } else {
                        NotificationManager.error(res.errors.username, 'Error');
                    }
                })
                .catch(function (err) {
                    NotificationManager.error(err.message, 'Error');
                });
            

            // axios.patch('/user/refresh-token', {params: {username: user.name}})
            //     .then(res => {
            //         if (res.status === 200) {
            //             axios.get('/get-game-url', {params: {id: id, token: res.data.token}})
            //                 .then(res => {
            //                     console.log(res);
            //                 })
            //                 .catch(function (err) {
            //                     NotificationManager.error(err, 'Error');
            //                 });
            //         }
            //     })
            //     .catch(function (err) {
            //         NotificationManager.error(err, 'Error');
            //     });
        } else {
            NotificationManager.error('Please Sign in first', 'Error');
        }
    };

    const setCasinoMoney = (user) =>{
        let seq = user.seq;
        casinoMoneyAPI.syncCasinoMoney(seq)
            .then(res => {
                if (res.data.success) {

                }
            })
    }

    useEffect(() => {
        // let vendor = /vendor=([^&#=]*)/.exec(location.search) ? /vendor=([^&#=]*)/.exec(location.search)[1] : '';
        setVendor(queryString.parse(location.search).vendor);
        setType(queryString.parse(location.search).type);

        getGameList({vendor}, {type});
    }, [vendor, location.search]);

    return (
        <PageContainer>
            <Box className={classes.header}>
                {/*<CmtImage src={'/images/game/game_list_header.png'} style={{width: '100%'}} />*/}
                <Typography component={'h4'} style={{textTransform: 'lowercase'}}>
                    {vendor}&nbsp;<IntlMessages id={'game.list.play'}/>
                </Typography>
            </Box>
            <Box style={{padding: '20px 50px'}}>
                <GridContainer>
                    {
                        //filter all lists by slot and baccarat type only
                        gameList.length > 0
                            ?
                            gameList.filter(game_data => game_data.type === type).map((item, index) => {
                                return (
                                    <Grid key={index} item xs={3} sm={2} md={2}>
                                        <Card className={classes.root}>
                                            <CardContent style={{padding: 0}} align={'center'}>
                                                <CardMedia
                                                    component="img"
                                                    alt="game image"
                                                    height="220"
                                                    image={item.thumbnail}
                                                    title={item.title}
                                                />
                                                <Button className={classes.playBtn} data-key={item.id}
                                                        onClick={event => playGame(event, item.id, item.provider)}>
                                                    {<IntlMessages id={'game.btn.playGame'}/>}
                                                </Button>
                                                <p className={classes.gameTitle}>{item.title}</p>
                                                <span className={classes.mask}></span>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )
                            })
                            :
                            ''
                    }
                </GridContainer>
            </Box>
        </PageContainer>
    )
};

export default GameList;