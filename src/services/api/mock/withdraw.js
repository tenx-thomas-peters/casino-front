import mock from '../../mockConfig';
import {gameData} from '../../../@fake-db/users/game-list';

mock.onPost('/user/sub-balance').reply(req => {
    console.log("/user/sub-balance");
    let withdrawInfo = JSON.parse(req.data).withdrawInfo;
    let withdrawList = gameData.withdrawList;
    let filteredData = withdrawList.filter(item => item.username === withdrawInfo.username);

    if (withdrawInfo) {
        return [200, filteredData];
    }
    return [200, filteredData];
});

mock.onPost('/user/sub-balance-all').reply(req => {
    console.log("/user/sub-balance-all");
    let withdrawInfo = JSON.parse(req.data).withdrawInfo;
    let withdrawList = gameData.withdrawList;
    let filteredData = withdrawList.filter(item => item.username === withdrawInfo.username);
    if (withdrawInfo) {
        return [200, filteredData];
    }
    return [200, filteredData];
});