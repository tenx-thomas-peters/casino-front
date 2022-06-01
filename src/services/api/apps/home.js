import service from '../../config';
import {NotificationManager} from "react-notifications";

const HomeAPI = {
    getInitialData: async () => {
        return await service.get('getInitialData')
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