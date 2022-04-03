import mock from '../../mockConfig';
import {gameData} from '../../../@fake-db/users/game-list';

mock.onGet('/game-list').reply(req => {
    const {vendor} = req.params;
    let filteredData = gameData.gameList;

    if (vendor) {
        return [200, filteredData.filter(item => item.vendor.toLowerCase().includes(vendor.toLowerCase()))];
    }
    return [200, filteredData];
});

mock.onGet('/get-game-url').reply(req => {
    const {token} = req.params;

    let res = {
        link: 'https://www.game.com/?token=' + token
    };

    return [200, res];
});