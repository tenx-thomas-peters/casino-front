import service from '../../config';
import {NotificationManager} from "react-notifications";

const HomeAPI = {
    getInitialData: async () => {
        await service.get('getInitialData')
            .then((res) => {
                if (res.data.success) {
                    let result = res.data.result;
                    const initData = {
                        'recentNotice': result.notice,
                        'recentEvent': result.event,
                        'recentWithdraw': result.withdraw,
                        'jackpotAmount': result.jackpotAmount,
                        'houseMoney': result.houseMoney,
                        'inlineNotice': result.inlineNotice,
                        'topRanking': result.topRanking,
                        'baccaratCheck': JSON.parse(result.baccaratCheck),
                        'slotCheck': JSON.parse(result.slotCheck)
                    }
                    localStorage.setItem("initData", JSON.stringify(initData));
                }
            })
    },

    exchangePoint: async ({userSeq}) => {
        console.log({userSeq});
        return await service
            .get("exchangePoint",
                {params: {userSeq: userSeq}
                });
    }
};

export  default HomeAPI;