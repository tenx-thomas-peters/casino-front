import {NotificationManager} from 'react-notifications';
import service from '../config';

const UserAPI = {
    getUserInfo: async ({memberSeq}, {apiCount}) => {
        await service
            .get('memberInfo', {params: {memberSeq: memberSeq, count: apiCount}})
            .then((res) => {
                if (res.data.success) {
                    let result = res.data.result;
                    let noteCounts = result.noteCounts;
                    let moneyAmount = result.moneyAmount;
                    let casinoMoney = result.casinoMoney;
                    let mileageAmount = result.mileageAmount;
                    let inlineNotice = result.inlineNotice;
                    // dragon
                    let baccaratCheck = JSON.parse(result.baccaratCheck);
                    let slotCheck = JSON.parse(result.slotCheck);
                    let token = result.token;

                    const commonInfo = {
                        'noteCounts': noteCounts,
                        'moneyAmount': moneyAmount,
                        'casinoMoney': casinoMoney,
                        'mileageAmount': mileageAmount,
                        'inlineNotice': inlineNotice,
                        'baccaratCheck': baccaratCheck,
                        'slotCheck': slotCheck,
                        'token': token
                    };
                    localStorage.setItem("commonInfo", JSON.stringify(commonInfo));
                }
            })
            .catch(function (err) {
                NotificationManager.error(err, 'Error');
            });
    }
};

export  default UserAPI;