import service from '../../config';

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
    }
};

export  default HomeAPI;