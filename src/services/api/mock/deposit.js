import mock from '../../mockConfig';

mock.onPost('/user/add-balance').reply(req => {
    const {username, amount} = JSON.parse(req.data);
    let userInfo = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    let commonInfo1 = localStorage.getItem("commonInfo1") ? JSON.parse(localStorage.getItem("commonInfo1")) : null;

    let responseData = {
        "username": username,
        "balance": userInfo.moneyAmount,
        "amount": amount,
        "transaction_id": Math.floor(Math.random() * (100 -1) + 1),
        "message": "The agent's amount is short."
    };

    if (commonInfo1.moneyAmount > 0) {
        return [200, responseData];
    } else {
        return [403, {message: 'Agent의 잔고가 부족합니다.'}];
    }
});