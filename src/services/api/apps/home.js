import service from '../../config';
import {NotificationManager} from "react-notifications";

const HomeAPI = {
    getHomeInfo: async () => {
        return await service
            .get('getHomeInfo')
            // .then((res) => {
            //     if (res.data.success) {
            //         return res.data.result;
            //     }
            // })
            // .catch(function (err) {
            //     NotificationManager.error(err, 'Error');
            // });
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