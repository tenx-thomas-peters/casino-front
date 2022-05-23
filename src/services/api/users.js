import {NotificationManager} from 'react-notifications';
import service from '../config';

const UserAPI = {
    getUserInfo: async ({memberSeq}) => {
        await service
            .get('memberInfo', {params: {memberSeq: memberSeq}})
            .then((res) => {
                if (res.data.success) {
                    let result = res.data.result;
                    let jackpotAmount = result.jackpotAmount;
                    let noteCounts = result.noteCounts;
                    let moneyAmount = result.moneyAmount;
                    let casinoMoney = result.casinoMoney;
                    let mileageAmount = result.mileageAmount;
                    let houseMoney = result.houseMoney;
                    let topRanking = result.topRanking;
                    let inlineNotice = result.inlineNotice;
                    let popupNotice = result.popupNotice;
                    // dragon_2
                    let baccaratCheck = JSON.parse(result.baccaratCheck);
                    let slotCheck = JSON.parse(result.slotCheck);
                    let token = result.token;

                    const commonInfo = {
                        'jackpotAmount': jackpotAmount,
                        'noteCounts': noteCounts,
                        'moneyAmount': moneyAmount,
                        'casinoMoney': casinoMoney,
                        'mileageAmount': mileageAmount,
                        'houseMoney': houseMoney,
                        'topRanking': topRanking,
                        'inlineNotice': inlineNotice,
                        'popupNotice': popupNotice,
                        'baccaratCheck': baccaratCheck,
                        'slotCheck': slotCheck,
                        'token': token
                    };

                    // dragon_7
                    localStorage.setItem("commonInfo", JSON.stringify(commonInfo));
                }
            })
            .catch(function (err) {
                NotificationManager.error(err, 'Error');
            });
    }
};

export  default UserAPI;