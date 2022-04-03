import moment from 'moment';
import mock from '../../mockConfig';

function dec2hex (dec) {
    return ('0' + dec.toString(16)).substr(-2)
}

// generateId :: Integer -> String
function generateToken (len) {
    let arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('');
}

mock.onPost('/user/create').reply(req => {
    const {username, nickname} = JSON.parse(req.data);
    let res = {
        "id": Math.floor(Math.random() * (100 -1) + 1),
        "username": username,
        "nickname": nickname,
        "country": "KOR",
        "currency_code": "KRW",
        "token": null,
        "balance": 0,
        "point": 0,
        "created_at": moment(),
        "updated_at": moment(),
        "last_access_at": null,
        "agent_id": Math.floor(Math.random() * (100 -1) + 1)
    };

    return [200, res];
});

mock.onGet('/user').reply(req=> {
    const {username} = JSON.parse(req.data);
    let res = {
        "id": Math.floor(Math.random() * (100 -1) + 1),
        "username": username,
        "nickname": '',
        "country": "KOR",
        "currency_code": "KRW",
        "token": null,
        "balance": 0,
        "point": 0,
        "created_at": moment(),
        "updated_at": moment(),
        "last_access_at": null,
        "agent_id": Math.floor(Math.random() * (100 -1) + 1)
    };

    return [200, res];
});

mock.onPatch('/user/refresh-token').reply(req => {
    // let {username }= req.params;

    let res = {
        token: generateToken()
    };

    return [200, res];
});