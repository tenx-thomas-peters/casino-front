import {NotificationManager} from 'react-notifications';
import service from '../config';

const UserAPI = {

    getUserInfo: async ({memberSeq}, {apiCount}) => {
        return await service.get('memberInfo', {params: {memberSeq: memberSeq, count: apiCount}})
    }
};

export  default UserAPI;