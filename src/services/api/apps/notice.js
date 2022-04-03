import service from '../../config';

const NoticeAPI = {
    getNoticeList: async ({type, classification, pageNo, pageSize}) => {
        return await service
            .get('getNoteList',
                {params: { type: type, classification: classification, pageNo: pageNo, pageSize: pageSize }});
    },
    getNoticeDetail: async({noteSeq}) => {
        return await service
            .get('getNoticeDetail', {params: { seq: noteSeq }});
    }
};

export default NoticeAPI;